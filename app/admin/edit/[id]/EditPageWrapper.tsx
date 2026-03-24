"use client";

import AdminRoute from "@/components/AdminRoute";
import EditProductForm from "./EditProductForm";
import { Product } from "@/lib/types";

interface EditPageWrapperProps {
  product: Product;
  productId: string;
}

export default function EditPageWrapper({ product, productId }: EditPageWrapperProps) {
  return (
    <AdminRoute>
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Produk</h1>
            <p className="text-gray-600 mb-8">Ubah informasi produk di bawah ini</p>
            <EditProductForm product={product} productId={productId} />
          </div>
        </div>
      </div>
    </AdminRoute>
  );
}

