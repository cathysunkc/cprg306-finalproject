/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import Header from '../components/header';
import logo from '../images/music_world_logo.png';
import TrackInfo from './trackInfo';
import searchIcon from '../images/search-icon.svg';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


async function fetchTrendingTrack() {
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopTracks&api_key=&limit=28&format=json`, {Method: 'POST', cache: 'no-store' });
    let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/trendingTracks.json', {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.tracks.track;  
}

export default function Tracks() {
  const router = useRouter();
  
  const [ trendingTrack, setTrendingTrack] = useState([]);
  const [ pageName, setPageName] = useState('tracks');
  const [ trackName, setTrackName ] = useState('');


  async function loadTrack() {

      try {    
        let data = await fetchTrendingTrack();
            
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
  }, []);

  function handleSubmit(e) {
    if (e.target.trackName.value && e.target.trackName.value != '') {
      e.preventDefault();
      setPageName('trackInfo')
      setArtistName(e.target.trackName.value);    
    }
  }

  function handlePageChange(page, param) {
    setPageName(page);
  
    if (page == 'trackInfo')
      setTrackName(param);
    else
      setTrackName('');  
  
  }

  return (
    <>
    <main >   

    {pageName == 'tracks'  && 
   
    <div className='py-2 mx-auto'>
      <div className='sm:flex sm:flex-col sm:align-center'>
        <div className='relative flex flex-row ml-24'>
          <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
          <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' /> <div className='text-gray-800 '>Track</div>
        </div>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
          <div className='w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
            <form onSubmit={handleSubmit} className='flex h-fit w-full flex-row items-center rounded-xl px-1 '>
              <input className='h-10 w-full resize-none bg-transparent px-2 text-base sm:text-sm  transition-all duration-300' 
                placeholder='Enter Track Name'
                type={'text'}
                id='trackName'
                name='trackName' 
              />
            <button type='submit' className='flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25'><Image src={searchIcon} alt='search icon' className='lucide lucide-corner-down-left shrink-0 -ml-px' /></button>
        </form>
        </div>
      </div>
    </div>
    <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-10'>
      <div className='flex flex-col  flex-1 '>
        {
              !trackName && <>
                <h1 className='text-3xl leading-6 text-gray-800 mb-8'># Trending Tracks</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      { 
                        trendingTrack.map((item, index) => (
                          <div key={index} className='m-3'>
                              <button onClick={()=>handlePageChange('trackInfo', item.name)} className='underline'>{item.name}</button>
                          </div>
                        ))
                      }
                  </div>     
              </>               
        } 
      </div>
    </div>
  </div> 
  }

{pageName == 'trackInfo'  && <TrackInfo trackParam={trackName} />} 


  </main>  
  </>
  );
}
