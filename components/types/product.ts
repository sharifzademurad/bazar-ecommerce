// components/types/product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

// CartItem, Product + quantity
export interface CartItem extends Product {
  quantity: number;
}
