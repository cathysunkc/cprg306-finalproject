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
import Charts from './components/charts';
import Artists from './components/artists';
import Tracks from './components/tracks';
import { useUserAuth } from "./_utils/auth-context";
import logo from './images/music_world_logo.png';
import Link from 'next/link';
import arrowIcon from './images/arrow-icon.png';
import searchIcon from './images/search-icon.svg';

export default function Login() {
    // Use the useUserAuth hook to get the user object and the login and logout functions
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();
    const [pageName, setPageName] = useState('home');
    
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

    function handlePageChange(value) {
        setPageName(value);
    }

    return (       

<>
    <main > <>
        <div className="px-6 mx-auto bg-white">
          <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center flex-1">
              <button onClick={()=>handlePageChange('home')}><Image src={logo} priority='false' alt='Music World Logo' className=' w-10/12' /></button> 
              
              { user && 
              <nav className="ml-6 space-x-2 lg:block">
                    <button onClick={()=>handlePageChange('home')}  prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Home</button>
                    <button onClick={()=>handlePageChange('charts')} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Charts</button>
                    <button onClick={()=>handlePageChange('artists')}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Artists</button>
                    <button onClick={()=>handlePageChange('tracks')}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Tracks</button>
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
        <>
           {pageName=='home' &&
            <><div className='sm:flex sm:flex-col sm:align-center'>
                <div className='relative flex flex-row ml-24'>
                <div className='text-gray-800'>Home</div>
                </div>        
            </div> 
            <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
                <div className='flex flex-col  flex-1 text-gray-800'>Signed in as {user.displayName}<br/>{user.email}
                </div>
            </div></>
            }

            { pageName=='charts' && 
                    <><div className='sm:flex sm:flex-col sm:align-center'>
                    <div className='relative flex flex-row ml-24'>
                    <button onClick={()=>handlePageChange('home')}  prefetch={false}   className='text-purple-800 underline '>Home</button>
                     <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
                     
                    </div>        
                    </div> 
                    <Charts defaultPage={pageName} /></> 
            }
            { pageName=='artists' &&             
                    <><div className='sm:flex sm:flex-col sm:align-center'>
                    <div className='relative flex flex-row ml-24'>
                    <button onClick={()=>handlePageChange('home')}  prefetch={false}   className='text-purple-800 underline '>Home</button>
                    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
                    </div> 
                         
                    </div> 
                    <Artists defaultPage={pageName} />  </>  }
            { pageName=='tracks' && 
                    <><div className='sm:flex sm:flex-col sm:align-center'>
                    <div className='relative flex flex-row ml-24'>
                    <button onClick={()=>handlePageChange('home')}  prefetch={false}   className='text-purple-800 underline '>Home</button>
                    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
                    </div>        
                    </div> 
                    <Tracks /></> }
        </>
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