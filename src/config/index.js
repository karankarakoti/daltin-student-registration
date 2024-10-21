const config = {
  defaultPath: "/",
  fontFamily: `"Libre Baskerville", sans-serif`,
  i18n: "en",  
  container: true,
  mode: "light",
  presetColor: "default",
  themeDirection: "ltr"
};

export default config;
export const drawerWidth = 260;

const host = window.location.hostname;
let apiURL = host === "localhost" ? process.env.REACT_APP_API_DEV_URL : process.env.REACT_APP_API_PROD_URL;

export const apiConfig = {  
  "BASE_URL": apiURL, 
  "API_URL": apiURL+"/api/v1",   
  "MEDIA_URL": apiURL+"/media",
}