import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LandingPage from "./pages/LandingPage";
import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminNavbar from "./components/AdminNavbar/SideNavbar";
import Advertise from "./components/Advertise/Advertise";
import CustomerAdvertise from "./components/CustomerAdvertise/CustomerAdvertises";
import Inventory from "./components/Inventory/Inventory";
import AllProducts from "./components/AllProducts/AllProducts";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/adminnavbar" element={<AdminNavbar />} />
            <Route path="/advertise" element={<Advertise />} />
            <Route path="/alladvertise" element={<CustomerAdvertise />} />
            <Route path="/products" element={<Inventory />} />
            <Route path="/allproducts" element={<AllProducts />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
