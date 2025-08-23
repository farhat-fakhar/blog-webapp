import AdminSidebar from "../_components/AdminSidebar";
import AdminTopbar from "../_components/AdminTopbar";
 
export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
