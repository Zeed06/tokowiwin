"use client";

import { useRouter } from "next/navigation";
import { addProduct } from "@/firebase/products";
import { ProductFormData } from "@/lib/types";
import ProductForm from "@/components/ProductForm";
import AdminRoute from "@/components/AdminRoute";

function AddProductContent() {
  const router = useRouter();

  const handleSubmit = async (data: ProductFormData) => {
    await addProduct(data);
    router.push("/admin/dashboard");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Produk Baru</h1>
          <p className="text-gray-600 mb-8">Lengkapi informasi produk di bawah ini</p>
          <ProductForm onSubmit={handleSubmit} submitLabel="Tambah Produk" />
        </div>
      </div>
    </div>
  );
}

export default function AddProductPage() {
  return (
    <AdminRoute>
      <AddProductContent />
    </AdminRoute>
  );
}

