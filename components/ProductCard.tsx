import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-orange-300 transition-all duration-300 active:scale-95 sm:active:scale-100"
    >
      <div className="relative w-full aspect-square sm:h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.imageUrl || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
          <span className="px-2 sm:px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-orange-600 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-5">
        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition">
          {product.name}
        </h3>
        <p className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
          Rp.{product.price.toLocaleString("id-ID")}
        </p>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>
    </Link>
  );
}

