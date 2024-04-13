
/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */

"use client"

import Image from 'next/image';
import React from 'react';
import logo from '../images/music_world_logo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
    return ( 
      <>
        <div class="px-6 mx-auto bg-white">
          <div class="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div class="flex items-center flex-1">
              <a href="/"><Image src={logo} priority='false' alt='Music World Logo' className=' w-10/12' /></a> 
              <nav class="ml-6 space-x-2 lg:block">
                    <Link href='/' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Chart</Link>
                    <Link href='/artists' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Artists</Link>
                    <Link href='../tracks' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Tracks</Link>
                    <Link href='../votes' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Votes</Link>
                    
                    </nav>
              </div>
              <div class="flex items-center flex-end">
              <div class="ml-6 space-x-2 lg:block">
              <Link href='/' prefetch={false}  className='relative w-1/2 shadow-sm text-white bg-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8'>Login</Link>
              </div>
            </div></div></div>
        </>                
    );
  }