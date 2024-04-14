/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */

"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import logo from '../images/music_world_logo.png';
import { useUserAuth } from '../_utils/auth-context.js';

async function fetchSingleArtist(artistName) {
   
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    //return data.artist;
    let value = artistName.replace(/ /g, '').replace(/,/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${value}.json`;
    let response = await fetch(url, {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.topalbums;    
   
}


async function fetchArtistAlbums(artistName) { 
     
    let value = artistName.replace(/ /g, '').replace(/,/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${value}.json`;
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${artistName}&limit=9&api_key=51de025812af79cb70f4a872936181a0&format=json`, {Method: 'POST',  cache: 'no-store' });
    let response = await fetch(url , {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.topalbums.album;  
   
}

export default function ArtistInfo({ searchParams }) {
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [artistContent, setArtistContent] = useState('');
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [error, setError] = useState(false);
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

  async function loadArtist(paramArtist) {
      try { 

        //if(searchParams.artistName && searchParams.artistName != '')
        setArtistName(paramArtist);

        if (artistName != '')        
        {
            let data = await fetchSingleArtist(artistName);
            if (data) {             
              setArtistContent(data.bio.summary);
            }               
            
            let data2 = await fetchArtistAlbums(artistName);
            if (data2) {             
              setArtistAlbums(data2);
            }             
        }             
      } 
      catch (error) { 
        //console.log(error);
        setError(true);
      }
  }

  useEffect(() => {   
    loadArtist(searchParams.artistName);
  });
  
  
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

{     user && 
      <div className="py-8 mx-auto">
      <div className="sm:flex sm:flex-col sm:align-center">
      <div className="relative flex flex-row ml-24">
      <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
        <Link prefetch={false} href='/artists' className='text-purple-800 underline '> Artist</Link> 
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' />
        <div className='text-gray-800'>{artistName}</div>
    </div>
    </div>

<div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
      { error && <div className='text-gray-800'>No Record Found</div> }         
            
      {  !error && artistContent && <>
            <h1 className='text-3xl leading-6 text-gray-800 mb-8'>{artistName}</h1>
            <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:artistContent}}></div>   
          </> }
  </div>
 </div>
</div> }

    {
      user && !error && artistAlbums && <>
      <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-0 mb-10 bg-white rounded p-10'>
        <div className='flex flex-col flex-1 '>
          <h1 className='text-3xl leading-6 text-gray-800 mb-8'>Top Albums</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6'>  
                    {                       
                      artistAlbums.map((item, index) => (
                          <div key={index} className='text-center'>
                                {  
                                    item.image.map((item, index) => (
                                    index == 2 &&                             
                                    <img key={index} alt='image' src={Object.values(item).slice(0,1)} className='px-3'></img>
                              ))}  
                               <div className='w-5/6 text-base text-gray-800'>{item.name}</div>
                         </div>
                       ))
                    }                    
                </div> 
                </div>
              </div>    
            </>               
    } 


{ !user && 
  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
  <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
         Sign in with GitHub
 </button>
 </div>
 </div>

}

    
  </main>  
  </>
  );
}
