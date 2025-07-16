import { useEffect, useState } from 'react'
import './App.css'
import { jsx } from 'react/jsx-runtime'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState('')
  const [todos, settodos] = useState(() => {
    // Initialize state from localStorage
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Failed to parse todos from localStorage", error);
      return [];
    }
    console.log(localStorage.getItem("todos"));
  });
  const [showfinished, setshowfinished] = useState(false);



  // Save todos to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
      console.error("Failed to save todos to localStorage", error);
    }
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim().length <= 3) return;

    settodos([...todos, {
      todo: todo.trim(),
      isCompleted: false,
      id: Date.now()
    }]);
    settodo("");
  }

  const handleedit = (id) => {
    const itemToEdit = todos.find(item => item.id === id);
    settodo(itemToEdit.todo);
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newTodos)

  }


  const handledelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)


  }

  const handlechange = (e) => {
    settodo(e.target.value)



  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && todo.trim().length > 3) {
      handleAdd(); // Same function as button click

    }
  };

  const handleCheckbox = (e) => {
    let id = parseInt(e.target.name);  // Convert to number
    let index = todos.findIndex(item => item.id === id);

    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      settodos(newTodos);
    }
  }

  const togglefinished = (e) => {
    setshowfinished(!showfinished)

  }




  return (
    <>

      <div className="container bg-gradient-to-br from-white-400 via-green-200 to-violet-300   shadow-xl   p-3 my-2  lg:my-10 m-auto w-3/4  min-h-[80vh] rounded-2xl  lg:w-1/2   ">
        <h1 className='font-bold text-blue-950 text-black-600 text-2xl text-center'>iTask- Plan your task in one place.</h1>
        <div className="addtodo mb-5">
          <h1 className=" text-lg  font-bold my-3 mx-4 flex flex-col">Add a Todo</h1>
          <div className="flex w-full  my-3 overflow-hidden rounded-full backdrop-blur-md border border-white/30 shadow-md">
            <input
              id='todo1'
              onChange={handlechange}
              onKeyDown={handleKeyDown}
              value={todo}
              type="text"
              placeholder="Enter your task..."
              className="flex-grow px-4 py-2 bg-white/50 text-black placeholder-black/70 focus:outline-none  focus:ring-blue-400 transition duration-300"
            />

            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className={`px-4 py-2 transition   duration-300 
      ${todo.length <= 3
                  ? 'bg-orange-500/60 text-white cursor-not-allowed'
                  : 'bg-orange-600/70 text-white hover:bg-orange-500/80 focus:outline-none focus:ring-2 focus:ring-orange-300'}`}
            >
              Save
            </button>
          </div>
        </div>

        <input  className='accent-blue-600 ' onChange={togglefinished} checked={showfinished} type="checkbox" /> Show Finished

        <h1 className="yourtodos  font-bold text-lg mt-2 ">Your Todos</h1>
        <div className="todos mt-4 ">
          {todos.length === 0 && <div className='m-5'> No Todos to display.</div>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo  flex w-3/4 mt-4 justify-between">

              <div className="todowithcheck flex gap-3">
                <input className='accent-blue-600' name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""} >{item.todo}</div></div>

              <div className="buttons items-center flex ">
                <button onClick={() => { handleedit(item.id) }} className='bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold mx-1  p-2 py-1 rounded-md ' ><FaEdit /></button>
                <button onClick={() => { handledelete(item.id) }} className='bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold mx-1  p-1   py-1 rounded-md ' ><AiFillDelete />
                </button>
              </div>
            </div>
          })}    </div> </div>

    </>
  )
}

export default App
