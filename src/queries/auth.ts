import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchWithAuth } from './http-client';
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../store";
import { toast } from 'sonner';
import {AccountData, ApiResponse} from "../types/account";

type LoginCredentials = {
    login: string;
    password: string;
};

type LoginResponse = {
    'access-token': string;
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    const { setToken } = useAuthStore();
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, LoginCredentials>({
        mutationFn: async ({ login, password }) => {
            const response = await fetchWithAuth('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ login, password })
            });
            return response.json();
        },
        onSuccess: (data) => {
            setToken(data['access-token']);
            queryClient.invalidateQueries({ queryKey: ['account'] });

            toast.success('Успішний вхід', {
                description: 'Ви авторизовані в системі',
            });

            navigate('/');
        },
        onError: () => {
            toast.error('Помилка входу', {
                description: 'Невірний логін або пароль',
            });
        },
    });
};

export const useLogout = () => {
    const { clearToken } = useAuthStore();

    return useMutation({
        mutationFn: () =>
            fetchWithAuth('/auth/logout', {
                method: 'POST',
            }),
        onSuccess: () => {
            clearToken();
        },
    });
};

export const useGetAccount = () => {
    const { data, ...rest } = useQuery<AccountData>({
        queryKey: ['account'],
        queryFn: async (): Promise<AccountData> => {
            console.log('Starting account fetch');
            try {
                const response = await fetchWithAuth('/account');
                console.log('Account fetch completed', response);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json: ApiResponse = await response.json();

                return json.data;
            }catch (error) {
                console.error('Account fetch failed', error);
                throw error;
            }
            
            // const response = await fetchWithAuth('/account');
            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const json: ApiResponse = await response.json();
            // if (!json.data) {
            //     throw new Error("Invalid response structure");
            // }
            // return json.data;
        },
    });

    return {
        account: data,
        ...rest
    };
};

export const useLoginTFA = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (code: string) =>
            fetchWithAuth('/auth/tfa', {
                method: 'POST',
                body: JSON.stringify({ code: code.toString() }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
        },
    });
};

export const useForgotTFA = () => {
    return useQuery({
        queryKey: ['forgotTFA'],
        queryFn: () =>
            fetchWithAuth('/auth/tfa/forgot').then(res => res.json()),
    });
};