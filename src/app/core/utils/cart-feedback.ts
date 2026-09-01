import { signal } from '@angular/core';

const BUTTON_FEEDBACK_DURATION = 850;
const TOAST_VISIBLE_DURATION = 1700;
const TOAST_EXIT_DURATION = 180;

export class CartFeedback {
  readonly isAdded = signal(false);
  readonly toastMessage = signal<string | null>(null);
  readonly isToastLeaving = signal(false);

  private buttonTimer?: number;
  private toastTimer?: number;
  private toastRemovalTimer?: number;

  show(productName: string): void {
    window.clearTimeout(this.buttonTimer);
    window.clearTimeout(this.toastTimer);
    window.clearTimeout(this.toastRemovalTimer);

    this.isAdded.set(true);
    this.toastMessage.set(`${productName} added to cart`);
    this.isToastLeaving.set(false);

    this.buttonTimer = window.setTimeout(() => this.isAdded.set(false), BUTTON_FEEDBACK_DURATION);
    this.toastTimer = window.setTimeout(() => {
      this.isToastLeaving.set(true);
      this.toastRemovalTimer = window.setTimeout(() => {
        this.toastMessage.set(null);
        this.isToastLeaving.set(false);
      }, TOAST_EXIT_DURATION);
    }, TOAST_VISIBLE_DURATION);
  }
}
