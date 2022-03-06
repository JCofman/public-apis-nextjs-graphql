import captureWebsite from "capture-website";
import { data } from "./data";
import filenamifyUrl from "filenamify-url";

const options = {
  width: 1920,
  height: 1000,
};

const caputeScreenshots = async () => {
  for (const service of data.data.services) {
    try {
      await captureWebsite.file(
        service.link,
        `public/screenshots/${filenamifyUrl(service.link)}.png`,
        options
      );
    } catch (error) {
      console.log(error);
      console.log(service);
    }
  }
};

caputeScreenshots();
