import { writable } from 'svelte/store';
    
function create_count() {
    const { subscribe, update } = writable(0);
    
    return {
        subscribe,
        increment: () => update((n) => n + 1),
        decrement: () => update((n) => Math.max(0, n - 1)),
    };
}

export const count = create_count();