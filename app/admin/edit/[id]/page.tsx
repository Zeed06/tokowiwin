import { notFound } from "next/navigation";
import { getProduct } from "@/firebase/products";
import EditPageWrapper from "./EditPageWrapper";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <EditPageWrapper product={product} productId={id} />;
}

