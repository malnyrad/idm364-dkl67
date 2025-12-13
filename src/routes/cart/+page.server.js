import { supabase } from '$lib/supabase'

export async function load() {
    // fetch data
    const { data, errorData } = await supabase
    .from('dkl67_idm364')
    .select('*')
    .order("id", { ascending: true }); // display items in id order since they won't otherwise

    if (errorData) console.error('Error: ', errorData)

    // fetch total item count
    const { count, errorCount } = await supabase
    .from('dkl67_idm364')
    .select('*', { count: 'exact', head: true });

    if (errorCount) console.error('Error fetching count:', errorCount)
    else console.log('Total row count: ', count)

    return {
        products: data,
        items: count
    }
}

