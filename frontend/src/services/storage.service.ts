// Storage Service for Artify Cloud
// Uploads files to Azure Blob Storage via the /api/upload API route

class StorageService {
  async uploadFile(file: File, path: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        let errorMsg = "Failed to upload file to Azure Blob Storage";
        try {
          const errorData = JSON.parse(text);
          errorMsg = errorData.error || errorMsg;
        } catch (e) {
          errorMsg = `Server error ${response.status}: ${text.substring(0, 100)}`;
        }
        throw new Error(errorMsg);
      }

      const text = await response.text();
      const data = JSON.parse(text);
      return (data as Record<string, string>).url;
    } catch (error) {
      console.error("[StorageService] Upload failed:", error);
      throw error;
    }
  }

  async deleteFile(url: string): Promise<boolean> {
    // Implement delete functionality if needed via another API route
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  }
}

export const storage = new StorageService();
