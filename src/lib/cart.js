import { writable } from 'svelte/store';

function create_cart() {
    const { subscribe, update } = writable([]);
    return {
        subscribe,
        increment: () => update((n) => n + 1),
        decrement: () => update((n) => Math.max(0, n - 1)),
        add(product) {
            update(items => {
                const existing = items.find((n) => n.id === product.id);

                if (existing) {
                    return items.map((n) =>
                    n.id === product.id
                    ? { ...n, count: n.count + 1 }
                    : n);
                }

                return [...items, { ...product, count: 1 }];
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