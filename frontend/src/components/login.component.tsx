import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useCombinedStore } from "../store/store";
import "./login.css";
function Login() {
  const CombinedStore = useCombinedStore((state) => state);
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: async (nom_complet: string) => {
      return await fetch("http://localhost:5500/api/v1/clients/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ nom_complet: nom_complet }),
      }).then(async (response) => await response.json());
    },
    onSuccess: (data) => {
      if (data !== null) {
        CombinedStore.login(data);
        navigate("/shop");
      }
    },
  });
  const [nom_complet, setNomComplet] = useState("");
  return (
    <div className="login-form">
      <div className="form-input">
        <label htmlFor="username">Nom complet:</label>
        <input
          type="text"
          name="username"
          id=""
          value={nom_complet}
          onChange={(e) => setNomComplet(e.currentTarget.value)}
        />
      </div>
      <span style={{ color: "red" }}>
        {loginMutation.data === null ? "Unauthorized" : null}
      </span>
      <button onClick={() => loginMutation.mutate(nom_complet)}>
        {loginMutation.isLoading ? "Loading" : "Login"}
      </button>
    </div>
  );
}

export default Login;
