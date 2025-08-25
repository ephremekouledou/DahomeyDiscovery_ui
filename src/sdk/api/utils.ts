import { FileAPI } from "./file";

// Helper to upload image if it's a File
export const UploadImage = async (image: any, folder: string, name: string) => {
  if (image instanceof File) {
    return await FileAPI.Upload(image, folder, name);
  }
  return image === null ? "" : image;
};
