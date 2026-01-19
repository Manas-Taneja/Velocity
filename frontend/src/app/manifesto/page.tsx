import Link from 'next/link';
import Image from 'next/image';

export default function ManifestoPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-500/30">
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

            <main className="max-w-3xl mx-auto px-6 py-24">
                <h1 className="text-4xl font-black text-white mb-8">The Velocity Manifesto</h1>

                <div className="prose prose-invert prose-lg">
                    <p className="text-xl text-slate-400 leading-relaxed mb-8">
                        Software engineering hiring is broken. We optimize for algorithms that <strong className="text-orange-500">we never use</strong> and ignore the skills that <strong className="text-orange-500">save production</strong>.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-12 mb-4">1. Reality over Theory</h3>
                    <p>
                        In the real world, input is never clean. APIs verify SSL certificates. Dates have timezones. CSVs have mixed delimiters. Assessing a candidate on a perfectly balanced binary tree is like testing a chef on their ability to grow wheat. We test if they can cook.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-12 mb-4">2. AI is a Tool, Not a Cheat</h3>
                    <p>
                        Banning AI in interviews is like banning calculators in math class. It's 2026. If an engineer isn't using AI to move faster, they are lagging behind. But AI is lazy. It hallucinates. Velocity tests if you can <em>supervise</em> the AI, correct its mistakes, and architect the solution it generates.
                    </p>

                    <h3 className="text-2xl font-bold text-white mt-12 mb-4">3. Debugging &gt; Writing</h3>
                    <p>
                        Greenfield code is easy. Brownfield code is hard. Most work is reading other people's messy code, understanding it, and fixing it without breaking everything else. Our assessments reflect this reality.
                    </p>

                    <div className="mt-16 pt-8 border-t border-slate-800 flex justify-center">
                        <Link href="/auth/signup" className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded font-mono transition-colors">
                            JOIN THE MOVEMENT
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
