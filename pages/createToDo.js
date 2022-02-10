import { useState } from 'react'

const createToDo = () => {

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
        console.log(responseData);
    
      };

    return (
        <div className="flex justify-center space-y-5">
            <div className=" space-y-3">
                <h4>Create New ToDo</h4>
                <div className="">
                    <input type="text"  
                        onChange={(e) => setTitle(e.target.value)}
                        vlaue={title}
                        className=' bg-gray-200'/>
                </div>

                <div className="">
                    <input type="text"  
                        onChange={(e) => setBody(e.target.value)}
                        vlaue={body}
                        className=' bg-gray-200'/>
                </div>

                <div className="">
                    <input type="date"  
                        onChange={(e) => setEndAt(e.target.value)}
                        vlaue={endAt}
                        className=' bg-gray-200'/>
                </div>
                

                <button className="bg-red-500" onClick={uploadPost}>submit</button>
            </div>
        </div>    
    )
}

export default createToDo