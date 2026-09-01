import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [CurrencyPipe],
  templateUrl: './cart-drawer.component.html',
  styleUrl: './cart-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'cart.close()' },
})
export class CartDrawerComponent {
  protected readonly cart = inject(CartService);
}
