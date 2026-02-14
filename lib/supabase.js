import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fotvpqvdkwotttztdusc.supabase.co'
const supabaseAnonKey = 'sb_publishable_mLnnAkM9iCgOTkbu2ftvkA_Nw3OmvTd'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)