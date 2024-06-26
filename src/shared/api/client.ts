import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@shared/config'
import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

export const client = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)
