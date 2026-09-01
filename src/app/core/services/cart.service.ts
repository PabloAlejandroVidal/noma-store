import { Injectable, computed, effect, inject, signal } from '@angular/core';

import { CartLine, Product, StoredCartItem } from '../models/product';
import { CatalogService } from './catalog.service';

const CART_STORAGE_KEY = 'noma-cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly catalog = inject(CatalogService);
  private readonly storedItems = signal<StoredCartItem[]>(this.readStoredItems());

  readonly isOpen = signal(false);
  readonly items = computed<CartLine[]>(() => this.storedItems().map(({ productId, quantity }) => {
    const product = this.catalog.getById(productId);
    return product ? { product, quantity } : undefined;
  }).filter((item): item is CartLine => item !== undefined));
  readonly itemCount = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly subtotal = computed(() => this.items().reduce((total, item) => total + this.lineTotal(item), 0));

  lineTotal(line: CartLine): number { return line.product.price * line.quantity; }

  constructor() { effect(() => this.persist(this.storedItems())); }

  add(product: Product, quantity = 1): void {
    this.storedItems.update((items) => {
      const existing = items.find((item) => item.productId === product.id);
      return existing ? items.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { productId: product.id, quantity }];
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) return this.remove(productId);
    this.storedItems.update((items) => items.map((item) => item.productId === productId ? { ...item, quantity } : item));
  }

  remove(productId: string): void { this.storedItems.update((items) => items.filter((item) => item.productId !== productId)); }
  open(): void { this.isOpen.set(true); }
  close(): void { this.isOpen.set(false); }

  private readStoredItems(): StoredCartItem[] {
    if (typeof localStorage === 'undefined') return [];
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((value) => this.isStoredCartItem(value)) : [];
    } catch { return []; }
  }

  private persist(items: StoredCartItem[]): void {
    if (typeof localStorage !== 'undefined') localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  private isStoredCartItem(value: unknown): value is StoredCartItem {
    if (typeof value !== 'object' || value === null) return false;
    const item = value as Record<string, unknown>;
    return typeof item['productId'] === 'string' && typeof item['quantity'] === 'number' && item['quantity'] > 0;
  }
}
