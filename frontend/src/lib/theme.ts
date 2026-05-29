import { THEME_STORAGE_KEY } from '../data/theme';
export const saveTheme = (theme: 'light'|'dark') => localStorage.setItem(THEME_STORAGE_KEY, theme);
