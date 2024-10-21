import { apiConfig } from "config";

export const scrollToTop = (window) =>{
  window.scrollTo({top: 0, left: 0, behavior: "smooth" })
}  

export const generatePublicURL = (file) => {
  return `${apiConfig.MEDIA_URL}/${file}`;
}