
import create from "zustand";
import {devtools, persist} from "zustand/middleware"
import { Produit } from "../components/products/product.utils";
import { mountStoreDevtool } from "simple-zustand-devtools";
export interface CartItem {
    product: Produit,
    quantity?: number
}
interface CartState{
    items: CartItem[]
    add_item: (item: CartItem) =>void
    delete_item: (item:Produit) => void
    update_cart: (items:CartItem[]) => void
}
export const useCartStore = create<CartState>()(
        devtools(
            persist(
                (set) =>({
                    items: [],
                    add_item: (item) => set((state) =>({items: [...state.items, item]})),
                    delete_item: (item) => set((state) =>({items: [...state.items.slice(0,item.id),...state.items.slice(item.id+1)]})),
                    update_cart: (items) => set((state) => ({items: items}))
                })
            )
        )
    )

mountStoreDevtool('Cart-Store', useCartStore);