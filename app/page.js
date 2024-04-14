/*
 * Web Development 3 - CPRG306D
 * Week 8 - Assignment
 * Name: Cathy Sun
 * Date: 2024 Mar 16
 */
"use client";

// Import the useUserAuth hook
import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Header from './components/header';
import { useUserAuth } from "./_utils/auth-context";
import logo from './images/music_world_logo.png';
import Link from 'next/link';
import arrowIcon from './images/arrow-icon.png';
import searchIcon from './images/search-icon.svg';

export default function Login() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    
    async function handleSignIn() {
        try {
            // Sign in to Firebase with GitHub authentication
            await gitHubSignIn();
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            // Sign out of Firebase
            await firebaseSignOut();
           
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        

<>
    <main > <>
        <div className="px-6 mx-auto bg-white">
          <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center flex-1">
              <a href="/"><Image src={logo} priority='false' alt='Music World Logo' className=' w-10/12' /></a> 
              
              { user && 
              <nav className="ml-6 space-x-2 lg:block">
                    <Link href='/' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Home</Link>
                    
                    <Link href='/charts' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Charts</Link>
                    <Link href='/artists' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Artists</Link>
                    <Link href='/tracks' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Tracks</Link>
                    <Link href='../votes' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Votes</Link>
                    
                    </nav> } 
              </div>
              <div className="flex items-center flex-end">
              <div className="ml-6 space-x-2 lg:block">
              { user && 
              <button onClick={handleSignOut}
                              className='relative w-1/2 shadow-sm text-white bg-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8'>
                              Sign Out
               </button>   
            }
            </div>
            </div></div></div>
        </>   

     
    <div className='py-8 mx-auto'>
      
    {user ? (
        <><div className='sm:flex sm:flex-col sm:align-center'>
        <div className='relative flex flex-row ml-24'>
          <Link prefetch={false} href='/' className='text-gray-800'>Home</Link>
        </div>        
        </div> 
        <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
            <div className='flex flex-col  flex-1 '>
        
                
                    <p>
                        Signed in as {user.displayName} {user.email}
                    </p>                                                              
                       
                    
              </div></div>  </>
            ) : (
                <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
                    <div className='flex flex-col  flex-1 '>
                    <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
                            Sign in with GitHub
                    </button>
                    </div>
                    </div>
            )
        }  
    </div>

  </main>  
  </>
      );    
}