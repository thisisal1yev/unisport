import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

/**
 * Upload nizom (regulation document) to Supabase Storage
 * @param file - The file to upload (PDF, DOC, DOCX)
 * @param musobaqaId - Competition ID to organize files
 * @returns Public URL of uploaded file or error message
 */
export async function uploadNizom(
  file: File,
  musobaqaId?: number,
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  
  // Validate file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  
  if (!allowedTypes.includes(file.type)) {
    return { error: "Faqat PDF, DOC yoki DOCX formatlari ruxsat etiladi" };
  }
  
  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return { error: "Fayl hajmi 10MB dan oshmasligi kerak" };
  }
  
  try {
    // Create unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const fileExt = file.name.split(".").pop();
    const fileName = `nizom_${musobaqaId || "temp"}_${timestamp}_${randomStr}.${fileExt}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("nizomlar")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });
    
    if (error) {
      return { error: `Yuklash xatosi: ${error.message}` };
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from("nizomlar")
      .getPublicUrl(fileName);
    
    return { url: urlData.publicUrl };
  } catch (err) {
    return { error: `Noma'lum xatolik: ${err instanceof Error ? err.message : String(err)}` };
  }
}

/**
 * Delete nizom file from Supabase Storage
 * @param fileName - Name of the file to delete (extracted from URL or stored path)
 */
export async function deleteNizom(fileName: string): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient();
  
  try {
    // Extract just the filename from full path if needed
    const cleanFileName = fileName.includes("/") 
      ? fileName.split("/").pop()! 
      : fileName;
    
    const { error } = await supabase.storage
      .from("nizomlar")
      .remove([cleanFileName]);
    
    if (error) {
      return { success: false, error: `O'chirish xatosi: ${error.message}` };
    }
    
    return { success: true };
  } catch (err) {
    return { 
      success: false, 
      error: `Noma'lum xatolik: ${err instanceof Error ? err.message : String(err)}` 
    };
  }
}
