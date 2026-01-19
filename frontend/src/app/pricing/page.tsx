import Link from 'next/link';
import Image from 'next/image';
import { Check } from 'lucide-react';

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-secondary/30">
            <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/VelocityLogo.png" alt="Velocity Logo" width={20} height={20} className="w-5 h-5" />
                        <span className="font-bold text-white tracking-widest font-mono">VELOCITY</span>
                    </Link>
                    <div className="flex items-center space-x-6 text-sm font-mono">
                        <Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors">Login</Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-24 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Simple Pricing</h1>
                <p className="text-xl text-slate-400 mb-16">No credit card required. No hidden tiers.</p>

                <div className="max-w-md mx-auto bg-slate-900 border-2 border-secondary rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 font-mono uppercase rounded-bl-lg">
                        Developer Preview
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Standard Protocol</h2>
                    <div className="text-5xl font-black text-white mb-6 font-mono">
                        $0<span className="text-lg text-slate-500 font-normal">/mo</span>
                    </div>

                    <ul className="text-left space-y-4 mb-8 text-slate-300">
                        <li className="flex items-center"><Check className="w-5 h-5 text-secondary mr-3" /> Unlimited Practice Problems</li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-secondary mr-3" /> AI Coach Access</li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-secondary mr-3" /> Global Leaderboards</li>
                        <li className="flex items-center"><Check className="w-5 h-5 text-secondary mr-3" /> Portfolio Profile</li>
                    </ul>

                    <Link href="/auth/signup" className="block w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-lg font-mono transition-colors">
                        START CODING NOW
                    </Link>
                    <p className="mt-4 text-xs text-slate-500">
                        Velocity is currently in free public beta.
                    </p>
                </div>
            </main>
        </div>
    );
}
