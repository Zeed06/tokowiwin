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
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition text-sm sm:text-base"
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

        <div className="bg-white rounded-lg sm:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative w-full h-60 sm:h-96 md:h-full min-h-[300px] sm:min-h-[400px] md:min-h-[600px] bg-gray-100">
              <Image
                src={product.imageUrl || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-4 sm:p-8 md:p-12">
              <div className="mb-4">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {product.name}
              </h1>
              <div className="mb-6 sm:mb-8">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Rp.{product.price.toLocaleString("id-ID")}
                </p>
                <p className="text-xs sm:text-sm text-gray-500">
                  Ditambahkan pada {product.createdAt.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                  Deskripsi Produk
                </h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 py-4 sm:py-6">
                <a
                  href={`https://wa.me/628980166239?text=Saya ingin menanyakan produk ini: ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-medium transition shadow-lg text-sm sm:text-base min-h-11"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.411-2.391-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-1.238.503-2.39 1.214-3.422 2.048-1.031.834-1.944 1.856-2.71 2.953C2.031 10.884 1.5 12.05 1.5 13.297c0 1.6.444 3.165 1.305 4.532l-1.39 5.055c-.135.494.155.963.632.963.06 0 .122-.006.183-.019l5.09-1.395c1.326.869 2.849 1.346 4.38 1.346 2.378 0 4.599-.936 6.271-2.637 1.672-1.701 2.637-3.922 2.637-6.271 0-1.547-.399-3.032-1.161-4.34-.761-1.308-1.844-2.442-3.141-3.22C14.686 6.931 13.412 6.5 12.051 6.5c-1.546 0-3.031.399-4.34 1.16z" />
                  </svg>
                  <span>Tanya Produk Ini</span>
                </a>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-200">
                <AdminEditButton productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

