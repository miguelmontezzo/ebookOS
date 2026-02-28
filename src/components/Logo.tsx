import React from 'react';

interface LogoProps {
    variant?: 'dark' | 'light'; // dark = fundo escuro (texto branco), light = fundo claro (texto escuro)
    className?: string;
    showText?: boolean;
}

/**
 * Logo oficial do Ebook Interativo
 * variant='dark' → usa texto branco (para fundos escuros)
 * variant='light' → usa texto escuro (para fundos claros)
 */
export default function Logo({ variant = 'dark', className = '', showText = true }: LogoProps) {
    const textColor = variant === 'dark' ? '#ffffff' : '#1a1a2e';
    const accentColor = '#5cb882'; // verde da marca

    return (
        <div className={`flex items-center gap-2.5 ${className}`}>
            {/* Ícone: 4 barras verticais (livros na estante) */}
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="4" width="5" height="32" rx="2.5" fill={accentColor} />
                <rect x="12" y="7" width="5" height="29" rx="2.5" fill={accentColor} />
                <rect x="20" y="4" width="5" height="32" rx="2.5" fill={accentColor} />
                <rect x="28" y="2" width="5" height="34" rx="2.5" fill={accentColor} transform="rotate(8 30.5 19)" />
            </svg>

            {showText && (
                <div className="flex flex-col leading-none">
                    <span style={{ color: textColor }} className="font-black text-[15px] tracking-tight">eBook</span>
                    <span style={{ color: textColor }} className="font-black text-[15px] tracking-tight">Interativo</span>
                </div>
            )}
        </div>
    );
}
