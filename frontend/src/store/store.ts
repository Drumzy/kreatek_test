
import create from "zustand";
import {devtools, persist} from "zustand/middleware";
import { Produit } from "../components/products/product.utils";
import { mountStoreDevtool } from "simple-zustand-devtools";
export interface CartItem {
    product: Produit,
    quantity?: number
}
export interface GiftSys{
    is_using_gifts:boolean,
    giftnb_to_use:number,
    giftSolde: number,
}
export interface CartState{
    items: CartItem[]
    total_ttc: number,
    perso_giftSys: GiftSys,
    add_item: (item: CartItem,price: number) =>void
    delete_item: (item:CartItem) => void
    update_cart: (items:CartItem[],price: number) => void
    clear_cart: () => void
    apply_gift_coupon: (items:CartItem[],price: number) =>void
    increment_giftnb_to_use: () => void,
    decrement_giftnb_to_use: () => void,
    reset_gift_sys: () =>void
}

export interface Client{
    id:number;
    createdAt:Date;
    updatedAt:Date;
    nom_complet: string;
    nbr_gifts: number;
    remise_default: number;
}
export interface ClientState{
    client: Client | null
    login: (nom_complet: Client) => void;
    logout: () => void;
}
export const useCombinedStore = create<CartState & ClientState>()(    
    devtools(
            persist(
                (set) =>({
                    items: [],
                    total_ttc:0,
                    perso_giftSys:{is_using_gifts:false,giftnb_to_use:0,giftSolde:0},
                    client: null,
                    add_item: (item) => set((state) =>({items: [...state.items, item],total_ttc:state.total_ttc + item.product.prix_ttc})),
                    delete_item: (item) => set((state) =>({items: state.items.filter(
                        (tmp_item: { product: Produit; }) => tmp_item.product !== item.product
                    ),total_ttc: state.total_ttc - (item.product.prix_ttc* state.items.find(function(tmp_item: { product: Produit; }) {
                        return tmp_item.product === item.product
                    })?.quantity!)})),
                    update_cart: (items,price) => set((state) => ({items: items,total_ttc: state.total_ttc + price})),
                    clear_cart: () => set({items: []}),
                    login: (client) => set({client:client}),
                    logout: () => set({client: null}),
                    apply_gift_coupon: (items,price) => set({items:items,total_ttc: price}),
                    reset_gift_sys: () =>set({perso_giftSys:{is_using_gifts:false,giftnb_to_use:0,giftSolde:0}}),
                    increment_giftnb_to_use: () => set((state) => ({perso_giftSys:{is_using_gifts:true,giftnb_to_use:state.perso_giftSys.giftnb_to_use+1,giftSolde:state.perso_giftSys.giftSolde+100}})),
                    decrement_giftnb_to_use: () => set((state) => ({
                        perso_giftSys: state.perso_giftSys.giftnb_to_use > 1 ? {is_using_gifts:true,giftnb_to_use:state.perso_giftSys.giftnb_to_use-1,giftSolde:state.perso_giftSys.giftSolde-100}:{is_using_gifts:false,giftnb_to_use:0,giftSolde:0},
                    })),
                })
            )
        )
    )
mountStoreDevtool('global', useCombinedStore);
