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
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Countries from '../data/countries.json';
import TrackImage from '../components/trackImage';
import arrowIcon from '../images/arrow-icon.png';
import { useUserAuth } from '../_utils/auth-context.js';

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
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
      try {
          // Sign in to Firebase with GitHub authentication
          await gitHubSignIn();
      }
      catch (error) {
          console.log(error);
      }
    }
  
    async function handleSignOut() {
      try {
          // Sign out of Firebase
          await firebaseSignOut();
         
      }
      catch (error) {
          console.log(error);
      }
    }

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
    <>
        <div className="px-6 mx-auto bg-white">
          <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
            <div className="flex items-center flex-1">
              <a href="/"><Image src={logo} priority='false' alt='Music World Logo' className=' w-10/12' /></a> 
              
              { user && 
              <nav className="ml-6 space-x-2 lg:block">
                    <Link href='/' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Home</Link>
                    
                    <Link href='/charts' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Charts</Link>
                    <Link href='/artists' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Artists</Link>
                    <Link href='/tracks' prefetch={false}  className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Tracks</Link>
                    <Link href='../votes' prefetch={false} className='relative w-1/2 bg-white shadow-sm border-2 border-purple-800 text-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap hover:bg-purple-800 hover:text-white ease-linear duration-200  sm:w-auto sm:px-8'>Votes</Link>
                    
                    </nav> } 
              </div>
              <div className="flex items-center flex-end">
              <div className="ml-6 space-x-2 lg:block">
              { user && 
              <button onClick={handleSignOut}
                              className='relative w-1/2 shadow-sm text-white bg-purple-800 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8'>
                              Sign Out
               </button>   
            }
            </div>
            </div></div></div>
        </> 
        {     user ? (
        <div className='py-8 mx-auto'>
          <div className='sm:flex sm:flex-col sm:align-center'>
          <div className='relative flex flex-row ml-24'>
            <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
            <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' /> <div className='text-gray-800 '>Chart</div>
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
  </div>
  </div>
) : (
  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
  <button onClick={handleSignIn} className="text-lg m-2 hover:underline">
         Sign in with GitHub
 </button>
 </div>
 </div>
)}  


  </main>  
  </>
  );
}
