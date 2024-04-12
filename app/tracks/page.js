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


async function fetchTrendingTrack() {
  
  try {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=28&format=json`, {Method: 'POST', cache: 'no-store' });
  const data = await response.json();
  return data.tracks.track;
  } catch (error) {
 //   console.error(error);
    
  } 
}


export default function Tracks() {

  const [ trackName, setTrackName ] = useState('');
  const [trendingTrack, setTrendingTrack] = useState([]);



  async function loadTrack() {
      try {    
          
          
                const data = await fetchTrendingTrack();
            
                if (data) {   
                    setTrackName('');            
                    setTrendingTrack(data);
                }                     
            
            

      } catch (error) {
         // console.error(error);
          
      }
  }

  useEffect(() => {   
    loadTrack();
  });

  function handleSubmit(e) {
    if (e.target.trackName.value && e.target.trackName.value != '')
    {
      e.preventDefault();
      router.push('/track-info?trackName=' + e.target.trackName.value);    
    }
  }


function reloadTrack(trackName)
{
  setTrackName(trackName);
  loadTrack();
}

  
   return (
    <>
    <main > 


<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row ml-24">
<Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>

    <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> <div className='text-gray-800 '>Track</div></>

    
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

<div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
<form onSubmit={handleSubmit}>
          <input style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'left', margin: '4px'}}
            placeholder="Enter Track Name"
            type={"text"}
            id="trackName"
            name="trackName" 
          />

        <button type="submit"><Image src={searchIcon} alt="search icon" width="40" height="40" /></button>
                   
</form>
                               
                    </div>

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
 
            {
              !trackName && <>
                <h1 className="text-3xl leading-6 text-gray-800 mb-8"># Trending Tracks</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      {
                        
                        trendingTrack.map((item, index) => (
                             
                              
                                  <div key={index} style={{marginLeft: '10px'}}>
                                    
                                    <Link  style={{textDecoration: 'underline'}}   href={{
                                                  pathname: '/track-info',
                                                  query: {
                                                    trackName: item.name,
                                                    artistName: item.artist.name,
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

        </div></div>

       
        
        
  </main>
  
  </>
  );
}
