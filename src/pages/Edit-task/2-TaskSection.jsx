import React from 'react';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../fireBase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { useState } from "react";
import { arrayUnion , updateDoc } from "firebase/firestore";
import { useTranslation } from 'react-i18next';



const TaskSection = ({user , stringId , ChackeBoxCompleted , trashIcon}) => {
  const [value, loading] = useDocument(doc(db, user.uid, stringId));
  const [showAddMore, setshowAddMore] = useState(false);
  const [AddtoArray, setAddtoArray] = useState(null);
  const {i18n } = useTranslation();

  if (loading) {
    return(
      <div className="loading">
        <ReactLoading type={"spin"} color={"teal"} height={40} width={40} />
      </div>
    )
  }
  if (value) {
                    
    return (
      <section className="sub-task">
          <div className="parent-time">
              <p dir='auto'> 
                {i18n.language === "en" && "Created at"}
                {i18n.language === "ar" && "أنشئت حوالى"}
                <Moment className='time' fromNow date={value.data().Id} /></p>
              <div>
                <input onChange={async(eo) => {
                  ChackeBoxCompleted(eo)
                }} 
                checked={value.data().Completed} id="chackbox" type="checkbox" />
                <label htmlFor="chackbox">
                {i18n.language ==="en" && "Completed"}
                {i18n.language ==="ar" && "مكتمل"}
                </label>
              </div>
          </div>
  
          <ul>
            {value.data().Details.filter( (item) =>item ).map((detail) => {
              return(
                
            <div key={detail}>
              <li className="sub-task" >
                <p>{detail}</p>
              <i className="fa-solid fa-trash" onClick={async(eo) => {
                trashIcon(detail)
              }}></i>
            </li>
            </div>
              )
            })}
            
          </ul>

          {showAddMore && (
            <div className='parent-of-add-cancel-btns'>
              <input type="text" value={AddtoArray}
              onChange={(eo) => {
                setAddtoArray(eo.target.value)
              }}/>
              <button className='Add'
              onClick={async(eo) => {
                eo.preventDefault()
                await updateDoc(doc(db, user.uid, stringId), {
                  Details: arrayUnion(AddtoArray),
                });
                setAddtoArray("")
              }}>
                {i18n.language === "en" && "Add"}
                {i18n.language === "ar" && "أضف"}
              </button>
              <button  className='Cancel' 
              onClick={ async(eo) => {
                eo.preventDefault()
                setshowAddMore(false)
              }}>
                {i18n.language === "en" && "Cancel"}
                {i18n.language === "ar" && "إلغاء"}
              </button>
            </div>
          )}

          <section className='buttons Add-more'>
          <div>
            <button dir='auto' className="Add-more"
            onClick={() => {
              setshowAddMore(true)
            }}>
              {i18n.language === "en" && "Add more"}
              {i18n.language === "ar" && "أضف المزيد"}
            </button>
          </div>

          </section>

      </section>
    );
  }
}

export default TaskSection;
