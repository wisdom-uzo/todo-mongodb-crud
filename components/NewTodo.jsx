import { motion } from 'framer-motion'
import { useState } from 'react'

const NewTodo = () => {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [endAt, setEndAt] = useState('')

    const uploadPost = async (e) => {
        e.preventDefault();

        const todo = {
            

        }
    
        const response = await fetch("/api/post", {
          method: "POST",
          body: JSON.stringify({
            title:title,
            body:body,
            isComplete:false,
            endAt,
            createdAt: new Date().toString(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        const responseData = await response.json();
    
      };

    return (
        <div className="flex justify-center w-full space-y-5 mt-5">
            <div className=" space-y-3 w-[90%]">
                <h4 className='text-center text-[1.5rem] text-gray-500'>Add a new Work list</h4>
                <div className="">
                    <label className='text-gray-500' htmlFor="">Work List title</label>
                    <input type="text"  
                        onChange={(e) => setTitle(e.target.value)}
                        vlaue={title}
                        className=' bg-gray-200 w-full py-2 px-1 outline-none'/>
                </div>

                <div className="">
                  <label className='text-gray-500' htmlFor="">Work List body</label>
                    <input type="text"  
                        onChange={(e) => setBody(e.target.value)}
                        vlaue={body}
                        className=' bg-gray-200 w-full py-2 px-1 outline-none'/>
                </div>

                <div className="">
                <label className='text-gray-500' htmlFor="">Work List title</label>
                    <input type="date"  
                        onChange={(e) => setEndAt(e.target.value)}
                        vlaue={endAt}
                        className=' bg-gray-200 w-full py-2 px-1 outline-none'/>
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500 w-full py-2 text-white font-bold shadow"
                    onClick={uploadPost}
                >
                    SUBMIT
                </motion.button>
                {/* <button className="bg-blue-500 w-full" onClick={uploadPost}>submit</button> */}
            </div>
        </div>    
    )
}

export default NewTodo