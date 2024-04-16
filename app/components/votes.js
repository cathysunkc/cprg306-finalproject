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
import { getArtists, addArtist } from '../_services/artist-vote';
import { getTracks, addTrack } from '../_services/track-vote';
import { useUserAuth } from '../_utils/auth-context';

const Votes = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handlePageChange: () => handlePageChange('votes'),
  }));

  Votes.displayName = 'votes';
  
  const [ artistName, setArtistName ] = useState('');
  const [ trackName, setTrackName ] = useState('');
  const [ pageName, setPageName] = useState('votes');
  const [ artistVotes, setArtistVotes] = useState([]);
  const [ trackVotes, setTrackVotes] = useState([]);
  const { user } = useUserAuth();

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

  function handleTrackSubmit(e) {
    e.preventDefault();
    if (e.target.trackName.value && e.target.trackName.value != '') {
      
      setPageName('trackInfo');
      setTrackName(e.target.trackName.value);    
    }
    else {
      alert('Please enter the track name!');      
    }
    
  }

  async function loadVotes() {
    if (user)
    {
        const data1 = await getArtists(user.uid);
        setArtistVotes(data1);

        const data2 = await getTracks(user.uid);
        setTrackVotes(data2);
    }
      
 };

  useEffect(() => {
    loadVotes();
  });

  
  return ( 
    <>
     <div className='relative flex flex-row ml-24'>
     {pageName == 'votes'  &&  <div className='text-gray-800 ml-20 -mt-6'> Votes</div> }
       </div>
    {pageName == 'votes'  && 
        <div className='py-2 mx-auto'>
          
      <div className='flex flex-wrap justify-center gap-6'>
        <div className='flex flex-col flex-1 ml-24'>
        <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
        <div className=' max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
          <form onSubmit={handleArtistSubmit} className='flex h-fit  flex-row items-center rounded-xl px-1 '>
              <input className='h-10  resize-none bg-transparent px-2 text-base sm:text-sm  transition-all duration-300' 
                placeholder='Search Artist to Vote'
                type={'text'}
                id='artistName'
                name='artistName' 
              />
          <button type='submit' className='flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25'>
            <Image src={searchIcon} alt='search icon' className='lucide lucide-corner-down-left shrink-0 -ml-px' /></button>
          </form>
          </div>          
        </div>
          <div className='pt-10'>    
          {
              <>
               {  artistVotes && <h1 className=' text-lg leading-6 text-gray-800 mb-4'>Latest Vote Records - Artists</h1> }
                  <ul>                    
                      { artistVotes && artistVotes.map((item, index) => (
                          <li key={index} className='text-xl'>
                               <div className=' flex p-4 m-1 rounded bg-white h-28 '>
                                    <div className=' w-8 h-8 bg-black text-white rounded text-center'>{index + 1}</div>
                                   
                                   
                                   <div className='grid flex-row'>
                                    <div className="ml-2 flex-1 text-base">
                                      <button onClick={()=>handlePageChange('artistInfo', item.artistName)} className='underline ' >{item.artistName}</button></div>
                                    <div className="ml-2 flex-1 text-sm text-gray-800">Voted by: {item.userName}</div>
                                    <div className="ml-2 flex-1 text-sm text-gray-800">{item.voteDate}</div></div>
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
      <div className='relative self-center bg-white mt-6 rounded-lg p-0.5 flex border'>
          <div className='max-w-md space-y-4 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4'>
            <form onSubmit={handleTrackSubmit} className='flex h-fit  flex-row items-center rounded-xl px-1 '>
              <input className='h-10 resize-none bg-transparent px-2 text-base sm:text-sm  transition-all duration-300' 
                placeholder='Search Track to Vote'
                type={'text'}
                id='trackName'
                name='trackName' 
              />
            <button type='submit' className='flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25'><Image src={searchIcon} alt='search icon' className='lucide lucide-corner-down-left shrink-0 -ml-px' /></button>
        </form>
        </div>
      </div>
        <div className='pt-10'> 
           
        {
         <> 
                     
                   {  trackVotes && <h1 className=' text-lg leading-6 text-gray-800 mb-4'>Latest Vote Records - Tracks</h1> }
              <ul>                    
                      {
                           trackVotes && trackVotes.map((item, index) => (
                             
                              <li key={index} className='text-xl'>
                                  <div className=' flex p-4 m-1 rounded bg-white h-28 '>
                                    <div className=' w-8 h-8 bg-black text-white rounded text-center'>{index + 1}</div>
                                    
                                    <div className='grid flex-row'>
                                        
                                      <div className='ml-2 flex-1 text-base'>
                                          <button onClick={()=>handlePageChange('trackInfo', item.name)} className='underline'>{item.trackName}</button>
                                      </div>
                                      <div className='ml-2 flex-1 text-sm text-gray-800'>Voted by: {item.userName}</div>
                                      <div className="ml-2 flex-1 text-sm text-gray-800">{item.voteDate}</div>
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
});

export default Votes;
