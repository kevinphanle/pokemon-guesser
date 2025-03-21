# Pokémon Guesser

A modern web-based game where players guess Pokémon from their silhouettes. Built with Next.js, TypeScript, and Tailwind CSS.

![Pokemon Guesser Game](public/screenshot.png)

## Features

### Core Gameplay

- Guess Pokémon from their silhouettes
- Original 151 Pokémon included
- Progressive hint system
- Detailed Pokémon information revealed after correct guesses

### Scoring System

- Base points for correct guesses (1-3 points)
- Streak bonuses for consecutive correct answers
- Point deductions for incorrect guesses
- High score tracking

### Hint System

- Three types of hints available per Pokémon:
  1. Pokémon type(s)
  2. Height and weight
  3. Pokédex description
- Each hint used reduces potential points earned

### Game Statistics

- High score tracking
- Games played counter
- Correct guesses tracking
- Accuracy percentage
- Hints used tracking

### User Interface

- Clean, modern design
- Visual countdown timer
- Streak indicator
- Responsive layout
- Animated loading states
- Type-colored badges
- Tabbed interface for game and Pokédex

### Additional Features

- Skip option for difficult Pokémon
- Local storage for persistent statistics
- Drag-resistant images
- Keyboard-friendly input
- Accessible design

## Technical Details

### Built With

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- PokéAPI for Pokémon data

### Project Structure

```
src/
├── components/
│   ├── PokemonGame.tsx     # Main game component
│   ├── PokemonList.tsx     # Pokédex view
│   ├── PokemonDetails.tsx  # Pokemon info display
│   ├── GameStats.tsx       # Statistics display
│   ├── CountdownTimer.tsx  # Visual timer
│   └── Tabs.tsx           # Navigation tabs
├── utils/
│   ├── pokemon.ts         # Pokemon data handling
│   └── storage.ts         # Local storage management
└── data/
    └── pokemon.json       # Cached Pokemon data
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokemon-guesser.git
cd pokemon-guesser
```

2. Install dependencies:

```bash
npm install
```

3. Generate Pokemon data:

```bash
npm run generate-pokemon
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Game Rules

1. **Basic Gameplay**

   - A silhouetted Pokémon appears
   - Type your guess in the input field
   - Get points for correct guesses
   - Lose points for incorrect guesses

2. **Scoring**

   - 3 points: Correct guess with no hints
   - 2 points: Correct guess with 1 hint
   - 1 point: Correct guess with 2+ hints
   - Bonus points for streaks (every 5 correct)
   - -1 point for incorrect guesses

3. **Hints**
   - Maximum of 3 hints per Pokémon
   - Each hint reduces potential points
   - Hints provide progressively more specific information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by [PokéAPI](https://pokeapi.co/)
- Original Pokémon designs © Nintendo/Game Freak
- Icons and design inspiration from various Pokémon games
