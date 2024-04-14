/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */



"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TrackImage from '../components/trackImage';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';

async function fetchTrack(trackName, artistName) {
    
    let value = trackName.replace(/[\s\,\'\.\(\)]/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/tracks/${value}.json`;
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${trackName}&artist=${artistName}&api_key=&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    let response = await fetch(url, {Method: 'POST', cache: 'no-store' });
    
    let data = await response.json();
    return data.track;      
  }

  

export default function TrackInfo({ searchParams }) {

  const [ trackName, setTrackName ] = useState('');
  const [ artistName, setArtistName ] = useState('');
  const [ album, setAlbum] = useState([]);
  const [ summary, setSummary ] = useState([]);
  const [ error, setError ] = useState(false);

   async function loadTrack(paramTrack) {
      try {       
        //const paramTrackName =  query.trackName;
        //if(paramTrackName && paramTrackName != '')
            setTrackName(paramTrack);
          
        if (trackName != '' )        
        {
            let data = await fetchTrack(trackName, artistName);
            setAlbum(data.album);  
            setSummary(data.wiki.summary);         
        }      
      } 
      catch (error) {
        setError(true);          
      }
  }


  useEffect(() => {   
    loadTrack(searchParams.trackName);
    
  });

  return (
  <>
  <main>   
  <div className='py-8 mx-auto'>
    <div className='sm:flex sm:flex-col sm:align-center'>
      <div className='relative flex flex-row ml-24'>  
        <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
        <Link prefetch={false}  href='/tracks' className='text-purple-800 underline '>Track</Link> 
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2'  alt='arrow icon' />
        <div className='text-gray-800'>{trackName}</div>
      </div>
    </div>
  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
    <div className='flex flex-col  flex-1'>
    { error && <div className='text-gray-800'>No Record Found</div> }           
    { !error && album && <>
      <div className='text-3xl leading-6 text-gray-800 mb-8'>{trackName}</div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6'><div>
              <TrackImage  
                            track={trackName}
                            artist={album.artist}
                            key={album.mbid}  
                                                                        
                          />
        </div> 
        <div>
          <div className='text-2xl leading-6 text-gray-800 mb-8'>Album: {album.title}</div>
            <div className='text-1xl leading-6 text-purple-800 mb-8'>Artist: &nbsp;
              <Link prefetch={false} className='underline text-purple-800' shallow={true} href={{
                    pathname: '/artist-info',
                    query: {
                      artistName: album.artist
                    }
                  }}
                >{album.artist}</Link>
            </div>
            <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:summary}}></div> 
            </div>
          </div>
        </> 
      }
      </div>
    </div>
  </div>  
  </main>  
  </>
  );
}
