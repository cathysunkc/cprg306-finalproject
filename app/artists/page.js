/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import searchIcon from '../images/search-icon.svg';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';

async function fetchTrendingArtist() {
  
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=40&format=json`);
  const data = await response.json();
 // return data.artists.artist.slice(0,10);
 return data.topartists.artist;
  //return data.data.slice(0, 10);
}


export default function Page() {

  const [topArtist, setTopArtist] = useState([]);
  const [error, setError] = useState(false);

  async function loadTopArtist() {
      try {

          const data = await fetchTopArtist(country);
        
          if (!data)
              setTopArtist([]);            
          else 
              setTopArtist(data);

      } catch (error) {
          //console.error(error);
          setError(true);
      }
  }

  useEffect(() => {       
    loadTopArtist();
  });

  const handleSubmit = (event) => {
    setCountry(event.target.value);
    loadTopArtist();
    loadTopTrack();
};
  
   return (
    <>
    <main > 
           
<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row text-gray-500 ml-24"><Link href='/' className='text-purple-800 hover:underline'>Home</Link> <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> Artist</div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

<div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
<form onSubmit={handleSubmit}>
          <input style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'left', margin: '4px'}}
            placeholder="Enter Artist Name"
            type={"text"}
            id="artistName"
            name="artistName"
          />
        <a class="w-10 h-full text-[#fff] flex justify-center items-center rounded-full" href="/en/search?q=">
        <Image src={searchIcon} alt="search icon" width="40" height="40" /></a>
                   
</form>
                               
                    </div>

</div>
</div>
<div className="flex flex-wrap justify-center gap-6  ">
  <div className="flex flex-col  flex-1 ml-24">
    <div className='container'>    
    
            {
              <>
               <h1 className="text-3xl leading-6 text-purple-800 mb-8">Top 10 Artists</h1>
                  <ul>                    
                      {
                        
                        topArtist && topArtist.map((item, index) => (
                             
                              <li key={index} style={{fontSize: 'Larger' }}>
                                  <div style={{display: 'flex',  padding: '15px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', height: '5em'}}>
                                    <div style={{width: '30px', height: '30px', background: 'black', textAlign: 'center', color: 'white', borderRadius: '5px'}}>{index + 1}</div>
                                    <div style={{marginLeft: '10px'}}>{item.name}</div>
                                    
                                  </div>
                              </li> 
                            ))
                      }
                  </ul>     
              </>               
            } 
   

</div>
</div>
<div className="flex flex-col  flex-1 mr-24 ">

  
    <div className='container'>    
    
            {
              <>             
             <h1 className="text-3xl leading-6 text-purple-800 mb-8">Top 10 Tracks</h1>
                  
              </>               
            } 
        </div>

  </div> 
        </div></div>

       
        
        
  </main>
  
  </>
  );
}
