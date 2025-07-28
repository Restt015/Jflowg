const STORAGE_KEY = "cart";

export function getCart() {
  const stored = sessionStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addToCart(item) {
  const cart = getCart();
  const index = cart.findIndex(p => p.id === item.id && p.size === item.size);

  if (index !== -1) {
    cart[index].quantity += item.quantity || 1;
  } else {
    cart.push({ ...item, quantity: item.quantity || 1 });
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function removeFromCart(id) {
  const updated = getCart().filter(item => item.id !== id);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function increaseQuantity(id) {
  const updated = getCart().map(item =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function decreaseQuantity(id) {
  const updated = getCart()
    .map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter(item => item.quantity > 0);
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function clearCart() {
  sessionStorage.removeItem(STORAGE_KEY);
}
