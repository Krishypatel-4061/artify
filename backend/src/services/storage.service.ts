// Storage Service for Artify Cloud

class StorageService {
  async uploadFile(file: File, path: string): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file to Azure Blob Storage");
    }

    const data = await response.json();
    return data.url;
  }

  async deleteFile(url: string): Promise<boolean> {
    // Implement delete functionality if needed via another API route
    return new Promise((resolve) => setTimeout(() => resolve(true), 500));
  }
}

export const storage = new StorageService();
