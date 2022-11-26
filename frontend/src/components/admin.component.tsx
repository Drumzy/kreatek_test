import { Outlet } from "react-router-dom";
import "./admin.css";
function AdminPanel() {
  return (
    <div className="admin-container">
      <div className="admin-links">
        <a href="/admin/ajouter_produit">Ajouter produit</a>
        <a href="/admin/ajouter_client">Ajouter client</a>
      </div>
      <Outlet />
    </div>
  );
}

export default AdminPanel;
