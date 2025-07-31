import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    token: string | null;
    tfa: boolean;
    tfaQrCode: string | null;
    setToken: (token: string) => void;
    clearToken: () => void;
    setTfa: (tfa: boolean, qrCode?: string | null) => void;
    clearTfa: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            tfa: false,
            tfaQrCode: null,

            // Встановити токен
            setToken: (token) => set({ token }),

            // Видалити токен (при логауті)
            clearToken: () => set({ token: null, tfa: false, tfaQrCode: null }),

            // Встановити TFA стан (з QR-кодом або без)
            setTfa: (tfa, tfa_qr_code = null) => set({ tfa, tfaQrCode: tfa_qr_code }),

            // Скинути TFA (після успішної верифікації)
            clearTfa: () => set({ tfa: false, tfaQrCode: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                token: state.token,
                tfa: state.tfa,
            }),
        }
    )
);