// import components
import { supabase } from '$lib/supabase';

// declare functions
export async function load() {
    // fetch data
    const { data, error_data } = await supabase
    .from('dkl67_idm364')
    .select('*')
    .order("id", { ascending: true }); // display items in id order since they won't otherwise

    if (error_data) console.error('Error: ', error_data);

    // fetch total item count
    const { count, error_count } = await supabase
    .from('dkl67_idm364')
    .select('*', { count: 'exact', head: true });

    if (error_count) console.error('Error: ', error_count);
    else console.log('Count: ', count);

    return {
        products: data,
        items: count
    }
}