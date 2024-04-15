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
import ArtistInfo from './artistInfo';
import Link from 'next/link';


async function fetchTrack(trackName, artistName) {
    
    let value = trackName.replace(/[\s\,\'\.\(\)]/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/tracks/${value}.json`;
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&track=${trackName}&artist=${artistName}&api_key=&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    let response = await fetch(url, {Method: 'POST', cache: 'no-store' });
    
    let data = await response.json();
    return data.track;      
  }

  

export default function TrackInfo({ trackParam }) {


  const [ album, setAlbum] = useState([]);
  const [ summary, setSummary ] = useState([]);
  const [ error, setError ] = useState(false);
  const [ trackName, setTrackName ] = useState('');
  const [ artistName, setArtistName ] = useState('');
  const [ pageName, setPageName] = useState('trackInfo');


   async function loadTrack() {
      try {       
        //const paramTrackName =  query.trackName;
        //if(paramTrackName && paramTrackName != '')
            setTrackName(trackParam);
          
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
    loadTrack();    
  });

  return (
  <>
  {pageName == 'trackInfo' && 
    <div className='relative flex flex-row ml-24'>
        <div className='text-gray-800 ml-20 -mt-6'> Tracks</div> 
       </div>}

  {pageName == 'trackInfo'  && 
    
  <div className='py-2 mx-auto'>
    
  <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
    <div className='flex flex-col  flex-1'>
    { error  && <div className='text-gray-800'>No Record Found</div> }           
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
               <button onClick={()=>handlePageChange('artistInfo', album.artist)} className='underline'>{album.artist}</button>
                                      
            </div>
            <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:summary}}></div> 
            </div>
          </div>
        </> 
      } 
      </div>
    </div>
  </div> 
}
{ pageName == 'artistInfo'  && <ArtistInfo artistParam={artistName} />}


  
  </>
  );
}