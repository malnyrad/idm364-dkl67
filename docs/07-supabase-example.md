# Setting up and using Supabase in a SvelteKit application

To use Supabase in a SvelteKit application, you'll first need to install the Supabase JavaScript client. You can do this using npm:

```bash
npm install @supabase/supabase-js
```

Next, you'll need to initialize Supabase. You can do this in a `+layout.svelte` file or in a dedicated `supabase.js` file. You'll need your Supabase URL and public anon key, which you can get from the Supabase dashboard.

```javascript
import { createClient } from '@supabase/supabase-js'

// ⚠️ Store these values in a .env file
// Set the values up in your hosting dashboard for production deployments
const supabaseUrl = 'your-supabase-url'
const supabaseAnonKey = 'your-supabase-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

You can now use the `supabase` client to interact with your Supabase database. For example, to fetch data from a table:

```javascript
const { data, error } = await supabase
  .from('my-table')
  .select('*')

if (error) console.error('Error: ', error)
else console.log('Data: ', data)
```

To insert data into a table:

```javascript
const { data, error } = await supabase
  .from('my-table')
  .insert([{ key: 'value' }])

if (error) console.error('Error: ', error)
else console.log('Data: ', data)
```

Remember to handle errors and secure your application appropriately when using Supabase in a SvelteKit application.
