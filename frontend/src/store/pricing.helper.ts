import { CartItem } from "./store";
export function discountpricing(item: CartItem,remise_default:number){
    return item.product.is_gift ? (item.product.prix_ttc - ((item.product.prix_ttc * 70)/100)) :(item.product.prix_ttc - ((item.product.prix_ttc * remise_default)/100)); 
}
// export function applyGiftCoupon(total_ttc:number,items:CartItem[],giftnb_to_use:number){
//     items.forEach((item) =>{
//         if(item.product.is_gift){
//             item.product.
//         }
//     })
// }