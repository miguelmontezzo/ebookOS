import React from 'react';

export const THEME_COLORS = [
    { name: 'indigo', label: 'Índigo', bg: 'bg-indigo-500', ring: 'ring-indigo-400' },
    { name: 'emerald', label: 'Esmeralda', bg: 'bg-emerald-500', ring: 'ring-emerald-400' },
    { name: 'rose', label: 'Rosa', bg: 'bg-rose-500', ring: 'ring-rose-400' },
    { name: 'amber', label: 'Âmbar', bg: 'bg-amber-500', ring: 'ring-amber-400' },
    { name: 'sky', label: 'Azul Céu', bg: 'bg-sky-500', ring: 'ring-sky-400' },
    { name: 'violet', label: 'Violeta', bg: 'bg-violet-500', ring: 'ring-violet-400' },
    { name: 'teal', label: 'Teal', bg: 'bg-teal-500', ring: 'ring-teal-400' },
    { name: 'orange', label: 'Laranja', bg: 'bg-orange-500', ring: 'ring-orange-400' },
    { name: 'cyan', label: 'Ciano', bg: 'bg-cyan-500', ring: 'ring-cyan-400' },
    { name: 'fuchsia', label: 'Fúcsia', bg: 'bg-fuchsia-500', ring: 'ring-fuchsia-400' },
    { name: 'lime', label: 'Lima', bg: 'bg-lime-500', ring: 'ring-lime-400' },
    { name: 'red', label: 'Vermelho', bg: 'bg-red-500', ring: 'ring-red-400' },
];

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    label?: string;
    darkMode?: boolean;
}

export default function ColorPicker({ value, onChange, label = 'Cor Principal', darkMode = true }: ColorPickerProps) {
    const selectedColor = THEME_COLORS.find(c => c.name === value) || THEME_COLORS[0];

    return (
        <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                {label}
            </label>
            <div className="flex flex-wrap gap-2">
                {THEME_COLORS.map((color) => (
                    <button
                        key={color.name}
                        type="button"
                        onClick={() => onChange(color.name)}
                        title={color.label}
                        className={`
                            w-8 h-8 rounded-full ${color.bg} transition-all duration-200 hover:scale-110
                            ${value === color.name
                                ? `ring-2 ${color.ring} ring-offset-2 ${darkMode ? 'ring-offset-zinc-900' : 'ring-offset-white'} scale-110`
                                : 'opacity-60 hover:opacity-100'
                            }
                        `}
                    />
                ))}
            </div>
            <p className={`text-xs mt-2 ${darkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Selecionado: <span className={`font-bold ${darkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{selectedColor.label}</span>
            </p>
        </div>
    );
}
