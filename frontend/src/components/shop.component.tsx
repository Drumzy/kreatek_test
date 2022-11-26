import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CartItem, useCartStore } from "../store/store";
import { getProducts, Produit } from "./products/product.utils";
import "./shop.css";

function Shop() {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const [cartVisibilty, setCartVisibilty] = useState(true);
  const userCart = useCartStore((state) => state.items);
  const add_item = useCartStore((state) => state.add_item);
  const update_cart = useCartStore((state) => state.update_cart);
  const addProduct = (new_product: CartItem) => {
    const product_check = userCart.findIndex(
      (item) => item.product === new_product.product
    );
    if (product_check !== -1) {
      const mule = userCart;
      mule[product_check].quantity!++;
      update_cart(mule);
    } else {
      add_item(new_product);
    }
  };

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="shop-container">
      <button onClick={() => setCartVisibilty(!cartVisibilty)}>
        &#128722;
      </button>
      <div
        className="cart-container"
        style={{ display: `${cartVisibilty === true ? "flex" : "none"}` }}
      >
        {userCart.map((item) => (
          <div key={Math.floor(Math.random())} className="cart-item">
            <p>{item.product.libelle}</p>
            <p>{item.quantity}</p>
            <button>X</button>
          </div>
        ))}
      </div>
      <div className="products-container">
        {data.map((product: Produit) => (
          <div key={product.id} className="product-card">
            <p>{product.libelle}</p>
            <p>{product.prix_ttc} TND</p>
            <p>
              {product.is_gift === true ? (
                <span className="gift-badge"> Gift coupon &#10003; </span>
              ) : (
                ""
              )}
            </p>
            <button
              onClick={() => addProduct({ product: product, quantity: 1 })}
            >
              &#128722;+
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;
