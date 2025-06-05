import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("adminToken");
    navigate("/admin/signin");
  }, [navigate]);

  return <div>Logging out...</div>;
}

export default Logout;
