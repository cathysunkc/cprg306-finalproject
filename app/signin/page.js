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
import { useUserAuth } from "../_utils/auth-context";
import Link from 'next/link';
import arrowIcon from '../images/arrow-icon.png';
import searchIcon from '../images/search-icon.svg';

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
    <main > 
    <div className='py-8 mx-auto'>
      <div className='sm:flex sm:flex-col sm:align-center'>
        <div className='relative flex flex-row ml-24'>
          <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
          <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' /> <div className='text-gray-800 '>Sign In</div>
        </div>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
          <div className='w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>            
        </div>
      </div>
    </div>
    <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-10'>
      <div className='flex flex-col  flex-1 '>
      {user ? (
                <div className="text-lg">
                    <p>
                        Signed in as {user.displayName} {user.email}
                    </p>
                    <button
                        onClick={handleSignOut}
                        className="text-lg m-2 hover:underline">
                        Sign Out
                    </button>                    
                    <p>
                        <a className="text-lg hover:underline" href="/week-8/shopping-list">Continue to your Shopping List</a>
                    </p>
                </div>
            ) : (
                <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
                        Sign in with GitHub
                </button>
            )}
      </div>
    </div>
  </div>
  </main>  
  </>
      );    
}