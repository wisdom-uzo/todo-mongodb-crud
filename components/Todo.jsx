import { useState } from "react"
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { ToggleBtn, ModalBox, ModalContent, ModalContainer } from "./Styles";
import { useRouter } from 'next/router';
import EditTodo from "./EditTodo";
import { AiFillCaretDown } from "react-icons/ai";

const Todo = ({title, body, id}) => {

 const [show, setShow]= useState(false)
 const [isOpen, setIsOpen] = useState(false);
 const toggleOpen = () => setIsOpen(!isOpen);
 const [showModal, setShowModal] = useState(false);

 const displayModal = () => {
    setShowModal(!showModal);
  };


    const router = useRouter();
    // Call this function whenever you want to
    // refresh props!
    const refreshData = () => {
      router.replace(router.asPath);
    }



  const deletePost = async (req, res) => {
    const response = await fetch(`/api/post/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    
      refreshData();
    

  };
 



    return(
        <div className=" border-b  py-2">

            <Modal 
              showModal={showModal}
              title={title}
              id={id} 
              body={body}
              displayModal={displayModal}
             />


            <motion.li layout onClick={toggleOpen} initial={{ borderRadius: 10 }}>
                <motion.div className="flex justify-between px-6 ">
                    <h2>{title}</h2>
                    <div className="">
                        <button onClick={() =>setShow(!show)} className=""><AiFillCaretDown/></button>
                    </div>
                </motion.div>

                <AnimatePresence initial={false}>
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





const Modal = ({ showModal, displayModal, title, body, id }) => {

    return (
        <AnimatePresence>
          {showModal && (
            <ModalBox className="bg-gray-200 relative z-40 mx-5 rounded shadow border p-5 my-4"
              initial={{ opacity: 0, y: 60, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1,
                transition: { type: "spring", stiffness: 300 }
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}>
                  
              <div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}>
                               
                <div className="bg-red-500 absolute right-0 top-0 rounded text-white p-1">
                    <motion.button
                        initial={{ x: -700 }}
                        animate={{x: 0, transition: { duration: 0.1 }}}
                        onClick={displayModal}>
                        close
                    </motion.button>
                </div>
                
               <EditTodo editTitle={title} />
              </div>
            </ModalBox>
          )}
        </AnimatePresence>
    );
  };
    