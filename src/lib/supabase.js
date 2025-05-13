import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (!globalThis.fetch) {
  require('whatwg-fetch');
}

const supabaseUrl = 'https://oooahvuwximdvssmpxbd.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vb2FodnV3eGltZHZzc21weGJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNTAxMzMsImV4cCI6MjA2MjcyNjEzM30._Oigq1tSU6nyBQ_mIheNzad_H3gE36eIOBYopegDhoc';
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
