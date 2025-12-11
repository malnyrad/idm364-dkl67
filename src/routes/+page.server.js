import { supabase } from '$lib/supabase'

export async function load() {
    const { data, error } = await supabase
    .from('dkl67_idm364')
    .select('*')
    .order("id", { ascending: true });

    if (error) console.error('Error: ', error)
    else console.log('Products: ', data)

    return {
        products: data
    }
}