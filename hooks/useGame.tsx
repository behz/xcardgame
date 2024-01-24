import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useGameContext } from '../contexts/gameContext';
import { useUserContext } from '../contexts/userContext';

const useGame = () => {
    const { gameId, setGameId } = useGameContext();
    const { isFirstPlayer, setIsFirstPlayer } = useGameContext();
    const { userId, setUserId } = useUserContext();
    const { opponentId, setOpponentId } = useGameContext();
    const { opponentSelectedCard, setOpponentSelectedCard } = useGameContext();
    const { mySelectedCard, setMySelectedCard } = useGameContext();
    const supabase = createClient()

    // Function to join a game or create a new one
    const joinGame = async () => {
        // find first avaialble match to join
        let { data: match, error } = await supabase
            .from('matches')
            .select()
            .order('created_at', { ascending: false })
            .is('winner', null)
            // .not('player1','is', null)
            .limit(1)
            .single();


        if (error) {
            if ( error.details === "The result contains 0 rows") {
                console.log('There is not any active match. creating a new match...');
            } else return
        }

        if (match) {
            setGameId(match.id);
            setIsFirstPlayer(match.player1 == userId)

            setOpponentId(match.player1 == userId ? match.player2 : match.player1);
            setOpponentSelectedCard(match.player1 == userId ? match.player2Card :  match.player1Card);
            setMySelectedCard(match.player1 == userId ? match.player1Card :  match.player2Card)

            // do nothing if user is already joined.
            if ( match.player1 == userId || match.player2 == userId ) { return }

            // Join the existing match as player2
            const { error: updateError } = await supabase
                .from('matches')
                .update({ player2: userId })
                .match({ id: match.id });

            if (updateError) {
                console.error('Error joining game:', updateError);
                return;
            }
            setIsFirstPlayer(false);
        } else {

            // Create a new match as player 1
            const { data: newGame, error: newGameError } = await supabase
                .from('matches')
                .insert({ player1:userId, player1Card: 0, player2Card: 0, winner: null })
                .select();

            if (newGameError) {
                console.error('Error creating new game:', newGameError);
                return;
            }

            if (newGame && newGame.length > 0) setGameId(newGame[0].id);
            setIsFirstPlayer(true);
        }
    };

    const selectCard = async (id: number) => {

        const playerKey = `player${isFirstPlayer ? '1' : '2'}Card`;

        // Join the existing match as player2
        const { error: updateError } = await supabase
            .from('matches')
            .update({ [playerKey]: id })
            .match({ id: gameId });

        if (updateError) {
            console.error('Error Updating Database:', updateError);
            return;
        }
    };

    const setWinner = async (id: string | null) => {

        // Join the existing match as player2
        const { error: updateError } = await supabase
            .from('matches')
            .update({ winner: id })
            .match({ id: gameId });

        if (updateError) {
            console.error('Error Updating Database:', updateError);
            return;
        }
    };



    // Subscribe to real-time updates
    useEffect(() => {
        if (!gameId) return;

        interface MatchPayload {
            created_at: string;
            id: string;
            player1: string | null;
            player1Card: number;
            player2: string | null;
            player2Card: number;
            winner: string | null;
        }

        const subscription = supabase
            .channel(`public:matches:id=eq.${gameId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'matches', filter: 'id=eq.'+ gameId }, payload => {

                const matchData = payload.new as MatchPayload; // Cast payload.new to MatchPayload

                if (!opponentId && matchData && matchData.player2  && matchData.player1 ) {
                    setOpponentId(isFirstPlayer ? matchData.player2 :  matchData.player1);
                }
                if (!opponentSelectedCard && matchData && (matchData.player2Card || matchData.player1Card) ) {
                    setOpponentSelectedCard(isFirstPlayer ? matchData.player2Card :  matchData.player1Card);
                }
                
              })
            .subscribe();
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [gameId]);

    return { joinGame, selectCard, setWinner };
};

export default useGame;