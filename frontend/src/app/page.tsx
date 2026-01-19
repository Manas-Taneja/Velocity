import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Database,
  ShieldAlert,
  Cpu,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import LandingButtons from '@/components/landing/LandingButtons';

const THEME = {
  bg: 'bg-slate-950',
  panel: 'bg-slate-900',
  border: 'border-slate-800',
  text: 'text-slate-300',
  accent: 'text-secondary',
  mono: 'font-mono'
};

const MockTerminal = () => (
  <div id="demo-terminal" className="w-full max-w-2xl mx-auto mt-12 bg-black rounded-lg border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs md:text-sm">
    <div className="bg-slate-900 p-2 flex items-center space-x-2 border-b border-slate-800">
      <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
      <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
      <span className="ml-2 text-slate-500">term — -zsh — 80x24</span>
    </div>
    <div className="p-4 space-y-2 text-slate-300">
      <div>
        <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> cat legacy_export_v1.csv
      </div>
      <div className="opacity-70">
        ID|Name|Email|Active<br />
        101|John, Doe|jdoe@corp.com|1<br />
        102;Jane;jane@startup.io;0<br />
        <span className="bg-red-900/50 text-red-200">ERROR: UNEXPECTED DELIMITER AT LINE 3</span>
      </div>
      <div>
        <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> <span className="animate-pulse">_</span>
      </div>
    </div>
  </div>
);

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  warning?: boolean;
}

const FeatureCard = ({ icon: Icon, title, desc, warning }: FeatureCardProps) => (
  <div className="p-6 border border-slate-800 bg-slate-900/30 rounded-lg hover:border-secondary/30 transition-colors group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 group-hover:border-slate-700">
        <Icon className="w-6 h-6 text-slate-400 group-hover:text-secondary transition-colors" />
      </div>
      {warning && <span className="text-[10px] text-red-500 font-mono border border-red-900 bg-red-900/10 px-2 py-1 rounded">TRAP DETECTED</span>}
    </div>
    <h3 className="text-lg font-bold text-slate-100 mb-2 font-mono">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
  </div>
);

export default function VelocityLanding() {
  return (
    <div className={`min-h-screen ${THEME.bg} text-slate-300 font-sans selection:bg-secondary/30`}>

      {/* NAV */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/VelocityLogo.png" alt="Velocity Logo" width={20} height={20} className="w-5 h-5" />
            <span className="font-bold text-white tracking-widest font-mono">VELOCITY</span>
          </div>
          <div className="flex items-center space-x-6 text-sm font-mono">
            <div className="hidden md:flex items-center space-x-2 text-xs text-slate-500">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span>SYSTEM ONLINE</span>
            </div>
            <Link href="/auth/login" className="text-slate-400 hover:text-white transition-colors">Login</Link>
            <Link href="/hiring" className="bg-white text-black hover:bg-slate-200 px-4 py-2 font-bold rounded transition-colors">
              Hiring Manager?
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 mb-8">
            <AlertTriangle className="w-3 h-3 text-secondary" />
            <span className="text-[10px] uppercase tracking-widest text-secondary font-bold font-mono">
              The Anti-LeetCode Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Algorithms are for <span className="text-slate-600">Academics</span>. <br />
            We Hire <span className="text-secondary">Data Janitors</span>.
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Stop testing for binary tree inversion. Start testing for <strong className="text-white">messy CSV parsing</strong>, <strong className="text-white">timezone debugging</strong>, and <strong className="text-white">AI hallucination recovery</strong>.
          </p>

          <LandingButtons />

          <MockTerminal />
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-24 bg-slate-900/20 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Database}
              title="The Data Landfill"
              desc="Real work isn't sorted arrays. It's 50MB CSVs with mixed delimiters, broken encodings, and dates formatted as text. We test for velocity, not memory."
            />
            <FeatureCard
              icon={Cpu}
              title="The AI Trap"
              warning={true}
              desc="We provide an AI assistant, but it's lazy. It assumes data is clean. If candidates copy-paste blindly, they crash production. We test for supervision."
            />
            <FeatureCard
              icon={ShieldAlert}
              title="Operational Reality"
              desc="No Big O notation. We grade on: Did you verify the output? Did you catch the PII leak? Did you fix the timezone drift?"
            />
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">The New Standard</h2>
            <p className="text-slate-400">Why top ops teams are switching from LeetCode.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 border border-slate-800 rounded-xl overflow-hidden">
            <div className="bg-slate-900/50 p-8 border-b md:border-b-0 md:border-r border-slate-800 opacity-50">
              <div className="flex items-center space-x-2 mb-6">
                <XCircle className="w-5 h-5 text-slate-500" />
                <h3 className="font-bold text-slate-500 uppercase tracking-widest">Traditional</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm text-slate-500">
                <li className="flex items-center"><span className="mr-3">-</span> Invert a Binary Tree</li>
                <li className="flex items-center"><span className="mr-3">-</span> Dynamic Programming</li>
                <li className="flex items-center"><span className="mr-3">-</span> "No AI allowed"</li>
                <li className="flex items-center"><span className="mr-3">-</span> Clean, academic inputs</li>
              </ul>
            </div>

            <div className="bg-slate-900/80 p-8 relative">
              <div className="absolute top-0 right-0 p-2">
                <span className="bg-secondary/20 text-secondary text-[10px] font-bold px-2 py-1 rounded uppercase">Recommended</span>
              </div>
              <div className="flex items-center space-x-2 mb-6">
                <CheckCircle2 className="w-5 h-5 text-secondary" />
                <h3 className="font-bold text-white uppercase tracking-widest">Velocity Protocol</h3>
              </div>
              <ul className="space-y-4 font-mono text-sm text-slate-300">
                <li className="flex items-center"><span className="mr-3 text-secondary">➜</span> Parse Broken JSON</li>
                <li className="flex items-center"><span className="mr-3 text-secondary">➜</span> Regex & Data Cleaning</li>
                <li className="flex items-center"><span className="mr-3 text-secondary">➜</span> "AI Mandatory" (Audit required)</li>
                <li className="flex items-center"><span className="mr-3 text-secondary">➜</span> Dirty, mixed inputs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 font-mono">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image src="/VelocityLogo.png" alt="Velocity Logo" width={16} height={16} className="w-4 h-4" />
            <span>VELOCITY PLATFORM © 2026</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/manifesto" className="hover:text-slate-400 transition-colors">MANIFESTO</Link>
            <Link href="/pricing" className="hover:text-slate-400 transition-colors">PRICING</Link>
            <Link href="/auth/login" className="hover:text-slate-400 transition-colors">LOGIN</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
