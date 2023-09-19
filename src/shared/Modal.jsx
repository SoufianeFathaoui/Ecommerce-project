import React from 'react';

// closeIcon => Function to close the form Modal
const Modal = ({closeIcon , children}) => {
  return (
    <>
      <style> {`.parent-of-modal{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.5);
      }
      
      
      .modal{
        background-color: whitesmoke;
        width: 400px;
        height: 300px;  
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        scale: 1;
        animation : mymove 0.8s;
        overflow-y: scroll;

      }
      @keyframes mymove{
        0% { scale:0; transform: translateY(-100vh);}
        100% {scale:1; transform: translateY(0vh);}
      }
      .close .fa-xmark{
        color: #444;
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 35px;
        transition: 0.5s;
      }
      .close .fa-xmark:hover{
        color: orange;
        transform: rotate(190deg);
      }`}
      </style>

          <div className="parent-of-modal">
            <form className={`modal`}>
                <div  onClick={() => {
                  closeIcon()
                  }} className="close">
                  <i className="fa-solid fa-xmark"></i>
                </div>
                {children}
              
            </form>
          </div>
    </>
  );
}

export default Modal;
