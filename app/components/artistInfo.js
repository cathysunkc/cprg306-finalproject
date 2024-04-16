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
import { getArtists, addArtist } from '../_services/artist-vote';
import { useUserAuth } from '../_utils/auth-context';

async function fetchSingleArtist(artistName) {
   
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=&limit=1&format=json`, {Method: 'POST',  cache: 'no-store' });
    //return data.artist;
    let value = artistName.replace(/ /g, '').replace(/,/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${value}.json`;
    let response = await fetch(url, {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.topalbums;    
   
}


async function fetchArtistAlbums(artistName) { 
     
    let value = artistName.replace(/ /g, '').replace(/,/g, '');
    let url = `https://raw.githubusercontent.com/cathysunkc/cprg306-finalproject/master/app/data/artists/${value}.json`;
    //let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&artist=${artistName}&limit=9&api_key=51de025812af79cb70f4a872936181a0&format=json`, {Method: 'POST',  cache: 'no-store' });
    let response = await fetch(url , {Method: 'POST', cache: 'no-store' });
    let data = await response.json();
    return data.topalbums.album;  
   
}

export default function ArtistInfo({ artistParam }) {
  const router = useRouter();
  const [ artistName, setArtistName ] = useState('');
  const [ artistMBID, setArtistMBID ] = useState('');
  const [ artistContent, setArtistContent] = useState('');
  const [ artistAlbums, setArtistAlbums] = useState([]);
  const [ error, setError] = useState(false);
  const { user } = useUserAuth();

  async function loadArtist() {
      try { 

        //if(searchParams.artistName && searchParams.artistName != '')
        setArtistName(artistParam);

        if (artistName != '')        
        {
            let data = await fetchSingleArtist(artistName);
            if (data) {             
              setArtistContent(data.bio.summary);
              setArtistMBID(data.bio.mbid);
            }               
            
            let data2 = await fetchArtistAlbums(artistName);
            if (data2) {             
              setArtistAlbums(data2);              
            }             
        }             
      } 
      catch (error) { 
        //console.log(error);
        setError(true);
      }
  }

  useEffect(() => {   
     loadArtist();
  });

  //Create an event handler function to add new artist vote
  const handleVoteArtist = async () => { 
    const artist = {           
        artistName,
        artistMBID
          };  
    const artistID = await addArtist(user.uid, artist);
    alert('Vote success!');
  };
  
  
  return (
    <>
     <div className='relative flex flex-row ml-24'>
        <div className='text-gray-800 ml-20 -mt-6'> Artists</div> 
       </div>

      <div className="py-2 mx-auto">
      

<div className='flex flex-wrap justify-center gap-6 ml-20 mr-20 mt-5 mb-5 bg-white rounded p-10'>
  <div className='flex flex-col  flex-1 '>
      { error && <div className='text-gray-800'>No Record Found</div> }         
            
      {  !error && artistContent && <>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <div><h1 className='text-3xl leading-6 text-gray-800 mb-8'>{artistName}</h1></div>
            <div>
            <button onClick={()=>handleVoteArtist()}
                              className='relative w-1/8 shadow-sm text-white bg-yellow-400 rounded-md m-1 py-2 text-s font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8'>
                              Vote</button></div>
           
            </div>
           <div className='justify-normal text-gray-800' dangerouslySetInnerHTML={{__html:artistContent}}></div>   
          </> }
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
                                    <img key={index} alt='image' src={Object.values(item).slice(0,1)} className='px-3'></img>
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


    
 
  </>
  );
}
