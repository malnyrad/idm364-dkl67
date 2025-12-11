import { supabase } from '$lib/supabase'

export async function load({ params }) {
    const slug = params.slug;

	const { data, error } = await supabase
    .from('dkl67_idm364')
    .select('*')
    .eq('slug', slug) // find the row that matches the current slug
    .limit(1) // only allowed to return one row
    .single()

	//console.log('DB result:', data);

	if (error) console.error(error);

	return { product: data };
}