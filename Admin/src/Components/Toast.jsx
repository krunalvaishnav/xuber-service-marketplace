// import Toast from "react-bootstrap/Toast";
// import { useState } from "react";

// function ToastButton({ data }) {
//   const [showA, setShowA] = useState(true);

//   const toggleShowA = () => setShowA(!showA);
//   return (
//     <Toast
//       show={showA}
//       onClose={toggleShowA}
//       position="middle-center"
//       delay={3000}
//       autohide
//       bg="success"
//     >
//       <Toast.Header>
//         <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//         <strong className="me-auto">{data}</strong>
//       </Toast.Header>
//       <Toast.Body>Registered Successfully</Toast.Body>
//     </Toast>
//   );
// }

// export default ToastButton;


// components/Toast.js


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Styles/Toast.css"
const Toast = () => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      className="custom-toast-container"
    />
  );
};

export default Toast;
