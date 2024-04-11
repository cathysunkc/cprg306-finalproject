/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import searchIcon from '../images/search-icon.svg';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Breadcrumb from '../components/breadcrumb';




async function fetchSingleArtist(artistName) {
  
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=40&format=json`, {Method: 'POST', cache: 'no-store' });
    const data = await response.json();
    return data.artist;
   
  }


export default function SingleArtist({ searchParams }) {
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [artistContent, setArtistContent] = useState("");


  async function loadArtist() {
      try {       

        const name = searchParams.artistName;
        
        if(name && name != '')
          setArtistName(name);

        if (artistName != "")
        
        {
            
            const data = await fetchSingleArtist(artistName);
            if (data) {
             
              setArtistContent(data.bio.summary);
            }    
        }
        

      } catch (error) {
          console.error(error);
          
      }
  }

  useEffect(() => {   
    loadArtist();
  });

 
  
   return (
    <>
    <main > 
           
<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row ml-24">
  
<Link href='/' className='text-gray-800 hover:underline '>Home</Link>
{artistName == '' &&   
    <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-gray-800' alt="arrow icon" /> Artist</>}
{artistName != '' && 
    <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-purple-400' alt="arrow icon" /> 
   <Link href='/artists'> Artist</Link> 
    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-gray-400' alt="arrow icon" />
    {artistName}
    </>}
  
  
  
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
 
            
           {
             artistContent && <>
                <h1 className="text-3xl leading-6 text-purple-800 mb-8">{artistName}</h1>
                <div dangerouslySetInnerHTML={{__html:artistContent}}></div>   
                
             </> 
           }
   
</div>

        </div></div>

       
        
        
  </main>
  
  </>
  );
}
