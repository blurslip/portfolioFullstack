import { useEffect, useState } from "react";
import AddSkill from "./AddSkill";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;
function Admin() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/admin`, {
          credentials: "include",
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        if (!res.ok) {
          throw new Error(`Http error!!! status: ${res.status}`);
        }

      } catch (err) {
        console.error("Failed to fetch admin Data: ", err);
      }
    };
    
    fetchData();
  }, []);

  // LOGOUT LOGIC

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URL}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/login";
      toast.success("Logout Successfull");
    } catch (err) {
      toast.error("Logout Failed: ", err);
    }
  };
  return (
    <>
      <div>
        <AddSkill onLogout={handleLogout} />
      </div>
    </>
  );
}
export default Admin;
