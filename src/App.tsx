import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminAuth from "./pages/AdminAuth";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Reservations from "./pages/admin/Reservations";
import Orders from "./pages/admin/Orders";
import MenuManagement from "./pages/admin/MenuManagement";
import Kitchen from "./pages/admin/Kitchen";
import QRCodes from "./pages/admin/QRCodes";
import TentBookings from "./pages/admin/TentBookings";
import { CartProvider } from "@/hooks/useCart";

const queryClient = new QueryClient();

function App() {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundImage: "url('/images/background.jpg.jpeg')",
        backgroundSize: "contain",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#1a0d02"
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10">
        <QueryClientProvider client={queryClient}>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/admin-auth" element={<AdminAuth />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="reservations" element={<Reservations />} />
                    <Route path="tent-bookings" element={<TentBookings />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="kitchen" element={<Kitchen />} />
                    <Route path="menu" element={<MenuManagement />} />
                    <Route path="qrcodes" element={<QRCodes />} />
                  </Route>
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </QueryClientProvider>
      </div>
    </div>
  );
}

export default App;
