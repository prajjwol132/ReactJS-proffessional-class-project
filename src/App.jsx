import React from 'react'
import { IoIosCall } from "react-icons/io";
import { CgMail } from "react-icons/cg";
import { FaSquareFacebook } from "react-icons/fa6";
import { TbBrandInstagram } from "react-icons/tb";
import { FaSquareXTwitter } from "react-icons/fa6";

const App = () => {
  return (
    <><header className="App-header h-17 bg-[#1a202e] flex items-center flex-1 fixed top-0 w-full">
      <div className='flex items-center'>
        <IoIosCall className="text-[#ffffff] text-2xl ml-15" /><p className='text-[#ffffff] text-1xl inline ml-0'>9745614586</p>
        <CgMail className="text-[#ffffff] text-2xl ml-4" /><p className='text-[#ffffff] text-1xl inline ml-0'>bhandariprajjwol094@gmail.com</p>
      </div>
      <div className='flex items-center w-full justify-end mr-15'>
        <button><FaSquareFacebook className="text-[#ffffff] text-2xl ml-3 hover:opacity-50" /></button>
        <button><TbBrandInstagram className="text-[#ffffff] text-2xl ml-3 hover:opacity-50" /></button>
        <button><FaSquareXTwitter className="text-[#ffffff] text-2xl ml-3 hover:opacity-50" /></button>
        <button className='bg-[#ffffff] text-[#1a202e] font-bold ml-3 px-4 py-2 rounded-3xl hover:opacity-50 cursor-pointer'>Login</button>
        <button className='bg-[#ffffff] text-[#1a202e] font-bold ml-3 px-4 py-2 rounded-3xl hover:opacity-50 cursor-pointer'>Sign up</button>
      </div>
    </header>
    <nav>
      <div>
        
      </div>
    </nav>
    </>

  )
}

export default App;
