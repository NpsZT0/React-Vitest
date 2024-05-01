import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);
  return (
    <div>
      <h2 className='text-2xl'>Counter: {count}</h2>
      <button className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2" onClick={()=>setCount(count+1)}>Increment</button>
      <button className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={()=>setCount(count-1)}>Decrement</button>
    </div>
  )
}
