export interface ProductEntry {
    libelle: string;
    prix_ttc: number;
    en_stock: boolean;
    is_gift: boolean;
}
export interface ProductUpdateEntry {
    libelle?: string;
    prix_ttc?: number;
    en_stock?: boolean;
    is_gift?: boolean;
}