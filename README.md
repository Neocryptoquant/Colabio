# Colabio - Solana Crowdfunding Platform

A decentralized crowdfunding platform built on the Solana blockchain.

## Features

- Create crowdfunding projects
- Connect with Solana wallets
- Track project funding progress
- Filter projects by category
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Solana CLI tools
- Phantom wallet (or other Solana-compatible wallet)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/colabio.git
cd colabio
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
colabio/
├── colabio-frontend/          # Frontend React application
│   ├── src/
│   │   ├── app/              # Next.js app directory
│   │   ├── components/       # Reusable UI components
│   │   ├── config/          # Configuration files
│   │   └── types/           # TypeScript type definitions
└── programs/                 # Solana program code
```

## Development

### Frontend Development

1. Start the development server:
```bash
cd colabio-frontend
yarn dev
```

2. The app will automatically open in your default browser

### Solana Program Development

1. Build the Solana program:
```bash
cargo build-bpf
```

2. Deploy to devnet:
```bash
anchor deploy
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
