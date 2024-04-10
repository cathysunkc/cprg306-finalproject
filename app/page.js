/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect } from 'react';
import TrackImage from "./components/trackImage";
import Countries from "./data/countries.json";
import Image from 'next/image';
import arrowIcon from './images/arrow-icon.png';
import Link from 'next/link';
async function fetchTopArtist(country) {
  
  


  //const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=fb2b87e326084e3dce78c5439ab49c61&format=json');
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=10&format=json`);
  /*const response = await fetch('https://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=10&country=ca&format=json&domain=https://localhost:3000&apikey=07cf4dce757310a5964161bf8a7bed74',{
    method: 'GET', mode: 'no-cors',
  headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": "application/json",
    },
    const data = (response.text());
    console.log(data.message.body.artist_list);
  return data;
});*/
 //const response = await fetch('https://api.deezer.com/chart/0/artists');

  const data = await response.json();
 // return data.artists.artist.slice(0,10);
 return data.topartists.artist;
  //return data.data.slice(0, 10);
}

async function fetchTopTrack(country) {
 
//  const response = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=fb2b87e326084e3dce78c5439ab49c61&format=json');
const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=10&format=json`);
  const data = await response.json();
  console.log({country});
  //return data.tracks.track.slice(0,10);
  return data.tracks.track;
}     


export default function Page() {
  const [country, setCountry] = useState('canada');
  const [countries, setCountries] = useState(Countries);
  const [topArtist, setTopArtist] = useState([]);
  const [topTrack, setTopTrack] = useState([]);
  const [error, setError] = useState(false);

  async function loadTopArtist() {
      try {

          const data = await fetchTopArtist(country);
        
          if (!data)
              setTopArtist([]);            
          else 
              setTopArtist(data);

      } catch (error) {
          //console.error(error);
          setError(true);
      }
  }

  async function loadTopTrack() {
    try {

        const data = await fetchTopTrack(country);
      
        if (!data)
            setTopTrack([]);            
        else 
            setTopTrack(data);

    } catch (error) {
      setError(true);
    }
}

  useEffect(() => {       
    loadTopArtist();
    loadTopTrack();
  });

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
    loadTopArtist();
    loadTopTrack();
};
  
   return (
    <>
    <main > 
           
<div className="py-8 mx-auto">
<div className="sm:flex sm:flex-col sm:align-center">
<div className="relative flex flex-row text-gray-500 ml-24"><Link href='/' className='text-purple-800 hover:underline'>Home</Link>  <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" /> Chart</div>
<div className=" relative self-center mt-6 rounded-lg p-0.5 flex border">

<div style={{width: '100%', alignContent: 'right', width:'100%',float:'right', paddingBottom:'1em'}}>
                <select id='countryList' onChange={handleCountryChange} style={{height: '2em', borderColor: 'black', borderRadius: '3px', float: 'right'}}>{
                          countries.map((item, index) => (

                             
                                    <option key={index} value={Object.values(item).slice(3,4)}>{Object.values(item).slice(3,4)} </option>
                             
                             
                            ))
                          }
                    </select>                   
                    </div>

</div>
</div>
<div className="flex flex-wrap justify-center gap-6  ">
  <div className="flex flex-col  flex-1 ml-24">
    <div className='container'>    
    
            {
              <>
               <h1 className="text-3xl leading-6 text-purple-800 mb-8">Top 10 Artists</h1>
                  <ul>                    
                      {
                        
                        topArtist && topArtist.map((item, index) => (
                             
                              <li key={index} style={{fontSize: 'Larger' }}>
                                  <div style={{display: 'flex',  padding: '15px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', height: '5em'}}>
                                    <div style={{width: '30px', height: '30px', background: 'black', textAlign: 'center', color: 'white', borderRadius: '5px'}}>{index + 1}</div>
                                    <div style={{marginLeft: '10px'}}>{item.name}</div>
                                    
                                  </div>
                              </li> 
                            ))
                      }
                  </ul>     
              </>               
            } 
   

</div>
</div>
<div className="flex flex-col  flex-1 mr-24 ">

  
    <div className='container'>    
    
            {
              <>             
             <h1 className="text-3xl leading-6 text-purple-800 mb-8">Top 10 Tracks</h1>
                  <ul>                    
                      {
                           topTrack && topTrack.map((item, index) => (
                             
                              <li key={index} style={{fontSize: 'Larger', }}>
                                  <div style={{display: 'flex',  padding: '15px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', height: '5em'}}>
                                    <div style={{width: '30px', height: '30px', background: 'black', textAlign: 'center', color: 'white', borderRadius: '5px'}}>{index + 1}</div>
                                    <div  style={{display: 'grid', flexDirection: 'column', }}><TrackImage  
                                              track={item.name}
                                              artist={item.artist.name}
                                              key={item.mbid}                                               
                                            /></div>
                                      <div style={{display: 'grid', flexDirection: 'row'}}>
                                        
                                        <div style={{marginLeft: '10px', flex: 1, width: '100%'}}>{item.name}</div>
                                        <div style={{marginLeft: '10px', flex: 1}} className="text-base">{item.artist.name}</div>
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
