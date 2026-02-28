import { supabase } from './supabase';

/**
 * Uploads a file to Supabase Storage (bucket: ebookinterativo)
 * Returns the public URL of the uploaded file
 */
export async function uploadCoverToSupabase(file: File): Promise<string | null> {
    try {
        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `covers/ebook-cover-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

        const { data, error } = await supabase.storage
            .from('ebookinterativo')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false,
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return null;
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('ebookinterativo')
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    } catch (err) {
        console.error('Upload failed:', err);
        return null;
    }
}
