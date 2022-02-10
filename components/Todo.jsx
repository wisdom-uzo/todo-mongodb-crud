import { useState } from "react"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { ToggleBtn, ModalBox, ModalContent, ModalContainer } from "./Styles";



const Todo = ({title, body, id}) => {

 const [show, setShow]= useState(false)
 const [isOpen, setIsOpen] = useState(false);
 const toggleOpen = () => setIsOpen(!isOpen);
 const [showModal, setShowModal] = useState(false);

 const displayModal = () => {
    setShowModal(!showModal);
  };


  const deletePost = async () => {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

  };
 



    return(
        <div className=" border-b  py-2">

            <Modal showModal={showModal} displayModal={displayModal} />


            <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                <motion.div className="flex justify-between px-6 ">
                    <h2>{title}</h2>
                    <div className="">
                        <button onClick={() =>setShow(!show)} className="">✔</button>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isOpen && 
                    <div className="">
                            <p>{body}</p>
                        

                            <div className="grid grid-cols-[1fr,1fr,1fr]">
                        
                                <motion.button className="bg-green-700"
                                    initial={{ x: -700 }}
                                    animate={{ x: 0, transition: { duration: 0.1 } }}
                                    onClick={displayModal}>
                                    Edit
                                </motion.button>
                            
                                <button>Completed</button>
                                <button
                                onClick={deletePost}
                                 className="bg-red-600 text-white py-2 hover:bg-red-500">Delete</button>
                            </div>
                    </div>
                    }
                </AnimatePresence>
            </motion.li>
        </div>
    )
}
export default Todo





const Modal = ({ showModal, displayModal }) => {
    return (
        <AnimatePresence>
          {showModal && (
            <ModalBox
              initial={{ opacity: 0, y: 60, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1,
                transition: { type: "spring", stiffness: 300 }
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}>
                  
              <ModalContent
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}>
                               
                <div>
                        <motion.button
                            initial={{ x: -700 }}
                            animate={{x: 0, transition: { duration: 0.1 }}}
                            onClick={displayModal}>
                            Toggle Modal
                        </motion.button>
                </div>
                
               helllo
              </ModalContent>
            </ModalBox>
          )}
        </AnimatePresence>
    );
  };
    