'use client';

import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingButtons() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
        };
        checkAuth();
    }, []);

    const handleScrollToDemo = (e: React.MouseEvent) => {
        e.preventDefault();
        const demoSection = document.getElementById('demo-terminal');
        if (demoSection) {
            demoSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            {isAuthenticated ? (
                <Link href="/problems" className="group relative px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold font-mono rounded overflow-hidden transition-all">
                    <span className="relative z-10 flex items-center">
                        START ASSESSMENT
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            ) : (
                <Link href="/auth/login" className="group relative px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold font-mono rounded overflow-hidden transition-all">
                    <span className="relative z-10 flex items-center">
                        START ASSESSMENT
                        <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                </Link>
            )}

            <button onClick={handleScrollToDemo} className="px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-white font-mono rounded transition-all">
                VIEW DEMO
            </button>
        </div>
    );
}
