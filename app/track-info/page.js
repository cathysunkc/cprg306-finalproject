/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import TrackImage from '../components/trackImage';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



async function fetchTrack(trackName, artistName) {
  
    let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${trackName}&artist=${artistName}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    let data = await response.json();
       return data.track;
   
  }



export default function TrackInfo({ searchParams }) {
  
  const [ trackName, setTrackName ] = useState('');
  const [ artistName, setArtistName ] = useState('');
  const [ album, setAlbum] = useState([]);
  const [ summary, setSummary ] = useState([]);


  async function loadTrack() {
      try {       
        
        if(searchParams.trackName && searchParams.trackName != '')
          setTrackName(searchParams.trackName);

        if(searchParams.artistName && searchParams.artistName != '')
          setArtistName(searchParams.artistName);

        if (trackName != "" && artistName != "")        
        {
            let data = await fetchTrack(trackName, artistName);
            if (data) {
              setAlbum(data.album);
              setSummary(data.wiki.summary)
            }  
           
        }      
        

      } catch (error) {
       // setError(true);
          
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
  
<Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>

    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
   <Link prefetch={false}  href='/tracks' className='text-purple-800 underline '>Track</Link> 
    <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2'  alt="arrow icon" />
    <div className='text-gray-800'>{trackName}</div>
  
  
  
  
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
            
            
           {
             album && <>
                
                <h1 className="text-3xl leading-6 text-gray-800 mb-8">{trackName}</h1>
                

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6'><div><TrackImage  
                                              track={trackName}
                                              artist={album.artist}
                                                                                        
                                            />    </div> 
                <div><h1 className="text-2xl leading-6 text-gray-800 mb-8">Album: {album.title}</h1>
                <h1 className="text-1xl leading-6 text-purple-800 mb-8">Artist: &nbsp;
                
                <Link prefetch={false} className='underline text-purple-800'  shallow={true} href={{
                                                  pathname: '/artist-info',
                                                  query: {
                                                    artistName: album.artist
                                                  }
                                                }}
                                              >{album.artist}</Link>
                
                </h1>
                <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:summary}}></div> 
                </div></div>
                
             </> 
              
             
           }
           


   
</div>

 


            
 
</div>

      </div>

     
       
        
        
  </main>
  
  </>
  );
}
