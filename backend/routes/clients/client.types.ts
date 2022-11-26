export interface ClientCreateEntry {
    nom_complet: string;
    nbr_gifts: number;
    remise_default: number;
}
export interface ClientUpdateEntry {
    nom_complet?: string;
    nbr_gifts?: number;
    remise_default?: number;
}