"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductFormData } from "@/lib/types";
import { convertImageToBase64, updateProduct } from "@/firebase/products";

interface EditProductFormProps {
  product: Product;
  productId: string;
}

export default function EditProductForm({
  product,
  productId,
}: EditProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductFormData>({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    imageUrl: product.imageUrl,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageInputType, setImageInputType] = useState<"url" | "file">(
    product.imageUrl.startsWith("data:") ? "file" : "url"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(product.imageUrl);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, imageUrl: url }));
    if (url) {
      setPreviewUrl(url);
    }
  };

  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      let imageUrl = formData.imageUrl;

      // If file is selected, convert to base64
      if (imageFile && imageInputType === "file") {
        try {
          imageUrl = await convertImageToBase64(imageFile);
        } catch (error: any) {
          alert(error.message || "Gagal memproses gambar");
          setIsUploading(false);
          return;
        }
      }

      // Validate image URL
      if (!imageUrl || imageUrl.trim() === "") {
        alert("Gambar produk wajib diisi");
        setIsUploading(false);
        return;
      }

      // Validate URL format if using URL input
      if (imageInputType === "url" && imageUrl && !imageUrl.startsWith("http") && !imageUrl.startsWith("data:")) {
        alert("URL gambar tidak valid. Pastikan URL dimulai dengan http:// atau https://");
        setIsUploading(false);
        return;
      }

      await updateProduct(productId, {
        ...formData,
        imageUrl,
      });

      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Error updating product:", error);
      const errorMessage = error.message || "Gagal mengupdate produk. Silakan coba lagi.";
      alert(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
          min="0"
          step="0.01"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Gambar Produk
        </label>
        
        {/* Input Type Toggle */}
        <div className="mb-4 flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="imageInputType"
              value="url"
              checked={imageInputType === "url"}
              onChange={() => {
                setImageInputType("url");
                setImageFile(null);
              }}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">URL Gambar</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="imageInputType"
              value="file"
              checked={imageInputType === "file"}
              onChange={() => {
                setImageInputType("file");
                setFormData((prev) => ({ ...prev, imageUrl: "" }));
              }}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Upload File (max 500KB)</span>
          </label>
        </div>

        {/* URL Input */}
        {imageInputType === "url" && (
          <div>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Masukkan URL gambar dari internet (contoh: Imgur, Unsplash, dll)
            </p>
          </div>
        )}

        {/* File Input */}
        {imageInputType === "file" && (
          <div>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload gambar dari komputer (maksimal 500KB untuk kualitas terbaik)
            </p>
          </div>
        )}

        {/* Preview */}
        {previewUrl && (
          <div className="mt-4 relative w-full h-64 rounded-md overflow-hidden border border-gray-200">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={() => {
                setPreviewUrl(null);
                alert("Gagal memuat gambar. Pastikan URL valid atau pilih file lain.");
              }}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? "Uploading..." : "Update Product"}
      </button>
    </form>
  );
}

