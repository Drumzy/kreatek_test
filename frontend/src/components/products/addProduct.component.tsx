import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import "./product.css";
interface ProductForm {
  libelle: string;
  prix_ttc: number;
  en_stock: boolean;
  is_gift: boolean;
}
function AddProduct() {
  const [formState, setFormState] = useState<{
    libelle: string;
    prix_ttc: number;
    en_stock: string;
    is_gift: string;
  }>({ libelle: "", prix_ttc: 0, en_stock: "false", is_gift: "false" });
  const add_product = useMutation({
    mutationFn: async (new_form: ProductForm) => {
      return await fetch("http://localhost:5500/api/v1/products/new_product", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(new_form),
      }).then(async (response) => await response.json());
    },
    onSuccess(data) {
      console.log(data);
    },
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormState((values) => ({ ...values!, [name]: value }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const new_form: ProductForm = {
      libelle: formState.libelle,
      prix_ttc: formState.prix_ttc,
      en_stock: formState.en_stock === "true",
      is_gift: formState.is_gift === "true",
    };
    add_product.mutate(new_form);
  };
  return (
    <div className="form-container">
      <form className="add-product-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-input">
          <label htmlFor="">Libelle: </label>
          <input
            type="text"
            name="libelle"
            id=""
            value={formState.libelle}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="">Prix ttc: </label>
          <input
            type="number"
            name="prix_ttc"
            id=""
            min={0}
            accept="numeric"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="">En stock: </label>
          <div className="inner-items">
            <input
              type="radio"
              onChange={(e) => handleChange(e)}
              value="true"
              name="en_stock"
            />
            Yes
            <input
              type="radio"
              onChange={(e) => handleChange(e)}
              value="false"
              name="en_stock"
            />
            No
          </div>
        </div>
        <div className="form-item">
          <label htmlFor="">Is gift: </label>
          <div className="inner-items">
            <input
              type="radio"
              onChange={(e) => handleChange(e)}
              value="true"
              name="is_gift"
            />
            Yes
            <input
              type="radio"
              onChange={(e) => handleChange(e)}
              value="false"
              name="is_gift"
            />
            No
          </div>
        </div>
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default AddProduct;
