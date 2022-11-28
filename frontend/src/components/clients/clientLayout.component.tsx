import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import "../products/product.css";
interface ProductForm {
  nom_complet: string;
  nbr_gifts: number;
  remise_default: number;
}
function ClientLayout() {
  const [formState, setFormState] = useState<{
    nom_complet: string;
    nbr_gifts: number;
    remise_default: number;
  }>({
    nom_complet: "",
    nbr_gifts: 0,
    remise_default: 0,
  });
  const add_product = useMutation({
    mutationFn: async (new_form: ProductForm) => {
      return await fetch("http://localhost:5500/api/v1/clients/new_client", {
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
      nom_complet: formState.nom_complet,
      nbr_gifts: formState.nbr_gifts,
      remise_default: formState.remise_default,
    };
    console.log(new_form.remise_default);
    add_product.mutate(new_form);
  };
  return (
    <div className="form-container">
      <form className="add-product-form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-input">
          <label htmlFor="">Nom complet: </label>
          <input
            type="text"
            name="nom_complet"
            id=""
            value={formState.nom_complet}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-input">
          <label htmlFor="">Nombre Gift: </label>
          <input
            type="number"
            name="nbr_gifts"
            id=""
            min={0}
            accept="numeric"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-item">
          <label htmlFor="">Remise Default: </label>
          <input
            type="number"
            name="remise_default"
            id=""
            min={0}
            accept="numeric"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">send</button>
      </form>
      <span>{add_product.isSuccess ? "User Added Successfully" : ""}</span>
    </div>
  );
}

export default ClientLayout;
