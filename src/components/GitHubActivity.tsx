'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SpotlightCard from '@/components/SpotlightCard';

const githubUsername = 'Erlanggaaghnaf';

export default function GitHubActivity() {
  const [userData, setUserData] = useState<{ public_repos?: number; followers?: number } | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadGitHubProfile = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GitHub API request failed: ${response.status}`);
        }

        setUserData(await response.json());
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        console.error('Gagal memuat data GitHub', error);
      }
    };

    void loadGitHubProfile();

    return () => controller.abort();
  }, []);

  return (
    <SpotlightCard className="w-full p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gpu-accelerated flex flex-col space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">Live Status &amp; Open Source</span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">GitHub Activity Feed</h3>
          </div>
          
          {/* Tautan Profil GitHub dengan Logo Ikon Resmi */}
          <a 
            href={`https://github.com/${githubUsername}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:text-white hover:bg-white/10 transition-all self-start sm:self-auto"
          >
            {/* Logo Ikon SVG GitHub */}
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>{githubUsername}</span>
            <span className="text-white/40">↗</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {userData?.public_repos ?? '...'}
            </div>
            <div className="text-xs text-white/50 font-mono">Public Repositories</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
            <div className="text-2xl sm:text-3xl font-bold text-white">
              {userData?.followers ?? '...'}
            </div>
            <div className="text-xs text-white/50 font-mono">GitHub Followers</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Active Contributor</span>
            </div>
            <div className="text-xs text-white/50">Building web &amp; AI architectures</div>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-xs font-mono text-white/50 mb-3 uppercase tracking-wider">Contribution Grid</div>
          <div className="w-full bg-neutral-950/80 border border-white/10 rounded-2xl p-4 overflow-x-auto flex justify-center items-center">
            <Image
              src={`https://ghchart.rshah.org/10b981/${githubUsername}`} 
              alt="GitHub Contribution Calendar Grid"
              width={720}
              height={180}
              unoptimized
              className="h-auto w-full max-w-full rounded-lg opacity-90 filter hue-rotate-15 invert"
            />
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
}