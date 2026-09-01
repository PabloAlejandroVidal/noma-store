export type ProductImageRole = 'primary' | 'gallery' | 'detail' | 'lifestyle';

export interface ProductImage {
  src: string;
  alt: string;
  role: ProductImageRole;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  family: 'seating' | 'tables' | 'lighting_objects';
  category: string;
  collection: 'quiet-forms';
  price: number;
  currency: 'USD';
  shortDescription: string;
  description: string;
  materials: string[];
  colorway?: string;
  images: ProductImage[];
}

export interface StoredCartItem {
  productId: string;
  quantity: number;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export function getPrimaryImage(product: Product): ProductImage {
  const primary = product.images.find((image) => image.role === 'primary');
  if (!primary) throw new Error(`Product ${product.id} requires a primary image.`);
  return primary;
}
