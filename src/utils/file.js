import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_FOLDER = "mernStack";
const uploadFile = async (files) => {
  const uploadResult = [];
  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: CLOUDINARY_FOLDER,
          },
          (error, data) => {
            if (error) return reject(error);
            resolve(data);
          }
        )
        .end(file.buffer);
    });
    uploadResult.push(result);
  }
  return uploadResult;
};

export default uploadFile;
