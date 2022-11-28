import { v4 } from "uuid";
import { CartState, ClientState } from "../../store/store";
import React, { useState } from "react";
import { update_total } from "./shop.utils";

interface CartProps {
  cartVisibilty: boolean;
  setCartVisibilty: React.Dispatch<React.SetStateAction<boolean>>;
  cartState: CartState & ClientState;
}
function Cart(props: CartProps) {
  const [isUsingCoupon, setIsUsingCoupon] = useState(false);
  return (
    <div
      className="cart-container"
      style={{ display: `${props.cartVisibilty === true ? "flex" : "none"}` }}
    >
      <h2>Your Cart</h2>
      <div className="cart-item">
        <label htmlFor="" className="cit">
          Name:
        </label>
        <label htmlFor="" className="cit">
          Quantity:
        </label>
        <div className="cit">action</div>
      </div>
      {props.cartState.items.map((item) => (
        <div key={v4()} className="cart-item">
          <div className="cit">
            <p>{item.product.libelle}</p>
          </div>
          <div className="cit">
            <p>{item.quantity}</p>
          </div>
          <button
            onClick={() => props.cartState.delete_item(item)}
            className="cit"
          >
            X
          </button>
        </div>
      ))}
      <div className="cart-question">
        <p>do you want to use gift coupons</p>
        <button onClick={() => setIsUsingCoupon(true)}>yes</button>
        <button
          onClick={() => {
            setIsUsingCoupon(false);
            props.cartState.reset_gift_sys();
          }}
        >
          no
        </button>
      </div>
      <div
        className="cart-item"
        style={{ display: isUsingCoupon ? "grid" : "none" }}
      >
        <button
          onClick={() => {
            props.cartState.decrement_giftnb_to_use();
          }}
        >
          -
        </button>
        <span>{props.cartState.perso_giftSys.giftnb_to_use}</span>
        <button
          onClick={() => {
            props.cartState.increment_giftnb_to_use();
          }}
        >
          +
        </button>
        <span>Solde Gift: {props.cartState.perso_giftSys.giftSolde}</span>
        <button onClick={() => update_total(props.cartState)}>
          Apply Gift Coupans
        </button>
      </div>
      <span>Total ttc:{props.cartState.total_ttc}</span>
    </div>
  );
}

export default Cart;
