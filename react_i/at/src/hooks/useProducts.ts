import { useMutation, useQuery } from "@tanstack/react-query";

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((res: { products: Product[] }) => res.products)
        .catch((e) => {
          console.error("Error fetching products:", e);
          throw new Error("Falha ao buscar produtos");
        }),
  });

export const useProduct = (
  id: string,
  { enabled }: { enabled?: boolean } = {},
) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          if (!res.ok && res.status === 404) {
            throw new Error("Produto não encontrado");
          }
          return res.json() as Promise<Product>;
        })
        .catch((e) => {
          console.error(`Error fetching product with id ${id}:`, e);
          throw new Error("Falha ao buscar produto");
        }),
    enabled,
  });

type CreateProductData = {
  title: string;
  price: number;
  description: string;
  category: string;
};

export const useCreateProduct = () =>
  useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      return response.json() as Promise<Product>;
    },
  });

export const useUpdateProduct = (id: string) =>
  useMutation({
    mutationFn: async (data: CreateProductData) => {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      return response.json() as Promise<Product>;
    },
  });

export const useDeleteProduct = () =>
  useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      return response.json();
    },
  });
