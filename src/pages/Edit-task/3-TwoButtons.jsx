import React from 'react';
import { useTranslation } from 'react-i18next';



const TwoButtons = ({user , stringId , DeleteBtn }) => {
  const {i18n } = useTranslation();


  return (
    <section className="buttons">
        <div>
          <button dir='auto' onClick={DeleteBtn} className="delete">
            {i18n.language === "en" && "Delete"}
            {i18n.language === "ar" && "حذف"}
          </button>
        </div>
  </section>
  );
}

export default TwoButtons;
