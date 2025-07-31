export interface SubmenuItem {
    id: number;
    name: string;
    urn: string | null;
    material_icon: string | null;
}

export interface MenuItem {
    id: number;
    name: string;
    urn: string | null;
    material_icon: string | null;
    submenu?: SubmenuItem[];
}

export interface MenuResponse {
    data: MenuItem[];
}