import {useMutation, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query';
import {fetchWithAuth} from "./http-client";
import { toast } from 'sonner';
import {User, UserRequest, UsersQueryParams, UsersResponse} from "../types/users";

type EmailRequest = {
    email: string;
}

type PasswordRequest = {
    old_password: string;
    password: string;
    password_confirmation: string;
}

export const useGetUsers = (params: UsersQueryParams = {}): UseQueryResult<UsersResponse, Error> => {
    const { page = 1, limit = 30, sort = '-id', status = [] } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    if (status.length > 0) {
        queryParams.set('status', JSON.stringify(status));
    }

    return useQuery<UsersResponse, Error>({
        queryKey: ['users', page, limit, sort, status],
        queryFn: async (): Promise<UsersResponse> => {
            const response = await fetchWithAuth(`/users?${queryParams.toString()}`);
            const jsonData = await response.json();

            if (!jsonData.data) {
                throw new Error("Invalid response structure");
            }
            return jsonData;
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
        mutationFn: async (id) => {
            await fetchWithAuth(`/users/${id}`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });

            toast.success('User deleted successfully', {
                description: 'The user has been removed',
            });
        },
        onError: () => {
            toast.error('Failed to delete user', {
                description: 'Could not delete user. Please try again.',
            });
        },
    });
};

export const useUpdateEmail = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, EmailRequest>({
        mutationFn: async ({email}) => {
            await fetchWithAuth('/account/email', {
                method: 'POST',
                body: JSON.stringify({ email }),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });

            toast.success('Email updated successfully', {
                description: 'Your email address has been changed',
            });
        },
        onError: () => {
            toast.error('Email update failed', {
                description: 'Failed to update email address. Please try again.',
            });
        },
    })
}

export const useUpdatePassword = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, PasswordRequest>({
        mutationFn: async (data) => {
            await fetchWithAuth('/account/password', {
                method: 'POST',
                body: JSON.stringify(data),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });

            toast.success('Password updated successfully', {
                description: 'Your password has been changed successfully',
            });
        },
        onError: () => {
            toast.error('Password update failed', {
                description: 'Failed to update password. Please try again.',
            });
        },
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<User, Error, UserRequest>({
        mutationFn: async (data) => {
            const response = await fetchWithAuth('/users', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });

            toast.success('Password updated successfully', {
                description: 'Your password has been changed successfully',
            });
        },
        onError: () => {
            toast.error('Password update failed', {
                description: 'Failed to update password. Please try again.',
            });
        },
    })
}