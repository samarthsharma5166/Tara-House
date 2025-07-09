export interface Category{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface categroyInitialState{
    Category: Category[],
    loading: boolean
}

export interface categoryformType {
  name: string;
}

export interface Company{
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface companyInitialState{
    Company: Company[],
    loading: boolean
}

export interface companyformType {
  name: string;
}


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  tags: string[];
  images: string[];
  categoryId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface productInitialState{
    Product: Product[],
    loading: boolean,
    count:0
}


export interface productformType {
  name: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  tags: string[];
  categoryId: number;
  companyId: number;
  images: File[];
}