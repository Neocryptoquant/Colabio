import Link from 'next/link';
import Button from '../ui/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-slate-950/95">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Colabio
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/projects" className="text-sm font-medium hover:text-[#9945FF] transition-colors">
              Discover
            </Link>
            <Link href="/projects/create" className="text-sm font-medium hover:text-[#9945FF] transition-colors">
              Start a Project
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* Wallet button will be added here */}
          <Button variant="outline" className="hidden md:inline-flex">
            Connect Wallet
          </Button>
          <Button variant="ghost" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
} 