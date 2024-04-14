/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import searchIcon from '../images/search-icon.svg';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import logo from '../images/music_world_logo.png';
import { useUserAuth } from '../_utils/auth-context.js';

async function fetchTrendingArtist() {
  
  try {
  //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=&limit=28&format=json`, {Method: 'POST', cache: 'no-store' });
    let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/trendingArtists.json', {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.artists.artist;
  } catch (error) {
    //console.error(error);
    
  } 
}


export default function Artists() {
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [trendingArtist, setTrendingArtist] = useState([]);
  const [artistContent, setArtistContent] = useState('');
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

  async function loadArtist() {
      try {    
          let data = await fetchTrendingArtist();            

          if (data) {   
            setArtistContent("");            
            setTrendingArtist(data);
          }         
      } catch (error) {
        //  console.error(error);          
      }
  }

  useEffect(() => {   
    loadArtist();
  }, []);

  function handleSubmit(e) {
    if (e.target.artistName.value && e.target.artistName.value != '')
    {
      e.preventDefault();
      router.push('/artist-info?artistName=' + e.target.artistName.value);    
    }
  }

  function reloadArtist(artistName)
  {
    setArtistName(artistName);
    loadArtist();
  }

  
   return (
    <>
    <main>
    <>
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

        {     user ? (
        <div className='py-8 mx-auto'>
        <div className='sm:flex sm:flex-col sm:align-center'>
          <div className='relative flex flex-row ml-24'>
            <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
            <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' /> <div className='text-gray-800 '>Artist</div>
        </div>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
        <div className='w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
          <form onSubmit={handleSubmit} className='flex h-fit w-full flex-row items-center rounded-xl px-1 '>
              <input className='h-10 w-full resize-none bg-transparent px-2 text-base sm:text-sm  transition-all duration-300' 
                placeholder='Enter Artist Name'
                type={'text'}
                id='artistName'
                name='artistName' 
              />
          <button type='submit' className='flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25'>
            <Image src={searchIcon} alt='search icon' className='lucide lucide-corner-down-left shrink-0 -ml-px' /></button>
          </form>
          </div>
        </div>
      </div>

  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-10'>
    <div className='flex flex-col  flex-1 '>
            {
              !artistName && 
                <>
                <h1 className='text-3xl leading-6 text-gray-800 mb-8'># Trending Artists</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      {
                        
                         trendingArtist.map((item, index) => (
                            <div key={index} className=' m-3'>                              
                              <Link prefetch={false} className='underline' shallow={true} href={{
                                      pathname: '/artist-info',
                                      query: {
                                        artistName: item.name
                                      }
                                    }}
                                  >{item.name}</Link>
                              </div>
                          ))
                      }
                  </div>     
                </>               
            }
        </div>
      </div>
    </div>
 ) : (
  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
  <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
         Sign in with GitHub
 </button>
 </div>
 </div>
)}  


  </main>  
  </>
  );
}