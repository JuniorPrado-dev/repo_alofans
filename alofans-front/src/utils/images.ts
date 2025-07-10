import { BASE_URL } from "@/constants/urls";

export const getImage = (image_path: string) => {
  return `${BASE_URL}${image_path}`;
}