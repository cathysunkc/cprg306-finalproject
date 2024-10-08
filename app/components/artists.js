/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */


"use client"

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import searchIcon from '../images/search-icon.svg';
import arrowIcon from '../images/arrow-icon.png';
import ArtistInfo from './artistInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import logo from '../images/music_world_logo.png';


async function fetchTrendingArtist() {
  
 
  //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&api_key=&limit=28&format=json`, {Method: 'POST', cache: 'no-store' });
    let response = await fetch('https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/trendingArtists.json', {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.artists.artist;
  
}

const Artists = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handlePageChange: () => handlePageChange('artists'),
  }));

  Artists.displayName = 'artists';
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [trendingArtist, setTrendingArtist] = useState([]);
  const [artistContent, setArtistContent] = useState('');
  const [pageName, setPageName] = useState('artists');

 
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

  function handlePageChange(page, param) {
    setPageName(page);
  
    if (page == 'artistInfo')
      setArtistName(param);
    else
      setArtistName('');
    
    if (page == 'artists') {
      loadArtist();
    }
  
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target.artistName.value && e.target.artistName.value != '')
    {
      setPageName('artistInfo');
      setArtistName(e.target.artistName.value);
    }
    else {
      alert('Please enter the artist name!');      
    }
  
  }


  
   return (
    <>
    <div className='relative flex flex-row ml-24'>
        <div className='text-gray-800 ml-20 -mt-6'> Artists</div> 
       </div>
    {pageName == 'artists'  && 
      
        <div className='py-2 mx-auto'>
        <div className='sm:flex sm:flex-col sm:align-center'>
          <div className='relative flex flex-row ml-24'>
            <Link prefetch={false} href='/' className='text-purple-800 underline '></Link>
            <div className='text-gray-800 '></div>
        </div>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
        <div className='w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
          <form onSubmit={handleSubmit} className='flex h-fit w-full flex-row items-center rounded-xl px-1 '>
              <input className='h-10 w-full resize-none bg-transparent px-2 text-base sm:text-sm  transition-all duration-300' 
                placeholder='Enter Artist Name'
                type={'text'}
                id='artistName'
                name='artistName' 
              />
          <button type='submit' className='flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25'>
            <Image src={searchIcon} alt='search icon' className='lucide lucide-corner-down-left shrink-0 -ml-px' /></button>
          </form>
          </div>
        </div>
      </div>

  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-10 bg-white rounded p-10'>
    <div className='flex flex-col  flex-1 '>
            {
              !artistName && 
                <>
                <h1 className='text-3xl leading-6 text-gray-800 mb-8'># Trending Artists</h1>
                 <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>                      
                      {
                        
                         trendingArtist.map((item, index) => (
                            <div key={index} className=' m-3'>                              
                                   <button onClick={()=>handlePageChange('artistInfo', item.name)} className='underline'>{item.name}</button>
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

{pageName == 'artistInfo'  && 

  <ArtistInfo artistParam={artistName} />} 
 
</>
  );
});

export default Artists;
