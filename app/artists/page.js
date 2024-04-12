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


async function fetchTrendingArtist() {
  
  try {
 //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=&limit=28&format=json`, {Method: 'POST', cache: 'no-store' });
  let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/trendingArtists.json');
  let data = await response.json();
  return data.artists.artist;
  } catch (error) {
    //console.error(error);
    
  } 
}


export default function Artists() {
  
  const [ artistName, setArtistName ] = useState('');
  const [trendingArtist, setTrendingArtist] = useState([]);
  const [artistContent, setArtistContent] = useState("");


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
  });

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
    <main > 


<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row ml-24">
<Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>

    <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" />  <div className='text-gray-800'>Artist</div></>

    
  </div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

<div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
<form onSubmit={handleSubmit}>
          <input style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'left', marginLeft:'10px', margin: '4px'}}
            placeholder="Enter Artist Name"
            type={"text"}
            id="artistName"
            name="artistName" 
          />

        <button type="submit"><Image src={searchIcon} alt="search icon" width="40" height="40" /></button>
                   
</form>
                               
                    </div>

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
 
            {
              !artistName && <>
                <h1 className="text-3xl leading-6 text-gray-800 mb-8"># Trending Artists</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      {
                        
                         trendingArtist.map((item, index) => (
                             
                              
                                  <div key={index} style={{marginLeft: '10px'}}>
                                    
                                    <Link prefetch={false} style={{textDecoration: 'underline'}}  shallow={true} href={{
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

        </div></div>

       
        
        
  </main>
  
  </>
  );
}
