// import components
import { supabase } from '$lib/supabase';

// declare functions
export async function load({ params }) {
    const slug = params.slug;

    // fetch single item data
	const { data, error } = await supabase
    .from('dkl67_idm364')
    .select('*')
    .eq('slug', slug) // find the row that matches the current slug
    .limit(1) // only allowed to return one row
    .single()

	console.log('DB result: ', data);

	if (error) console.error('Error: ', error);

	return {
        product: data
    };
}