/*
 * Web Development 2 - CPRG306D
 * Final Project
 * Name: Cathy Sun
 * Date: 2024 April 13
 */

"use client"

import React, { useState, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import arrowIcon from '../images/arrow-icon.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


async function fetchSingleArtist(artistName) {
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    //return data.artist;
    let response = await fetch(`https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${artistName.replace(/ /g, '').replace(/,/g, '')}.json`, {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.topalbums;        
}


async function fetchArtistAlbums(artistName) {    
  //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${artistName}&limit=9&api_key=51de025812af79cb70f4a872936181a0&format=json`, {Method: 'POST',  cache: 'no-store' });
  let response = await fetch(`https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${artistName.replace(/ /g, '').replace(/,/g, '')}.json`);
  let data = await response.json();
  return data.topalbums.album;
}

export default function ArtistInfo({ searchParams }) {
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [artistContent, setArtistContent] = useState('');
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [error, setError] = useState(false);


  async function loadArtist() {
      try { 

        if(searchParams.artistName && searchParams.artistName != '')
          setArtistName(searchParams.artistName);

        if (artistName != '')        
        {
            let artist = await fetchSingleArtist(artistName);
            if (artist) {             
              setArtistContent(artist.bio.summary);
            }    
            
            let albums = await fetchArtistAlbums(artistName);
            if (albums) {             
              setArtistAlbums(albums);
            } 
        }             
      } 
      catch (error) {
        setError(true);
      }
  }

  useEffect(() => {   
    loadArtist();
  });
  
  
  return (
    <>
    <main> 
      <div className="py-8 mx-auto">
      <div className="sm:flex sm:flex-col sm:align-center">
      <div className="relative flex flex-row ml-24">
      <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> 
        <Link prefetch={false} href='/artists' className='text-purple-800 underline '> Artist</Link> 
        <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt='arrow icon' />
        <div className='text-gray-800'>{artistName}</div>
    </div>
    </div>

<div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
      { error && <div className='text-gray-800'>No Record Found</div> }         
            
      {
        !error && artistContent && <>
            <h1 className='text-3xl leading-6 text-gray-800 mb-8'>{artistName}</h1>
            <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:artistContent}}></div>   
          </> 
        }
  </div>
 </div>
</div>
    {
      !error && artistAlbums && <>
      <div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-0 mb-10 bg-white rounded p-10'>
        <div className='flex flex-col flex-1 '>
          <h1 className='text-3xl leading-6 text-gray-800 mb-8'>Top Albums</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6'>  
                    {                       
                      artistAlbums.map((item, index) => (
                          <div key={index} className='text-center'>
                                {  
                                    item.image.map((item, index) => (
                                    index == 2 &&                             
                                    <img key={index} src={Object.values(item).slice(0,1)} className='px-3'></img>
                              ))}  
                               <div className='w-5/6 text-base text-gray-800'>{item.name}</div>
                         </div>
                       ))
                    }                    
                </div> 
                </div>
              </div>    
            </>               
    } 
  </main>  
  </>
  );
}
