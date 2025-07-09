
import {v2 as cloudinary} from 'cloudinary'


export async function handleUpload(file: string ) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "product",
  });
  return res;
}
