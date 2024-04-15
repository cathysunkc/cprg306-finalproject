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
import TrackInfo from './trackInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const Votes = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handlePageChange: () => handlePageChange('votes'),
  }));

  Votes.displayName = 'votes';

  const [ artistName, setArtistName ] = useState('');
  const [pageName, setPageName] = useState('votes');

  async function loadVotes() {
    try {    
       // let data = await fetchTrendingArtist();            

       // if (data) {   
       //   setArtistContent("");            
       //   setTrendingArtist(data);
       // }         
    } catch (error) {
      //  console.error(error);          
    }
}
 
  useEffect(() => {
    loadVotes();
  });

  function handlePageChange(page, param) {
    setPageName(page);
  
    if (page == 'artistInfo')
      setArtistName(param);
    else
      setArtistName('');
    
    if (page == 'votes') {
      loadVotes();
    }  
  }

  function handleArtistSubmit(e) {
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
    
    {pageName == 'votes'  && 
      <><div className='relative flex flex-row ml-24'>
      <div className='text-gray-800 ml-20 -mt-6'> Votes</div> 
     </div>
        <div className='py-2 mx-auto'>
        <div className='sm:flex sm:flex-col sm:align-center'>
          <div className='relative flex flex-row ml-24'>
            <Link prefetch={false} href='/' className='text-purple-800 underline '></Link>
            <div className='text-gray-800 '></div>
        </div>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
        <div className='w-full max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
          <form onSubmit={handleArtistSubmit} className='flex h-fit w-full flex-row items-center rounded-xl px-1 '>
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


    </div></>
}

{pageName == 'artistInfo'  && 

  <ArtistInfo artistParam={artistName} />} 
 
</>
  );
});

export default Votes;
