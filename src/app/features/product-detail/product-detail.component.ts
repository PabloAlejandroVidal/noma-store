import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

import { CatalogService } from '../../core/services/catalog.service';
import { CartService } from '../../core/services/cart.service';
import { ProductVisualComponent } from '../../shared/product-visual/product-visual.component';
import { ProductImage, getPrimaryImage } from '../../core/models/product';
import { CartFeedback } from '../../core/utils/cart-feedback';

@Component({
  imports: [CurrencyPipe, ProductVisualComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'close()' },
})
export class ProductDetailComponent {
  private readonly visualAnimationDuration = 320;
  private readonly productAnimationDuration = 420;
  private readonly viewerCloseDuration = 190;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly catalog = inject(CatalogService);
  protected readonly cart = inject(CartService);
  private readonly slug = toSignal(this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')), { initialValue: '' });
  protected readonly product = computed(() => this.catalog.getBySlug(this.slug()));
  protected readonly images = computed(() => this.product()?.images ?? []);
  protected readonly quantity = signal(1);
  protected readonly feedback = new CartFeedback();
  protected readonly imageIndex = signal(0);
  protected readonly activeImage = computed(() => {
    const product = this.product();
    return product ? this.images()[this.imageIndex()] ?? getPrimaryImage(product) : undefined;
  });
  protected readonly previousImage = signal<ProductImage | undefined>(undefined);
  protected readonly isVisualTransitioning = signal(false);
  protected readonly productMotion = signal<'next' | 'previous' | undefined>(undefined);
  protected readonly isClosing = signal(false);
  protected readonly productPosition = computed(() => {
    const product = this.product();
    return product ? this.catalog.products.findIndex((candidate) => candidate.id === product.id) : -1;
  });
  protected readonly previousProduct = computed(() => {
    const position = this.productPosition();
    return position < 0 ? undefined : this.catalog.products[(position - 1 + this.catalog.products.length) % this.catalog.products.length];
  });
  protected readonly nextProduct = computed(() => {
    const position = this.productPosition();
    return position < 0 ? undefined : this.catalog.products[(position + 1) % this.catalog.products.length];
  });
  private readonly resetProductImage = effect(() => {
    this.slug();
    this.imageIndex.set(0);
    this.previousImage.set(undefined);
    this.isVisualTransitioning.set(false);
  });

  protected updateQuantity(delta: number): void { this.quantity.update((quantity) => Math.max(1, quantity + delta)); }
  protected selectImage(index: number): void {
    const image = this.images()[index];
    const activeImage = this.activeImage();
    if (!image || image.src === activeImage?.src || this.isVisualTransitioning()) return;
    this.previousImage.set(activeImage);
    this.imageIndex.set(index);
    this.isVisualTransitioning.set(true);
    window.setTimeout(() => {
      this.previousImage.set(undefined);
      this.isVisualTransitioning.set(false);
    }, this.visualAnimationDuration);
  }

  protected navigateProduct(direction: 'next' | 'previous'): void {
    const target = direction === 'next' ? this.nextProduct() : this.previousProduct();
    if (!target) return;
    this.productMotion.set(direction);
    this.imageIndex.set(0);
    this.router.navigate(['/product', target.slug]);
    window.setTimeout(() => this.productMotion.set(undefined), this.productAnimationDuration);
  }

  protected close(): void {
    if (this.isClosing()) return;
    this.isClosing.set(true);
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduceMotion) {
      this.router.navigate(['/collection'], { state: { productSlug: this.product()?.slug } });
      return;
    }
    window.setTimeout(() => this.router.navigate(['/collection'], { state: { productSlug: this.product()?.slug } }), this.viewerCloseDuration);
  }

  protected addToCart(): void {
    const product = this.product();
    if (!product) return;
    this.cart.add(product, this.quantity());
    this.feedback.show(product.name);
  }
}
