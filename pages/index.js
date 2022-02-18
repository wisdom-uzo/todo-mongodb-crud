import Head from 'next/head'
import Todo from '../components/Todo';
import { connectToDatabase } from '../util/mongodb'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { FiPlusCircle, FiSearch, FiUser } from "react-icons/fi";
import { useState } from 'react';
import Modal from '../components/Modal';

export default function Home({todos}) {
  const [modalOpen, setModalOpen] = useState(false);

  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);






  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-scroll  bg-[url('/img/bg.jpg')] h-screen flex justify-center items-center">

        <AnimatePresence  
          exitBeforeEnter={true}
          initial={false}
          onExitComplete={() => null}>
            {modalOpen && <Modal modalOpen={modalOpen} handleClose={close} />}
        </AnimatePresence>


          <div className="bg-black  text-white w-[40rem] shadow-lg relative">
             <div className="">
               <h1 className='font-bold text-[2rem] font-mono mt-[2rem] ml-[1rem]'>WORK LIST</h1>
               <p className='ml-[2rem] mb-4'>Create a work list to keep you on track</p>
               <div className="grid grid-cols-[1fr,1fr]">
                 <button className="bg-white text-black py-3">To Be Done</button>
                 <button className="bg-blue-600 py-3">Completed</button>
               </div>

               <div className="bg-white text-black h-[70vh] overflow-hidden overflow-y-scroll relative">
                 
                 <AnimateSharedLayout>
                <AnimateSharedLayout>
                    <motion.ul layout initial={{ borderRadius: 25 }}>
                        {todos.map((todo)=> (
                          <Todo 
                              key={todo._id} 
                              title={todo.title}
                              body={todo.body}
                              id={todo._id}
                              />
                        )) }
                    </motion.ul>
                </AnimateSharedLayout>
                </AnimateSharedLayout>
               </div>


             </div>
              <div className=" absolute bottom-2 text-black bg-white w-[100%] py-2 rounded  flex items-center justify-center gap-5">
                     <FiSearch className='h-9 w-9' />
                     <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="save-button"
                        onClick={() => (modalOpen ? close() : open())}
                      >
                        <FiPlusCircle className='h-12 w-12 '  /> 
                      </motion.button>
                     
                     <FiUser className='h-9 w-9' />  
                </div>
          </div>
      </main>
  
    </div>
  )
}



export async function getServerSideProps(context) {


    

    // get post from SSR

    const {db} = await connectToDatabase();
    const todos = await db
      .collection("todo")
      .find()
      .sort({timestamp: -1})
      .toArray()

    return {
      props: {
        todos: todos.map((todo) => ({
          _id: todo._id.toString(),
          title: todo.title,
          body: todo.body,
          createdAt: todo.createdAt,
        })),
      }
    }
}


