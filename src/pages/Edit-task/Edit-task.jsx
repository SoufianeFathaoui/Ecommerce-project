import React from "react";
import "./Edit-task.css";
import { Helmet } from "react-helmet-async";
import Footer from "../../comp/Footer";
import Header from "../../comp/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../fireBase/config";
import TitleSection from "../Edit-task/1-TitleSection";
import TaskSection from "../Edit-task/2-TaskSection";
import TwoButtons from "../Edit-task/3-TwoButtons";
import { Navigate, useParams } from 'react-router-dom';
import { doc , updateDoc , arrayRemove , deleteDoc } from "firebase/firestore";
import { db } from "../../fireBase/config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const EditTask = () => {
  const [user , loading , error] = useAuthState(auth);
  const [showdata, setshowdata] = useState(false);
  const navigate = useNavigate();
  let { stringId } = useParams();

  //* Function for Edit Title , The function is used in the Title Section // 
  const EditTitle = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      Title:eo.target.value
    });    
  }
  //* Function for chacke box (Completed) , The function is used Called in the Task Section
  const ChackeBoxCompleted = async(eo) => {
    eo.preventDefault()
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId ), {
        Completed:true,
      });
    }else{
      await updateDoc(doc(db, user.uid, stringId), {
        Completed:false,
      });
    }
  }
  //* Function for delete one task
  const trashIcon = async(detail) => {
    await updateDoc(doc(db, user.uid, stringId), {
      Details: arrayRemove(detail),
    });
  }
  //* This functions for the buttons Add more & Delete , This functions is called in the Two button section
  const AddMoreBtn = (eo) => {
    eo.preventDefault()
  }
  const DeleteBtn = async(eo) => {
    setshowdata(true)
    await deleteDoc(doc(db, user.uid, stringId));
    navigate('/' , {replace:true})
  }

  if (loading) {
    return(
      <div>
      <Header />
      <main>
        <h1>Initialising User...</h1>
      </main>
      <Footer />
    </div>
    )
  }
  if (error) {
    return(
      <div>
      <Header />
      <main>
        <h1>Somthing wrong</h1>
      </main>
      <Footer />
    </div>
    )
  }
  if (user) {
      return (
        <div>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          <Header />
          {showdata ?
          (<main>loading</main>)  : (<div className="parent-main">
           {/* For  title section */}
          <TitleSection user={user} stringId={stringId} EditTitle = {EditTitle} />
             {/* Sub task section */}
          <TaskSection user={user} stringId={stringId} ChackeBoxCompleted = {ChackeBoxCompleted} trashIcon = {trashIcon} />
           {/* Add more && Delete buttons */}
          <TwoButtons user={user} stringId={stringId} DeleteBtn={DeleteBtn} />
        </div>)
          }
          <Footer />
        </div>
      );
    }
  
};

export default EditTask;
