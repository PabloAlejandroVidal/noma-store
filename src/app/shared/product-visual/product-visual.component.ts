import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

import { ProductImage } from '../../core/models/product';

@Component({
  selector: 'app-product-visual',
  imports: [NgOptimizedImage],
  template: `
    <figure class="product-visual">
      <img [ngSrc]="image().src" [alt]="image().alt" fill sizes="(max-width: 720px) 100vw, 42vw" />
    </figure>
  `,
  styleUrl: './product-visual.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVisualComponent {
  readonly image = input.required<ProductImage>();
}
