import { createClient } from '@supabase/supabase-js'
import * as process from 'node:process';

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabaseClient = createClient(supabaseUrl, supabaseKey)