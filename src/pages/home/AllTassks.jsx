import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../fireBase/config";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import Footer from "../../comp/Footer";
import Header from "../../comp/header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../fireBase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const AllTassks = () => {
  const [user] = useAuthState(auth);
  const [OldFirst, setOldFirst] = useState(false);
  const [NewFirst, setNewFirst] = useState(false);
  const [selectValue, setselectValue] = useState("All tasks");
  const [initialData, setinitialData] = useState(
    query(collection(db, user.uid), orderBy("Id"))
  );
  const [value, loading, error] = useCollection(initialData);
  const { i18n } = useTranslation();

  if (loading) {
    return (
      <div className="mt-2">
        <ReactLoading type={"spin"} color={"teal"} height={40} width={40} />
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <Header />
        <main>
          <h1>Somthing wrong</h1>
        </main>
        <Footer />
      </div>
    );
  }

  if (value) {
    return (
      <div>
        <section className="parent-of-btns mt-2 flex">
          {selectValue === "All tasks" && (
            <div>
              <button
                style={{ opacity: NewFirst ? "0.3" : null }}
                onClick={() => {
                  setNewFirst(true);
                  setOldFirst(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("Id", "desc"))
                  );
                }}
              >
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدت اولاً"}
              </button>

              <button
                style={{ opacity: OldFirst ? "0.3" : null }}
                onClick={() => {
                  setOldFirst(true);
                  setNewFirst(false);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("Id", "asc"))
                  );
                }}
              >
                {i18n.language === "en" && ("Oldest first")}
                {i18n.language === "ar" && ("الأقدم اولاً")}
              </button>
            </div>
          )}

          <select
            value={selectValue}
            onChange={(eo) => {
              if (eo.target.value === "Completed") {
                setselectValue("Completed");
                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("Completed", "==", true)
                  )
                );
              } else if (eo.target.value === "Not Completed") {
                setselectValue("Not Completed");
                setinitialData(
                  query(
                    collection(db, user.uid),
                    where("Completed", "==", false)
                  )
                );
              } else if (eo.target.value === "All tasks") {
                setselectValue("All tasks");
                setinitialData(query(collection(db, user.uid), orderBy("Id")));
                setOldFirst(true);
                setNewFirst(false);
              }
            }}
          >
            <option value="All tasks">
              {i18n.language === "en" && ("All tasks")}
              {i18n.language === "ar" && ("جميع المهام")}
            </option>
            <option value="Completed">
            {i18n.language === "en" && ("Completed")}
            {i18n.language === "ar" && ("المهام المكتملة")}
            </option>
            <option value="Not Completed">
            {i18n.language === "en" && ("Not Completed")}
            {i18n.language === "ar" && ("المهام الغير مكتملة")}

            </option>
          </select>
        </section>
        <section className="all-tasks flex">
          {value.docs.map((detail) => {
            return (
              <article key={detail} dir="auto" className="one-task">
                <Link className="taskLink" to={`/EditTask/${detail.data().Id}`}>
                  <h2
                    style={{
                      textDecoration: detail.data().Completed
                        ? "line-through 2.5px"
                        : null,
                    }}
                    key={detail}
                  >
                    {detail.data().Title}
                  </h2>
                  <ul>
                    {detail
                      .data()
                      .Details.filter((item) => item)
                      .map((item) => {
                        return <li key={item}>{item}</li>;
                      })}
                  </ul>
                  <p className="time">
                    <Moment fromNow date={detail.data().Id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTassks;
