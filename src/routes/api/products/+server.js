import { supabase } from '$lib/supabase';
import { json } from '@sveltejs/kit';

export async function GET() {
	const { data: products, error } = await supabase
		.from('dkl67_idm364')
		.select('*');

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json(products);
}