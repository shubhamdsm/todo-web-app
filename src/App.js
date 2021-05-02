import {useState,useEffect} from 'react';
import{AnimatePresence, motion} from 'framer-motion';
import Footer from './Footer';
import './App.css';

function App() {
  const [todos,setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos,input])
    setInput('')
  }
  const handleDelete = (index) => {
    // setTodos(todos.filter(todo => todo.index !== index))
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
   
  }

  useEffect(()=> {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if(todos){
      setTodos(todos)
    }
  },[])
  useEffect(()=> {
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])
  
  return (
    <motion.main initial={{y:100}} animate={{y:0}} transition={{type:'spring', damping:12}} className="App h-screen ">
      <Footer/>
     <h1 className='text-8xl mb-10 mt-10 text-center font-black text-white'>Todo </h1>
     <form className='flex justify-center'>
       <input required className=' border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-grey-500 focus:ring-1 focus:ring-grey-500 mr-5' value={input} onChange={(e)=> setInput(e.target.value)}></input>
      <motion.button
      whileHover={{
        scale:1.1,
        textShadow:"0px 0px 8px rgb(255,255,255)",
        boxShadow:"0px 0px 8px rgb(255,255,255)",
      }}
       className='bg-green-700 hover:bg-green-500 text-white font-bold py-2 px-4 rounded cursor-pointer' type='button' onClick={handleSubmit}>➕</motion.button>
     
     </form> 
     <AnimatePresence>
     {todos.map((todo,index) => (
       <ul className='flex justify-center mt-8'>
         <motion.li 
         initial={{y:8}}
         animate={{y:0}}
         exit={{y:-8}}
         layout  key={index} 
         className='pr-8 pt-2 text-white text-3xl'>{todo}</motion.li>
         <motion.button
         whileHover={{
        scale:1.1,
        textShadow:"0px 0px 8px rgb(255,255,255)",
        boxShadow:"0px 0px 8px rgb(255,255,255)",
      }}
          className='bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer' type='button' onClick={()=> handleDelete(index)}>❌</motion.button>
       </ul>
     ))}
     </AnimatePresence>
     
    </motion.main>
    
  );
}

export default App;
