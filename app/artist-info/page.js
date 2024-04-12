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
import { useRouter } from 'next/navigation';

async function fetchSingleArtist(artistName) {
  
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    const data = await response.json();
       return data.artist;
   
  }


  async function fetchArtistAlbums(artistName) {
  
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${artistName}&limit=9&api_key=fb2b87e326084e3dce78c5439ab49c61&format=json`, {Method: 'POST',  cache: 'no-store' });
    const data = await response.json();
    return data.topalbums.album;
   
  }


export default function ArtistInfo({ searchParams }) {
 
  const [ artistName, setArtistName ] = useState('');
  const [artistContent, setArtistContent] = useState('');
  const [artistAlbums, setArtistAlbums] = useState([]);



  async function loadArtist() {
      try {       


        
        if(searchParams.artistName && searchParams.artistName != '')
          setArtistName(searchParams.artistName);

        if (artistName != "")        
        {
            const artist = await fetchSingleArtist(artistName);
            if (artist) {
             
              setArtistContent(artist.bio.summary);
            }    
            
            const albums = await fetchArtistAlbums(artistName);
            if (albums) {
             
              setArtistAlbums(albums);
            } 
           

        }     
        

      } catch (error) {
        //setError(true);          
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
  
<Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>

    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
   <Link prefetch={false} href='/artists' className='text-purple-800 underline '> Artist</Link> 
    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" />
    <div className='text-gray-800'>{artistName}</div>
  
  
  
  
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
          
            
           {
            artistContent && <>
                <h1 className="text-3xl leading-6 text-gray-800 mb-8">{artistName}</h1>
                <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:artistContent}}></div>   
                
             </> 
           }
   
</div>

        </div></div>

        <div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-0 mb-10 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

        <div className="flex flex-col  flex-1 ">


          {
           artistAlbums && <>
              <h1 className="text-3xl leading-6 text-gray-800 mb-8">Top Albums</h1>
               <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6'>  
               
                           
                    {
                      
                      artistAlbums.map((item, index) => (
                           
                            
                          <div key={index} style={{textAlign:'center'}}>
                                 
                                 
                                {  item.image.map((item, index) => (
                                    index == 2 &&                             
                                    <img key={index} src={Object.values(item).slice(0,1)} style={{paddingLeft: '10px', paddingRight: '10px'}}></img>
                              ))}  
                               <div className='w-5/6 text-base text-gray-800'>{item.name}</div>
                         </div>
                       ))
                    }                    
                </div>     
            </>               
          } </div>
      </div>
  </main>
  
  </>
  );
}
