import Link from 'next/link';
import { Briefcase, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';

export default function HiringPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-orange-500/30">
            {/* NAV */}
            <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/VelocityLogo.png" alt="Velocity Logo" width={20} height={20} className="w-5 h-5" />
                        <span className="font-bold text-white tracking-widest font-mono">VELOCITY</span>
                    </Link>
                    <div className="flex items-center space-x-6 text-sm font-mono">
                        <Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors">Login</Link>
                        <Link href="/auth/signup" className="bg-white text-black hover:bg-slate-200 px-4 py-2 font-bold rounded transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* HERO */}
            <section className="py-20 px-6 max-w-5xl mx-auto text-center">
                <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 mb-8">
                    <Briefcase className="w-3 h-3 text-orange-500" />
                    <span className="text-[10px] uppercase tracking-widest text-orange-500 font-bold font-mono">
                        For Engineering Leaders
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Hire Engineers Who Can <br /> <span className="text-orange-500">Actually Debug</span>.
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                    Stop filtering for dynamic programming memorization. Start filtering for the ability to handle dirty data, vague requirements, and broken production environments.
                </p>
            </section>

            {/* PROBLEM */}
            <section className="py-16 bg-slate-900/20 border-y border-slate-900">
                <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">The LeetCode False Positive</h2>
                        <p className="text-slate-400 mb-6">
                            You hire a candidate because they can invert a binary tree on a whiteboard. Three weeks later, they're stuck because a JSON payload has a trailing comma and they don't know how to grep logs.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-red-400">
                                <XCircle className="w-5 h-5" />
                                <span>Can't debug third-party APIs</span>
                            </div>
                            <div className="flex items-center space-x-3 text-red-400">
                                <XCircle className="w-5 h-5" />
                                <span>Over-engineers simple solutions</span>
                            </div>
                            <div className="flex items-center space-x-3 text-red-400">
                                <XCircle className="w-5 h-5" />
                                <span>Needs perfect specs to function</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-900 p-8 rounded-xl border border-slate-800">
                        <h2 className="text-2xl font-bold text-white mb-4">The Velocity Standard</h2>
                        <p className="text-slate-400 mb-6">
                            Our assessments mimic a bad day on-call. Candidates fix broken encodings, trace race conditions, and recover from AI hallucinations.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-emerald-400">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Parses malformed data</span>
                            </div>
                            <div className="flex items-center space-x-3 text-emerald-400">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Writes robust error handling</span>
                            </div>
                            <div className="flex items-center space-x-3 text-emerald-400">
                                <CheckCircle2 className="w-5 h-5" />
                                <span>Pragmatic problem solver</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
