import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Auth helper functions
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Contact submissions functions
export const submitContactForm = async (formData) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([
      {
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message,
        status: 'new',
      },
    ])
    .select();

  return { data, error };
};

export const getSubmissions = async () => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
};

export const getSubmissionById = async (id) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

export const updateSubmissionStatus = async (id, status) => {
  const updates = { status };
  if (status === 'read') {
    updates.read_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .update(updates)
    .eq('id', id)
    .select();

  return { data, error };
};

export const deleteSubmission = async (id) => {
  const { error } = await supabase
    .from('contact_submissions')
    .delete()
    .eq('id', id);

  return { error };
};
