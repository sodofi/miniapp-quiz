# Are You Smarter Quiz - Farcaster Mini App

A fun quiz game that tests if you're smarter than a 5th grader! Built as a Farcaster Mini App with CELO payment integration.

## Features

- 10 challenging questions across different subjects
- Beautiful brutalist design
- CELO payment integration (0.1 CELO to unlock)
- Farcaster Mini App integration
- Real-time score tracking
- Instant feedback on answers
- Final score with grade assessment

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Wagmi for wallet integration
- Farcaster Frame SDK
- CELO blockchain

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/are-you-smarter-quiz.git
cd are-you-smarter-quiz
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your configuration:
```env
# Add any required environment variables here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Farcaster Mini App Setup

1. Deploy the app to a domain
2. Create a `/.well-known/farcaster.json` file with your app's metadata
3. Use the [Farcaster JSON Tool](https://warpcast.com/~/developers/new) to generate your verification
4. Host the verification at `/.well-known/farcaster.json`

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
