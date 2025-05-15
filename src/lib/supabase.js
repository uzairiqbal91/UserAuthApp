import 'react-native-url-polyfill/auto';
import {createClient} from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (!globalThis.fetch) {
  require('whatwg-fetch');
}

const supabaseUrl = "https://yigmuwcmrkbeiodotaio.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZ211d2NtcmtiZWlvZG90YWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjQ5MTksImV4cCI6MjA2MjkwMDkxOX0.5M3XfovOEP2skSy8i7LYDk-kdA6CS97ba5lCAU3X7t4";

console.log(
  'Supabase URL:',
  supabaseUrl,
); // ✅ check if it's triggered
console.log(
  'Supabase Key:',
  supabaseKey,
); // ✅ check if it's triggered


export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
