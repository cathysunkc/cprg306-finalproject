/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';

import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';




async function fetchSingleTrack(trackName, artistName) {
  
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${trackName}&artist=${artistName}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    const data = await response.json();
       return data.track;
   
  }




export default function TrackInfo({ searchParams }) {
  
  const [ trackName, setTrackName ] = useState('');
  const [ artistName, setArtistName ] = useState('');
  const [trackContent, setTrackContent] = useState('');


  async function loadTrack() {
      try {       


        
        if(searchParams.trackName && searchParams.trackName != '')
          setTrackName(searchParams.trackName);

        if(searchParams.artistName && searchParams.artistName != '')
          setTrackName(searchParams.artistName);

        if (trackName != "" && artistName != "")        
        {
            const track = await fetchSingleTrack(trackName, artistName);
            if (track) {
             
              setTrackContent(track.wiki.summary);
            }    

        }
        

      } catch (error) {
          console.error(error);
          
      }
  }

  useEffect(() => {   
    loadTrack();
  });

 
  
   return (
    <>
    <main > 
           
<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row ml-24">
  
<Link href='/' className='text-gray-800 hover:underline '>Home</Link>

    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-purple-400' alt="arrow icon" /> 
   <Link href='/tracks'> Track</Link> 
    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-gray-400' alt="arrow icon" />
    {trackName}
  
  
  
  
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
 
            
           {
             trackContent && <>
                <h1 className="text-3xl leading-6 text-purple-800 mb-8">{trackName}</h1>
                <div className='justify-normal' dangerouslySetInnerHTML={{__html:trackContent}}></div>   
                
             </> 
           }
   
</div>

 


            
 
</div>

      </div>

     
       
        
        
  </main>
  
  </>
  );
}
