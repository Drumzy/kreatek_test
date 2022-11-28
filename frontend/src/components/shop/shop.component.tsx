import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCombinedStore } from "../../store/store";
import { getProducts, Produit } from "../products/product.utils";
import "./shop.css";
import Cart from "./cart.component";
import { useNavigate } from "react-router-dom";
import { addProduct } from "./shop.utils";

function Shop() {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const navigate = useNavigate();
  const [cartVisibilty, setCartVisibilty] = useState(true);
  const CombinedStore = useCombinedStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      if (CombinedStore.client === null) {
        navigate("/");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [CombinedStore.client]);

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div className="shop-container">
      <div className="cart-btn">
        <button onClick={() => setCartVisibilty(!cartVisibilty)}>
          &#128722;
        </button>
        <button
          onClick={() => {
            CombinedStore.clear_cart();
            CombinedStore.logout();
          }}
        >
          Logout
        </button>
      </div>
      <div className="products-container">
        {data.map((product: Produit) => (
          <div key={product.id} className="product-card">
            <p>{product.libelle}</p>
            <p>{product.prix_ttc}TND</p>
            <p>
              {product.is_gift === true ? (
                <span className="gift-badge"> Gift coupon &#10003; </span>
              ) : (
                <span className="gift-badge" style={{ backgroundColor: "red" }}>
                  Gift coupon &#x2717;
                </span>
              )}
            </p>
            <button
              onClick={() =>
                addProduct(CombinedStore, { product: product, quantity: 1 })
              }
            >
              &#128722;+
            </button>
          </div>
        ))}
      </div>
      <Cart
        cartVisibilty={cartVisibilty}
        setCartVisibilty={setCartVisibilty}
        cartState={CombinedStore}
      />
    </div>
  );
}

export default Shop;
