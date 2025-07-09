export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  tags: string[];
  images: string[];
  category: {
    name: string;
  };
  company: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
