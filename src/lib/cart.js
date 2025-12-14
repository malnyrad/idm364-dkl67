// import components
import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

// create user's cart
// resets upon refresh
function create_cart() {
    const { subscribe, update } = writable([]);
    return {
        subscribe,
        add(product, quantity) {
            update(items => {
                const existing = items.find((n) => n.id === product.id);

                if (existing) {
                    return items.map((n) =>
                    n.id === product.id
                    ? { ...n, count: n.count + quantity }
                    : n);
                }

                return [...items, { ...product, count: quantity }];
            });
        },

        remove(id) {
            update(items => items.filter((n) => n.id !== id));
        },

        clear() {
            update(() => []);
        }
  };
}

export const cart = create_cart();

// tracks the total price of all items in the cart
export const cartTotal = derived(cart, ($cart) =>
    $cart.reduce((sum, item) => sum + (item.price * item.count), 0)
);

// tracks the total number of items in the cart
export const cartCount = derived(cart, ($cart) =>
    $cart.reduce((sum, item) => sum + item.count, 0)
);