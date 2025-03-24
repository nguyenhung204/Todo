import React from 'react';
import person from '../../assets/person.jpg';
import './Header.css';


function Header(){
    return (
        <div className='flex justify-between items-center p-5'>
            <h1 className='text-4xl font-bold text-transparent bg-gradient-to-r 
            from-blue-500 via-purple-500 to-pink-500 
            bg-clip-text animate-gradient bg-[length:200%_200%]'>Usider</h1>
            <img
            className="w-[40px] h-[40px] rounded-full"
                src= {person}
            />
        </div>
    )
}
export default Header