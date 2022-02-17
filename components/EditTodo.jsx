import { useState } from 'react'

const EditTodo = ({editTitle,}) => {

    const [title, setTitle] = useState(title)
    const [body, setBody] = useState(body)
    const [endAt, setEndAt] = useState('')

    console.log(title)

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
        console.log(responseData);
    
      };

    return (
        <div className="flex justify-center space-y-5 w-full mt-10 ">
            <div className=" space-y-3 w-full">
                <div className="">
                    <input type="text"  
                        onChange={(e) => setTitle(e.target.value)}
                        vlaue={title}
                        placeholder={editTitle}
                        className='p-1 w-full border border-blue-500 rounded'/>
                </div>

                <div className="">
                    <input type="text"  
                        onChange={(e) => setBody(e.target.value)}
                        vlaue={body}
                        className='p-1 w-full border border-blue-500 rounded'/>
                </div>

                <div className="">
                    <input type="date"  
                        onChange={(e) => setEndAt(e.target.value)}
                        vlaue={endAt}
                        className="p-1 w-full border border-blue-500 rounded"/>
                </div>
                <div className=" grid grid-cols-2 text-white font-bold">
                       <button className="bg-blue-500 py-1 font-bold">Submit</button>
                       <button className="bg-red-500 font-bold">Cancle</button>
                </div>
             
            </div>
        </div>    
    )
}

export default EditTodo