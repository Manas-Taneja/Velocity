'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-300 font-sans">
                <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-2xl text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/50">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Check your email</h2>
                    <p className="text-slate-400 mb-8">
                        We've sent a verification link to <span className="text-white font-mono">{email}</span>. Please click the link to activate your account.
                    </p>
                    <Link href="/auth/login" className="inline-block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded transition-colors font-mono">
                        RETURN TO LOGIN
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-300 font-sans">
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-2xl">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/VelocityLogo.png" alt="Velocity Logo" width={32} height={32} />
                        <span className="font-bold text-white tracking-widest font-mono text-xl">VELOCITY</span>
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">Initialize Protocol</h2>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                            placeholder="dev@velocity.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-secondary transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3 rounded transition-colors font-mono disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                        {loading ? (
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        ) : (
                            "CREATE ACCOUNT"
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Already verified?{' '}
                    <Link href="/auth/login" className="text-secondary hover:text-secondary/80">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
