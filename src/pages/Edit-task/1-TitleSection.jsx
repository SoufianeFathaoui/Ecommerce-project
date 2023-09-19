import React from 'react';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../fireBase/config";
import { useRef } from "react";


const TitleSection = ({user , stringId , EditTitle}) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const inputElement = useRef(null)

  
    if (value) {
      return (
        <section className="editTitle">
            <h1>
              <input
                style={{textDecoration:value.data().Completed ? "line-through 2.5px": null }}
                onChange={(eo) => {
                EditTitle(eo)
                }} 
                ref={inputElement} className="title-input" defaultValue={value.data().Title} type="text" 
              />
              <i onClick={() => {
                inputElement.current.focus()
              }} className="fa-regular fa-pen-to-square"></i>
            </h1>
        </section>
      );
    }
  
}

export default TitleSection;
