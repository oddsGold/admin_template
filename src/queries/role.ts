import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {QueryParams} from "../types/api";
import {fetchWithAuth} from "./http-client";
import {ResourcesResponse, Role, RoleRequest, RolesResponse} from "../types/role";
import {toast} from "sonner";

export const useGetRoles = (params: QueryParams = {}): UseQueryResult<RolesResponse, Error> => {
    const { page = 1, limit = 30, sort = '-id', status = [] } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    if (status.length > 0) {
        queryParams.set('status', JSON.stringify(status));
    }

    return useQuery<RolesResponse, Error>({
        queryKey: ['roles', page, limit, sort, status],
        queryFn: async (): Promise<RolesResponse> => {
            const response = await fetchWithAuth(`/roles?${queryParams.toString()}`);
            const jsonData = await response.json();

            if (!jsonData.data) {
                throw new Error("Invalid response structure");
            }
            return jsonData;
        },
    });
};

export const useGetResources = (params: QueryParams = {}): UseQueryResult<ResourcesResponse, Error> => {
    const { page = 1, limit = 30, sort = '-id', status = [] } = params;

    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort,
    });

    if (status.length > 0) {
        queryParams.set('status', JSON.stringify(status));
    }

    return useQuery<ResourcesResponse, Error>({
        queryKey: ['resources'],
        queryFn: async (): Promise<ResourcesResponse> => {
            const response = await fetchWithAuth(`/resources?${queryParams.toString()}`);
            const jsonData = await response.json();

            if (!jsonData.data) {
                throw new Error("Invalid response structure");
            }
            return jsonData;
        },
    });
};

export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: async (id) => {
            await fetchWithAuth(`/roles/${id}`, {
                method: 'DELETE',
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });

            toast.success('Role deleted successfully', {
                description: 'The role has been removed',
            });
        },
        onError: () => {
            toast.error('Failed to delete role', {
                description: 'Could not delete role. Please try again.',
            });
        },
    });
};

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation<Role, Error, RoleRequest>({
        mutationFn: async (data) => {
            const response = await fetchWithAuth('/roles', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['roles'] });

            toast.success('Role created successfully', {
                description: 'New role has been added',
            });
        },
        onError: () => {
            toast.error('Failed to create role', {
                description: 'Could not create new role. Please try again.',
            });
        },
    })
}