import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client'
import { useGameContext } from '../contexts/gameContext';
import { useUserContext } from '../contexts/userContext';

const useGame = () => {
    const { gameId, setGameId } = useGameContext();
    const { isFirstPlayer, setIsFirstPlayer } = useGameContext();
    const { userId, setUserId } = useUserContext();
    const supabase = createClient()

    // Function to join a game or create a new one
    const joinGame = async () => {
        // find first avaialble match to join
        let { data: matches, error } = await supabase
            .from('matches')
            .select()
            .order('created_at', { ascending: false })
            .is('winner', null)
            .limit(1)
            .single();


        if (error) {
            if ( error.details !== "The result contains 0 rows") {
                console.log('There is not any active match. creating a new match...');
            } else return
        }

        if (matches) {
            setGameId(matches.id);
            setIsFirstPlayer(matches.player1 == userId)

            // do nothing if user is already joined.
            if ( matches.player1 == userId || matches.player2 == userId ) { return }

            // Join the existing match as player2
            const { error: updateError } = await supabase
                .from('matches')
                .update({ player2: userId })
                .match({ id: matches.id });

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
            console.error('Error joining game:', updateError);
            return;
        }
    };



    // Subscribe to real-time updates
    useEffect(() => {
        if (!gameId) return;

        const subscription = supabase
            .channel(`public:matches:id=eq.${gameId}`)
            .on('postgres_changes', { event: '*', schema: 'public', table: 'matches', filter: 'id=eq.'+ gameId }, payload => {
                console.log('Change received!', payload)
              })
            .subscribe();
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [gameId]);

    return { joinGame, selectCard };
};

export default useGame;