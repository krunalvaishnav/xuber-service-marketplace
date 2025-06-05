import React, { useState, useEffect } from "react";
import axios from "axios";

const FaviconUpdater = () => {
  const [favicon, setFavicon] = useState("");
  const [title, setTitle] = useState("");

  const updateFavicon = (iconURL) => {
    if (!iconURL) return;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = iconURL;
  };

  const getSettingData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/setting`
      );

      if (response.status === 200) {
        const settingsArray = response.data.siteSettings;

        const settingsMap = Object.fromEntries(
          settingsArray.map((setting) => [setting.key, setting.value])
        );

        if (settingsMap.site_icon) {
          const faviconURL = `${process.env.REACT_APP_IMAGE_URL}/${settingsMap.site_icon}`;
          setFavicon(faviconURL);
        }
        if (settingsMap.site_title) {
          setTitle(settingsMap.site_title);
        }
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    getSettingData();
  }, []);

  useEffect(() => {
    updateFavicon(favicon);
  }, [favicon]);

  useEffect(() => {
    if (title) {
      document.title = title; 
    }
  }, [title]);
  
  return null;
};

export default FaviconUpdater;
