/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


"use client"

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Countries from './data/countries.json';
import TrackImage from './components/trackImage';
import arrowIcon from './images/arrow-icon.png';


async function fetchTopArtist(country) {
//  let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=&limit=5&format=json`, { Method: 'POST', cache: 'no-store' });

  let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/topArtists.json', { Method: 'POST', cache: 'no-store' });
  let data = await response.json();
   return data.topartists.artist;

}

async function fetchTopTrack(country) {
 
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

    async function loadTopArtist() {
      try {
        
        
          let data = await fetchTopArtist(country);
        
          if (data)
              setTopArtist(data);        
              

      } catch (error) {
        
      }
  }

  async function loadTopTrack() {
    try {

        let data = await fetchTopTrack(country);
      
        if (data)
            setTopTrack(data);

    } catch (error) {
       //console.error(error);
    }
}
const handleCountryChange = (event) => {
  setCountry(event.target.value);
  loadTopArtist();
  loadTopTrack();
};

useEffect(() => {
    loadTopTrack();
    loadTopArtist();
});

/***
 * Country Selection
 * <div className=" relative self-center mt-6 rounded-lg p-0.5 flex border">
             <div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
                <select id='countryList' onChange={handleCountryChange} style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'right'}}>{
                          countries.map((item, index) => (                            
                                    <option key={index} value={Object.values(item).slice(3,4)}>{Object.values(item).slice(3,4)} </option>
                            ))
                          }
                    </select>                   
                   </div>
                   </div>
 */

  return (
    <>
      <main> 
        <div className='py-8 mx-auto'>
          <div className='sm:flex sm:flex-col sm:align-center'>
            <div className='relative flex flex-row ml-24'>
              
            
            </div>
          </div>
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
                                <Link prefetch={false} className='underline ml-3' href={{
                                  pathname: '/artist-info',
                                    query: {
                                      artistName: item.name.trim()
                                    }}}>{item.name}</Link>
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
                                        <Link prefetch={false} className='underline' shallow={true} href={{
                                                  pathname: '/track-info',
                                                  query: {
                                                    trackName: item.name,
                                                    artistName: item.artist.name
                                                  }
                                                }}
                                              >
                                          {item.name}</Link></div>
                                        <div className='ml-2 flex-1 text-base'>
                                        <Link prefetch={false} className='underline' shallow={true} href={{
                                                  pathname: '/artist-info',
                                                  query: {
                                                    artistName: item.artist.name
                                                  }
                                                }}
                                              >{item.artist.name}</Link>
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
</div></div>


  </main>
  
  </>
  );
}
