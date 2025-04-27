export type Product = {
  id: string;
  name: string;
  slug: string;
  series: string | null;
  description: string | null;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Products = Product[];
