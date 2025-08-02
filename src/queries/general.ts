import {useMutation, useQueryClient} from "@tanstack/react-query";
import {fetchWithAuth} from "./http-client";
import {toast} from "sonner";
import {EntityWithId} from "../types/api";

export const useUpdateItemPosition = <T extends EntityWithId>() => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, { sequence: T[] }>({
        mutationFn: async (payload) => {
            const response = await fetchWithAuth('/updateItemPosition', {
                method: 'POST',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to update position');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['account'] });
            toast.success('Item position updated successfully', {
                description: 'The position of the item has been updated successfully.',
            });
        },
        onError: () => {
            toast.error('Failed to update item position', {
                description: 'There was an error while updating the item position. Please try again.',
            });
        },
    });
};