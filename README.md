<h1 align="center">Game: "Who is the King?"</h1>

<p>
**Objective:** To emerge victorious, players must strategically select the card adorned with the king's crown.

**Number of Players:** 2

**Materials:**

- A bespoke deck consisting of three elegantly designed cards: two are blank, and the third prominently features a regal king's crown.

**Setup:**

- Begin by thoroughly shuffling the deck to ensure randomness. Then, place the three cards face down on the table, maintaining their secrecy.

**Gameplay Enhancements:**

1. **The Game:**
    - Starting the Round: Players decide who starts the game through a fair method, such as a coin toss or rock-paper-scissors.
    - Selecting a Card:
        1. Each player, in turn, chooses one card from the tableau.
        2. Once a card is selected, it must be revealed immediately to all players.
        3. Players are not permitted to change their selection once made.
2. **Strategic Depth:**
    - Observational Skills: Players are encouraged to observe their opponent's reactions and strategies to gain an edge in future rounds.
    - Bluffing Element: Players may choose to feign disappointment or joy upon selecting their card to mislead their opponent.
3. **Winning the Game:**
    - The round concludes once both players have chosen and revealed their cards.
    - The player who unveils the card with the king's crown scores 10 points and wins the round.
    - Tracking Victory: Maintain a record of points scored across multiple rounds to determine an overall winner after a set number of games.
4. **Reset and Replay:**
    - After each round, engage the “Join Again” feature for a seamless transition into the next game.
    - This option resets the game and reshuffles the cards, preparing for a new round.
</p>

## Demo

You can view a fully working demo at [https://xcardgame.vercel.app/](https://xcardgame.vercel.app/).

5. You can now run the Next.js local development server:

   ```bash
   npm run dev
   ```

   The starter kit should now be running on [localhost:3000](http://localhost:3000/).

## Docker
https://vercel.com/guides/does-vercel-support-docker-deployments
To add support for Docker add the following to the next.config.js file:
```
// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
};
```