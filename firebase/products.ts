import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Product, ProductFormData } from "@/lib/types";

export async function getProducts(category?: string): Promise<Product[]> {
  let q = query(collection(db, "products"), orderBy("createdAt", "desc"));

  if (category) {
    q = query(
      collection(db, "products"),
      where("category", "==", category),
      orderBy("createdAt", "desc")
    );
  }

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate() || new Date(),
  })) as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
    createdAt: docSnap.data().createdAt?.toDate() || new Date(),
  } as Product;
}

export async function addProduct(data: ProductFormData): Promise<string> {
  const docRef = await addDoc(collection(db, "products"), {
    ...data,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateProduct(
  id: string,
  data: Partial<ProductFormData>
): Promise<void> {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, data);
}

export async function deleteProduct(id: string): Promise<void> {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
}

/**
 * Convert image file to base64 string
 * Note: Firestore has 1MB limit per document field, so use this for small images only (< 500KB)
 */
export function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      reject(new Error("File harus berupa gambar"));
      return;
    }

    // Validate file size (max 500KB for base64 to stay under Firestore 1MB limit)
    const maxSize = 500 * 1024; // 500KB
    if (file.size > maxSize) {
      reject(new Error("Ukuran gambar maksimal 500KB untuk upload langsung. Gunakan URL gambar untuk file yang lebih besar."));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = () => {
      reject(new Error("Gagal membaca file gambar"));
    };
    reader.readAsDataURL(file);
  });
}

