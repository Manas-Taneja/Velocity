import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-slate-300 font-sans">
            <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-2xl">
                <div className="flex justify-center mb-8">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/VelocityLogo.png" alt="Velocity Logo" width={32} height={32} />
                        <span className="font-bold text-white tracking-widest font-mono text-xl">VELOCITY</span>
                    </Link>
                </div>

                <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In</h2>

                <form className="space-y-4">
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Email</label>
                        <input
                            type="email"
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="dev@velocity.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-500 mb-1 uppercase">Password</label>
                        <input
                            type="password"
                            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>

                    <button className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded transition-colors font-mono">
                        AUTHENTICATE
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="text-orange-500 hover:text-orange-400">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
