"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="bg-white/80 backdrop-blur border-b border-purple-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20 items-center">
          <div className="flex items-center gap-2 md:gap-8 min-w-0">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                <img src="/logo.png" alt="Toko Wiwin Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg md:text-2xl font-black bg-gradient-to-r from-purple-500 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent hidden sm:inline">
                Toko Wiwin
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 lg:px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
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

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden md:flex items-center gap-3">
              {isAdmin ? (
                <>
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard
                  </Link>
                  <Link href="/admin/add" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm font-medium min-h-10 flex items-center">
                    + Produk
                  </Link>
                </>
              ) : (
                <Link href="/admin/login" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition">
                  Admin Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 transition-transform ${isMenuOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 pb-4">
            <div className="space-y-2 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 text-sm font-medium transition rounded-lg ${
                    activeNav === item.label
                      ? "text-purple-700 bg-purple-50 border-l-4 border-purple-500"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {isAdmin ? (
              <div className="border-t border-gray-200 py-4 space-y-2">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/add"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  + Produk
                </Link>
              </div>
            ) : (
              <div className="border-t border-gray-200 py-4">
                <Link
                  href="/admin/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
                >
                  Admin Login
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

