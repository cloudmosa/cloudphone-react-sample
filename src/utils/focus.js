export const FOCUSABLE_CSS_SELECTOR = `a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), *[tabindex], *[contenteditable]`;

export function findFirstFocusable(container) {
  return container.querySelector(FOCUSABLE_CSS_SELECTOR);
}

export const autoFocusFirstFocusable = (element) => {
  if (element) {
    findFirstFocusable(element)?.focus();
  }
}

export const autoFocus = (element) => element?.focus();
