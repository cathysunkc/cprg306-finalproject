import Image from 'next/image';
import React from 'react';
import logo from '../images/music_world_logo.png';
import Link from "next/link";


export default function Header() {
    return ( 
      <>
        
        <div className="h-20" >
        <div className="px-6 mx-auto bg-white">
        <div className="relative flex flex-row justify-between py-4 align-center">
            <div className="flex items-center flex-1">
              <a aria-label="Logo" href="/" >
                <Image src={logo} priority="false" width="300px" alt="Music World Logo" />                 
                   </a>
                   <nav class="ml-6 space-x-2 lg:block">
                    <button type="button" href='/' class="relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">Chart</button>
                    <button type="button" href='/' class="relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">Artists</button>
                    <button type="button" href='/' class="relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">Tracks</button>
                    <button type="button" href='/' class="relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">Votes</button>
                  </nav>
                  </div><div class="flex justify-end space-x-8">
                  <button type="button" href='/' class="relative w-1/2 bg-purple-800  shadow-sm text-white rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8">Login</button>
                   
                    </div></div></div>   
        
        </div>  
        </>                
    );
  }