import { discountpricing } from "../../store/pricing.helper";
import { CartItem, CartState, ClientState, useCombinedStore } from "../../store/store";

export const addProduct = (combine_store: CartState & ClientState ,new_product: CartItem) => {
    const product_check = combine_store.items.findIndex(
      (item) => item.product.id === new_product.product.id
    );
    if (product_check !== -1) {
      const mule = combine_store.items;
      mule[product_check].quantity!++;
      combine_store.update_cart(mule, new_product.product.prix_ttc);
    } else {
      combine_store.add_item(
        {
          product: {
            id: new_product.product.id,
            libelle: new_product.product.libelle,
            prix_ttc: new_product.product.prix_ttc,
            en_stock: new_product.product.en_stock,
            is_gift: new_product.product.is_gift,
          },
          quantity: 1,
        },
        new_product.product.prix_ttc
      );
    }
  };



  export const update_total = (combine_store: CartState & ClientState) =>{
        const mule = Array.from(combine_store.items);
        let total_mule = 0;
        combine_store.total_ttc = 0;
        mule.forEach((element) =>{
            if(combine_store.perso_giftSys.giftSolde > 0){  
              if(combine_store.perso_giftSys.is_using_gifts && element.product.is_gift){
                if(combine_store.perso_giftSys.giftSolde> (element.product.prix_ttc* element.quantity!)){
                  combine_store.perso_giftSys.giftSolde =combine_store.perso_giftSys.giftSolde-element.product.prix_ttc;
                }
                element.product.prix_ttc = (element.product.prix_ttc - ((element.product.prix_ttc * 70)/100)) 
              }
            }
            element.product.prix_ttc = (element.product.prix_ttc - ((element.product.prix_ttc * combine_store.client!.remise_default)/100))
            total_mule = total_mule + (element.product.prix_ttc*element.quantity!)
        })
        combine_store.apply_gift_coupon(mule,total_mule)
  }