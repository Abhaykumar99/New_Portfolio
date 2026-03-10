import { createContext, useContext, useState, type ReactNode } from 'react';

type VibeType = 'light' | 'dark';

interface ThemeContextType {
    vibe: VibeType;
    setVibe: (vibe: VibeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [vibe, setVibe] = useState<VibeType>('dark'); // Default to dark

    return (
        <ThemeContext.Provider value={{ vibe, setVibe }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
