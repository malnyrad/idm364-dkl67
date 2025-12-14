import { writable } from 'svelte/store';

const quantities = new Map();

export function get_quantity_store(key) {
	if (!quantities.has(key)) {
		quantities.set(key, writable(1));
	}

  	return quantities.get(key);
}

export function reset_quantity(key) {
	quantities.get(key)?.set(1);
}