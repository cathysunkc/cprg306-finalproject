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
  
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=40&format=json`);
  const data = await response.json();
 return data.artists.artist;
 
}

async function fetchSingleArtist(artistName) {
  
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=40&format=json`);
    const data = await response.json();
   return data.artist;
   
  }


export default function ArtistPage() {
 const [ artistName, setArtistName ] = useState("");
  const [trendingArtist, setTrendingArtist] = useState([]);
  const [singleArtist, setSingleArtist] = useState([]);
  const [error, setError] = useState(false);

  async function loadArtist() {
      try {


        if (artistName == "")
        {
             
            const data = await fetchTrendingArtist();
        
          if (!data)
              setTrendingArtist([]);            
          else 
          {
                setSingleArtist([]);
              setTrendingArtist(data);
              
          }
        }
        else 
        {
            
            const data = await fetchSingleArtist();
        
            if (!data)
                setSingleArtist([]);            
            else 
            {
                setTrendingArtist([]);  
                setSingleArtist(data);
            }
        }
        

      } catch (error) {
          //console.error(error);
          setError(true);
      }
  }

  useEffect(() => {       
    loadArtist();
  });

  const handleNameChange = (event) => {
    setArtistName(event.target.value);
};

  const handleSubmit = (event) => {
    console.log(event.target.value);
    setArtistName(event.target.value);
    loadArtist();
    

};
  
   return (
    <>
    <main > 
           
<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row text-gray-500 ml-24"><Link href='/' className='text-purple-800 hover:underline'>Home</Link> <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> Artist</div>

<div className="relative self-center mt-6 rounded-lg p-0.5 flex border">

<div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
<form>
          <input style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'left', margin: '4px'}}
            placeholder="Enter Artist Name"
            type={"text"}
            id="artistName"
            name="artistName" 
          />

        <button type="submit" data-input="#artistName" onClick={(e)=>handleSubmit(e)}><Image src={searchIcon} alt="search icon" width="40" height="40" /></button>
                   
</form>
                               
                    </div>

</div>
</div>

<div className="flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-1 py-3" style={{padding: '2.5em'}}>

  <div className="flex flex-col  flex-1 ">
  
 
            { trendingArtist && 
              <>
              <h1 className="text-3xl leading-6 text-purple-800 mb-8"># Trending Artists</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      {
                        
                        trendingArtist.map((item, index) => (
                             
                              
                                  <div key={index} style={{marginLeft: '10px'}}>{item.name}</div>
                                    
                                
                               
                            ))
                      }
                  </div>     
              </>               
            } 
           {
                        
                        artistName && 
                             
                              
                                  <div style={{marginLeft: '10px'}}>{artistName}</div>
                                    
                                
                               
                           
                      }
   
</div>

        </div></div>

       
        
        
  </main>
  
  </>
  );
}
