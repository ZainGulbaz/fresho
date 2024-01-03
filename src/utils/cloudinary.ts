import strings from "./strings";

export async function uploadImage(file: File): Promise<string> {
  try {
    auhtenticateImageType(file.name);
    const formData = new FormData();
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append("file", file);
    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, { method: "POST", body: formData }).then(res => res.json());
    return res.secure_url || "";

  }
  catch (err: any) {
    throw new Error(err);
  }
}

const auhtenticateImageType = (filename: string) => {
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  let isAllowed = false;
  for (const allowedType of allowedTypes) {
    if (filename.includes(allowedType) == true) {
      isAllowed = true;
    }
  }
  if (isAllowed == false) throw new Error(strings.image_type_not_allowed);
}