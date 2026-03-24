"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Navigation() {
  const { user, isAdmin } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Katalog", href: "/products" },
    { label: "Pesan", href: "/pesan" },
    { label: "Kontak", href: "/kontak" },
  ];

  const activeNav = useMemo(() => {
    const item = navItems.find((item) => {
      if (item.href === "/") return pathname === "/";
      return pathname.startsWith(item.href);
    });
    return item?.label || "Beranda";
  }, [pathname]);

  return (
    <nav className="bg-white/80 backdrop-blur border-b border-purple-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-25 h-25  rounded-xl flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Toko Wiwin Logo" className="w-[50px] h-[50px] object-contain" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent">
                Toko Wiwin
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    activeNav === item.label
                      ? "text-purple-700 border-b-4 border-purple-500"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {isAdmin ? (
              <>
                <Link href="/admin/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition">
                  Dashboard
                </Link>
                <Link href="/admin/add" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium">
                  + Produk
                </Link>
              </>
            ) : (
              <Link href="/admin/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

