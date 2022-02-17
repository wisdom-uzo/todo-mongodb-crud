import Head from 'next/head'
import Todo from '../components/Todo';
import { connectToDatabase } from '../util/mongodb'
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { FcPlus } from "react-icons/fc";

export default function Home({todos}) {
    console.log(todos)
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-scroll  bg-[url('/img/bg.jpg')] h-screen flex justify-center items-center">
          <div className="bg-black  text-white w-[40rem] shadow-lg">
             <div className="">
               <h1 className='font-bold text-[2rem] font-mono mt-[2rem] ml-[1rem]'>WORK LIST</h1>
               <p className='ml-[2rem] mb-4'>Create a work list to keep you on track</p>
               <div className="grid grid-cols-[1fr,1fr]">
                 <button className="bg-white text-black py-3">To Be Done</button>
                 <button className="bg-blue-600 py-3">Completed</button>
               </div>

               <div className="bg-white text-black h-[70vh] overflow-hidden overflow-y-scroll relative">
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
               
                {/* <button className="p-2 sticky h-[5rem] w-[5rem] bg-blue-500 rounded-full right- bottom-14 shadow-lg">
                  <FcPlus className='h-full w-full '  />
                </button> */}
               </div>
               <div className=" absolute bott">
                     <FcPlus className='h-10 w-10 '  />    
                </div>
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


