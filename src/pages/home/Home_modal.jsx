// import React from "react";
// import Modal from "../../shared/Modal";
// import ReactLoading from "react-loading";

// const Home_modal = (
//   addBtn,
//   submitBtn,
//   changeInput_title,
//   changeInput_details,
//   closeIcon,
//   Title,
//   SubTask,
//   Details,
//   Loading,
  
// ) => {
//   return (
//     <Modal closeIcon={closeIcon} >
//     <div style={{textAlign:"left" , height:"100%" }}>
//         <input
//           onChange={(eo) => {
//             changeInput_title(eo)
//           }}
//           type="text"
//           placeholder="Add title :"
//           value={Title}
//         />
//         <div>
//           <input
//             onChange={(eo) => {
//               changeInput_details(eo)
//             }}
//             type="text"
//             value={SubTask}
//             placeholder="Details"
//             required
//             />
            
//           <button onClick={ async(eo) => {
//             addBtn(eo)
//             }}
            
//             style={{marginLeft:"5px"}}>Add</button>
//         </div>

//         <ul>
//           {Details.map((detail) => (
//               <li key={detail}> {detail} </li>
//           ))}
//         </ul>

//         <button onClick={ async(eo) => {
//             submitBtn(eo)
//         }}>  { Loading ?  <ReactLoading type={"spin"} color={"white"} height={20} width={20} /> : "Submit" }   </button>
//     </div>
// </Modal>
//   );
// };

// export default Home_modal;
