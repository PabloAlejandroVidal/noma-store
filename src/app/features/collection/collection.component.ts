import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CatalogService } from '../../core/services/catalog.service';
import { CartService } from '../../core/services/cart.service';
import { CartFeedback } from '../../core/utils/cart-feedback';
import { getPrimaryImage } from '../../core/models/product';
import { ProductVisualComponent } from '../../shared/product-visual/product-visual.component';

@Component({
  imports: [RouterLink, ProductVisualComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionComponent {
  private readonly animationDuration = 480;
  private readonly catalog = inject(CatalogService);
  private readonly location = inject(Location);
  protected readonly cart = inject(CartService);
  protected readonly products = this.catalog.products;
  protected readonly index = signal(this.initialIndex());
  protected readonly outgoingIndex = signal<number | undefined>(undefined);
  protected readonly motion = signal<'next' | 'previous' | 'fade' | undefined>(undefined);
  protected readonly feedback = new CartFeedback();
  protected readonly current = computed(() => this.products[this.index()]);
  protected readonly currentImage = computed(() => getPrimaryImage(this.current()));
  protected readonly outgoing = computed(() => {
    const index = this.outgoingIndex();
    return index === undefined ? undefined : this.products[index];
  });
  protected readonly previous = computed(() => this.products[(this.index() - 1 + this.products.length) % this.products.length]);
  protected readonly next = computed(() => this.products[(this.index() + 1) % this.products.length]);
  protected readonly previousImage = computed(() => getPrimaryImage(this.previous()));
  protected readonly nextImage = computed(() => getPrimaryImage(this.next()));
  protected readonly outgoingImage = computed(() => {
    const product = this.outgoing();
    return product ? getPrimaryImage(product) : undefined;
  });

  protected move(delta: number): void {
    const target = (this.index() + delta + this.products.length) % this.products.length;
    this.transitionTo(target, delta > 0 ? 'next' : 'previous');
  }

  protected select(index: number): void {
    if (index === this.index()) return;
    const nextIndex = (this.index() + 1) % this.products.length;
    const previousIndex = (this.index() - 1 + this.products.length) % this.products.length;
    const motion = index === nextIndex ? 'next' : index === previousIndex ? 'previous' : 'fade';
    this.transitionTo(index, motion);
  }

  protected addCurrent(): void {
    this.cart.add(this.current());
    this.feedback.show(this.current().name);
  }

  private initialIndex(): number {
    const state = this.location.getState();
    if (typeof state !== 'object' || state === null || !('productSlug' in state) || typeof state.productSlug !== 'string') return 0;
    const index = this.products.findIndex((product) => product.slug === state.productSlug);
    return index >= 0 ? index : 0;
  }

  private transitionTo(target: number, motion: 'next' | 'previous' | 'fade'): void {
    if (this.motion()) return;
    this.outgoingIndex.set(this.index());
    this.index.set(target);
    this.motion.set(motion);
    window.setTimeout(() => {
      this.outgoingIndex.set(undefined);
      this.motion.set(undefined);
    }, this.animationDuration);
  }
}
