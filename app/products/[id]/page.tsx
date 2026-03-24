import { notFound } from "next/navigation";
import { getProduct } from "@/firebase/products";
import Image from "next/image";
import Link from "next/link";
import AdminEditButton from "@/components/AdminEditButton";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Katalog
        </Link>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-96 md:h-[600px] bg-gray-100">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {product.name}
              </h1>
              <div className="mb-8">
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Rp.{product.price.toLocaleString("id-ID")}
                </p>
                <p className="text-sm text-gray-500">
                  Ditambahkan pada {product.createdAt.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Deskripsi Produk
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
              <div className="pt-6 border-t border-gray-200">
                <AdminEditButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

