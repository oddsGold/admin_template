import { useQuery } from '@tanstack/react-query';
import {fetchWithAuth} from "./http-client.ts";
import {MenuItem} from "../types/menu.ts";

interface MenuResponse {
    data: MenuItem[];
}

export const useGetMenuItems = (enabled: boolean) => {
    const { data, ...queryRest } = useQuery<MenuItem[]>({
        queryKey: ['menu'],
        queryFn: async (): Promise<MenuItem[]> => {
            const response = await fetchWithAuth('/account/menus');
            const json: MenuResponse = await response.json();
            return json.data;
        },
        enabled: enabled
    });

    return {
        menu: data,
        ...queryRest
    };
};