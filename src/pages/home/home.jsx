import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../fireBase/config";
import { useState } from "react";
import Modal from "../../shared/Modal";
import "../../index.css";
import "./Home.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../fireBase/config";
import ReactLoading from "react-loading";
import AllTassks from "../../pages/home/AllTassks";
import i18n from "../../i18n";
import { useTranslation } from 'react-i18next';


const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [showModal, setshowModal] = useState(false);
  const [Details, setDetails] = useState([null]);
  const [SubTask, setSubTask] = useState([null]);
  const [Title, setTitle] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [showMsg_Task, setshowMsg_Task] = useState(false);
  const { t, i18n } = useTranslation();


  // <<<<<<< functions of modal >>>>>>>>>>>
  const submitBtn = async (eo) => {
    eo.preventDefault();
    console.log("wait");
    setLoading(true);
    const Id = new Date().getTime();
    const Completed = false;
    await setDoc(doc(db, user.uid, `${Id}`), {
      Title: Title,
      Details: Details,
      Id: Id,
      Completed: Completed,
    });
    console.log("Doneeeee");
    setLoading(false);
    setDetails([null]);
    setTitle("");
    setshowModal(false);
    setshowMsg_Task(true);
    setTimeout(() => {
      setshowMsg_Task(false);
    }, 4000);
  };
  const changeInput_title = (eo) => {
    setTitle(eo.target.value);
  };
  const changeInput_details = (eo) => {
    setSubTask(eo.target.value);
  };
  const modal = () => {
    setshowModal(true);
  };
  const closeIcon = () => {
    setshowModal(false);
  };
  const addBtn = (eo) => {
    eo.preventDefault();
    if (!Details.includes(SubTask)) {
      Details.push(SubTask);
    }
    setSubTask("");
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <h1>Initialising User...</h1>
        </main>
        <Footer />
      </div>
    );
  }
  if (!user) {
    return (
      <div>
        <Header />
        <main>
          <h1>Please signIn to continue 🤚</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          {user && (
            <div>
              <Header />
              <main className="homePage">
                <h1>Welcome : M.{user.displayName}</h1>
                <h1>We send you an email to verify your account 🤚</h1>
              </main>
              <Footer />
            </div>
          )}
        </>
      );
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>
          {user && (
            <div>
              <Header />
              <main className="home">
                {/* 1- Options (filtered data) */}

                {/* 2- Show all tasks */}
                <AllTassks user={user} />
                {/* 3- Add new task button */}
                <section className="">
                  <button  onClick={modal} className="add-task-btn">
                    {i18n.language === "en" && "Add a new task +"}
                    {i18n.language === "ar" && "+ اضف مهمة جديدة"}
                  </button>
                </section>

                {showModal && (
                  <Modal closeIcon={closeIcon}>
                    <div style={{ textAlign: "left", height: "100%" }}>
                      <input
                        onChange={(eo) => {
                          changeInput_title(eo);
                        }}
                        type="text"
                        placeholder="Add title :"
                        value={Title}
                      />
                      <div>
                        <input
                          onChange={(eo) => {
                            changeInput_details(eo);
                          }}
                          type="text"
                          value={SubTask}
                          placeholder="Details"
                          required
                        />

                        <button
                          onClick={async (eo) => {
                            addBtn(eo);
                          }}
                          style={{ marginLeft: "5px" }}
                        >
                          Add
                        </button>
                      </div>

                      <ul>
                        {Details.filter((detail) => detail).map((detail) => (
                          <li key={detail}> {detail} </li>
                        ))}
                      </ul>

                      <button
                        onClick={async (eo) => {
                          submitBtn(eo);
                        }}
                      >
                        {" "}
                        {Loading ? (
                          <ReactLoading
                            type={"spin"}
                            color={"white"}
                            height={20}
                            width={20}
                          />
                        ) : (
                          "Submit"
                        )}{" "}
                      </button>
                    </div>
                  </Modal>
                )}

                {true && (
                  <div
                    className="ddd"
                    style={{ right: showMsg_Task ? "20px" : "-100vw" }}
                  >
                    <p>
                      Task added successfully{" "}
                      <i className="fa-regular fa-circle-check"></i>
                    </p>
                  </div>
                )}
              </main>
              <Footer />
            </div>
          )}
        </>
      );
    }
  }
};

export default Home;
