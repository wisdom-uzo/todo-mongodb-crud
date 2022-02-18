import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import NewTodo from "./NewTodo";
import { FaTimes } from 'react-icons/fa'
 
const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500, 
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  

const Modal = ({ handleClose, text }) => {

    return (
      <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="modal orange-gradient bg-white rounded-lg shadow-md p-5   w-[clamp(50%,700px,90%)]"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            
            <button 
              className="flex rounded-full justify-center items-center animate animate-bounce absolute right-9 bg-red-500 text-white h-7 w-7"
              onClick={handleClose}>
              <FaTimes/>
            </button>

            <NewTodo />
          </motion.div>
      </Backdrop>
    );
  };

  
  export default Modal;