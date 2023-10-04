import { Outlet } from "react-router-dom";
//storing outlet in the adminmain component and use it in the app.js
export const AdminMain =()=>(
    <main className="admin_main">
        <Outlet/>
    </main>
);