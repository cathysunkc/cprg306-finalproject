/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


"use client"

import React, { useState, useEffect } from 'react';
import logo from '../images/music_world_logo.png';
import Image from 'next/image';
import Header from '../components/header';
import ArtistInfo from '../components/artistInfo';
import TrackInfo from '../components/trackInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Countries from '../data/countries.json';
import TrackImage from '../components/trackImage';
import arrowIcon from '../images/arrow-icon.png';


async function fetchTopArtist() {
//  let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=&limit=5&format=json`, { Method: 'POST', cache: 'no-store' });

  let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/topArtists.json', { Method: 'POST', cache: 'no-store' });
  let data = await response.json();
   return data.topartists.artist;

}

async function fetchTopTrack() {
 
  // let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=&limit=5&format=json`, { Method: 'POST', cache: 'no-store' });
  let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/topTracks.json', { Method: 'POST', cache: 'no-store' });
  let data = await response.json();
 // console.log({country});
  return data.tracks.track;
} 

export default function Page() {
    const router = useRouter();
    const [country, setCountry] = useState('canada');
    const [countries, setCountries] = useState(Countries);
    const [topArtist, setTopArtist] = useState([]);
    const [topTrack, setTopTrack] = useState([]);
    
    const [pageName, setPageName] = useState('charts');
    const [artistName, setArtistName] = useState('');
    const [trackName, setTrackName] = useState('');


    async function loadTopArtist() {
      try {
        
          let data = await fetchTopArtist();
        
          if (data)
              setTopArtist(data);        
              

      } catch (error) {
        
      }
  }

  async function loadTopTrack() {
    try {
        
        let data = await fetchTopTrack();
      
        if (data)
            setTopTrack(data);

    } catch (error) {
       //console.error(error);
    }
}

function handlePageChange(page, param) {
  setPageName(page);

  if (page == 'artistInfo')
    setArtistName(param);
  else
    setArtistName('');

  if (page == 'trackInfo')
    setTrackName(param);
  else
    setTrackName('');
}

useEffect(() => {
  
    loadTopTrack();
    loadTopArtist();
});


  return (
    <>
     <div className='relative flex flex-row ml-24'>
     {pageName == 'charts'  &&      <div className='text-gray-800 ml-20 -mt-6'> Charts</div> }
       </div>
    {pageName == 'charts'  && 
        <div className='py-2 mx-auto'>
          
      <div className='flex flex-wrap justify-center gap-6'>
        <div className='flex flex-col flex-1 ml-24'>
          <div className='pt-10'>    
          {
              <>
               <h1 className='text-3xl leading-6 text-gray-800 mb-8'>Top 5 Artists</h1>
                  <ul>                    
                      { topArtist && topArtist.map((item, index) => (
                          <li key={index} className='text-xl'>
                             <div className=' flex p-4 m-1 rounded bg-white h-28 '>
                              <div className=' w-8 h-8 bg-black text-white rounded text-center'>{index + 1}</div>
                                   
                                   
                                   <div className='grid flex-row'>
                                    <div className="ml-2 flex-1 text-l"><button onClick={()=>handlePageChange('artistInfo', item.name)} className='underline ml-3' >{item.name}</button></div>
                                    <div className="ml-2 flex-1 text-base"></div></div>

                                </div>
                              </li> 
                            ))
                      }
                  </ul>     
              </>               
            } 
        </div>
      </div>
      <div className='flex flex-col flex-1 mr-24'>
        <div className='pt-10'>    
        {
         <>             
           <h1 className='text-3xl leading-6 text-gray-800 mb-8'>Top 5 Tracks</h1>
              <ul>                    
                      {
                           topTrack && topTrack.map((item, index) => (
                             
                              <li key={index} className='text-xl'>
                                  <div className=' flex p-4 m-1 rounded bg-white h-28 '>
                                    <div className=' w-8 h-8 bg-black text-white rounded text-center'>{index + 1}</div>
                                    <div className=' grid flex-col w-24'><TrackImage  
                                              track={item.name}
                                              artist={item.artist.name}
                                              key={item.mbid}  
                                                                                          
                                            /></div>
                                      <div style={{display: 'grid', flexDirection: 'row'}}>
                                        
                                      <div className='ml-2 flex-1 text-l'>
                                          <button onClick={()=>handlePageChange('trackInfo', item.name)} className='underline'>{item.name}</button>
                                      </div>
                                      <div className='ml-2 flex-1 text-base'>
                                          <button onClick={()=>handlePageChange('artistInfo', item.artist.name)} className='underline'>{item.artist.name}</button>
                                      </div>
                                      </div>
                                  </div>
                              </li> 
                            ))
                      }
                  </ul>     
              </>               
            }  
        </div>
    </div> 
  </div>
  </div>
}

{ pageName == 'artistInfo'  && <ArtistInfo artistParam={artistName} />}
{ pageName == 'trackInfo'  && <TrackInfo trackParam={trackName} />}

 
  </>
  );
}
