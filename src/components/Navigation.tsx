'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Atom, 
  Orbit, 
  BookOpen, 
  Compass, 
  Menu, 
  X, 
  Sparkles, 
  Binary, 
  Layers,
  ExternalLink
} from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Portal', icon: Compass },
    { href: '/quantum-origins/', label: '01. Orígenes Cuánticos', icon: Atom },
    { href: '/least-action/', label: '02. Mínima Acción', icon: Orbit },
    { href: '/quantum-fields/', label: '03. Campos (QFT)', icon: Layers },
    { href: '/quantum-computing/', label: '04. Comp. Cuántica', icon: Binary },
    { href: '/openwiki/', label: 'OpenWiki', icon: BookOpen },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '';
    }
    return pathname.startsWith(href.replace(/\/$/, ''));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-bg/85 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 text-text-primary hover:text-quantum transition-colors group"
        >
          <div className="w-8 h-8 rounded-lg bg-quantum/10 border border-quantum/30 flex items-center justify-center text-quantum shadow-[0_0_12px_rgba(56,189,248,0.25)] group-hover:scale-105 transition-transform">
            <Atom className="w-4 h-4 animate-spin-slow" />
          </div>
          <div>
            <span className="font-semibold tracking-tight text-sm sm:text-base text-text-primary">
              Quantum<span className="text-quantum">Atlas</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-surface-raised border border-border rounded text-text-muted">
              QFT Hub
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  active 
                    ? 'bg-quantum/15 text-quantum border border-quantum/30 shadow-[0_0_10px_rgba(56,189,248,0.15)]' 
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-raised/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-quantum' : 'text-text-muted'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons & Mobile Toggle */}
        <div className="flex items-center gap-2">
          {/* Legacy Scrolltelling Link */}
          <Link
            href="/legacy/index.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Ver Scrolltelling Clásico Standalone (HTML/Canvas)"
            className="hidden md:flex items-center gap-1 text-[11px] font-mono text-text-muted hover:text-landau px-2 py-1 rounded border border-border hover:border-landau/40 transition-colors"
          >
            <span>Clásico</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/willkwolf/QFT-Intro"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Repositorio GitHub"
            className="p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-raised transition-colors"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            className="lg:hidden p-2 text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-raised"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-bg/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1 shadow-2xl">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active 
                    ? 'bg-quantum/15 text-quantum border border-quantum/30' 
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-raised'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-quantum' : 'text-text-muted'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
          
          <div className="pt-2 border-t border-border mt-2">
            <Link
              href="/legacy/index.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs font-mono text-text-muted hover:text-landau"
            >
              <span>Ver Scrolltelling Clásico (HTML)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
