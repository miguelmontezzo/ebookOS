import React from 'react';

interface LogoProps {
    variant?: 'dark' | 'light'; // dark = fundo escuro (logo branca), light = fundo claro (logo escura)
    className?: string;
}

/**
 * Logo oficial do Ebook Interativo
 * variant='dark' → logo para fundos escuros (branca)
 * variant='light' → logo para fundos claros (escura)
 * 
 * Coloque os SVGs na pasta public/:
 *   /logo-dark.svg  → versão com texto branco (para bg escuro)
 *   /logo-light.svg → versão com texto escuro (para bg claro)
 */
export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
    const src = variant === 'dark' ? '/logo-dark.svg' : '/logo-light.svg';

    return (
        <img
            src={src}
            alt="Ebook Interativo"
            className={`h-8 w-auto ${className}`}
        />
    );
}
