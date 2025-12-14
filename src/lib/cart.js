import { writable } from 'svelte/store';

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