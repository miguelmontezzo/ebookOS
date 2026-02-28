import { supabase } from './supabase';

export async function uploadAvatarToSupabase(file: File): Promise<string | null> {
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `avatars/avatar-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { data, error } = await supabase.storage
      .from('ebookinterativo')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Avatar upload error:', error);
      return null;
    }

    const { data: publicData } = supabase.storage
      .from('ebookinterativo')
      .getPublicUrl(data.path);

    return publicData.publicUrl;
  } catch (error) {
    console.error('Avatar upload failed:', error);
    return null;
  }
}
