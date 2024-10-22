import { apiConfig } from "config";

export const scrollToTop = (window) =>{
  window.scrollTo({top: 0, left: 0, behavior: "smooth" })
}  

export const generatePublicURL = (file) => {
  return `${apiConfig.MEDIA_URL}/${file}`;
}

export const formatName = (title, firstName, middleName, lastName) => {
  return `${title} ${firstName} ${middleName ? middleName : ""} ${lastName}`;
}