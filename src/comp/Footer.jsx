import React from "react";
import './Footer.css';
import { useTranslation } from 'react-i18next';


const Footer = () => {
  const { i18n } = useTranslation();

  return (
<div className="myfooter">
      <footer className="ali   ">
        {i18n.language === "en" && "Designed and developed by SOUFIANE FATHOAUI ♣"}
        {i18n.language === "ar" && "تم التصميم و البرمجة بواسطة سفيان فتحاوي ♣"}
        <span>🧡</span>
      </footer>
</div>
  );
};

export default Footer;
