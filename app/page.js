/*
 * Web Development 2 - CPRG306D
 * Week 2 - Assignment
 * Name: Cathy Sun
 * Date: 2024 April 8
 */


"use client"

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import Link from 'next/link';
import { useRouter } from 'next/navigation'
import Countries from './data/countries.json';
import TrackImage from './components/trackImage';
import arrowIcon from './images/arrow-icon.png';


async function fetchTopArtist(country) {
  let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=${country}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=5&format=json`, { Method: 'POST', cache: 'no-store' });
  let data = await response.json();
   return data.topartists.artist;

}

async function fetchTopTrack(country) {
 
  let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=${country}&api_key=fb2b87e326084e3dce78c5439ab49c61&limit=5&format=json`, { Method: 'POST', cache: 'no-store' });
  let data = await response.json();
  console.log({country});
  return data.tracks.track;
} 

export default function Page() {
 
    const [country, setCountry] = useState('canada');
    const [countries, setCountries] = useState(Countries);
    const [topArtist, setTopArtist] = useState([]);
    const [topTrack, setTopTrack] = useState([]);

    async function loadTopArtist() {
      try {
          
          let data = await fetchTopArtist(country);
        
          if (data)
              setTopArtist(data);

      } catch (error) {
         // console.error(error);
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

  return (
    <>



    <main > 

        
        <div className="py-8 mx-auto">
                    <div className="sm:flex sm:flex-col sm:align-center">
                    <div className="relative flex flex-row ml-24">
                        
                    <Link prefetch={false} href='/' className='text-purple-800 underline '>Home</Link>


    <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2' alt="arrow icon" />  <div className='text-gray-800'>Chart</div></> 
                        
                    </div>
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
               <h1 className="text-3xl leading-6 text-gray-800 mb-8">Top 5 Artists</h1>
                  <ul>                    
                      {
                        
                        topArtist && topArtist.map((item, index) => (
                             
                              <li key={index} style={{fontSize: 'Larger' }}>
                                  <div style={{display: 'flex',  padding: '15px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', height: '5em'}}>
                                    <div style={{width: '30px', height: '30px', background: 'black', textAlign: 'center', color: 'white', borderRadius: '5px'}}>{index + 1}</div>
                                    <Link prefetch={false} style={{textDecoration: 'underline', marginLeft: '10px'}}  
                                                                        
                                     href={{
    pathname: '/artist-info',
    query: {
      artistName: item.name
    }
  }}
>{item.name}</Link>
                                    
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
             <h1 className="text-3xl leading-6 text-gray-800 mb-8">Top 5 Tracks</h1>
                  <ul>                    
                      {
                           topTrack && topTrack.map((item, index) => (
                             
                              <li key={index} style={{fontSize: 'Larger', }}>
                                  <div style={{display: 'flex',  padding: '15px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', height: '5em'}}>
                                    <div style={{width: '30px', height: '30px', background: 'black', textAlign: 'center', color: 'white', borderRadius: '5px'}}>{index + 1}</div>
                                    <div  style={{display: 'grid', flexDirection: 'column', width:'90px' }}><TrackImage  
                                              track={item.name}
                                              artist={item.artist.name}
                                              key={item.mbid}  
                                                                                          
                                            /></div>
                                      <div style={{display: 'grid', flexDirection: 'row'}}>
                                        
                                        <div style={{marginLeft: '10px', flex: 1, width: '100%'}}>
                                        <Link prefetch={false} style={{textDecoration: 'underline'}}  shallow={true} href={{
                                                  pathname: '/track-info',
                                                  query: {
                                                    trackName: item.name,
                                                    artistName: item.artist.name
                                                  }
                                                }}
                                              >
                                          {item.name}</Link></div>
                                        <div style={{marginLeft: '10px', flex: 1}} className="text-base">
                                        <Link prefetch={false} style={{textDecoration: 'underline'}}  shallow={true} href={{
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
</div></div>


  </main>
  
  </>
  );
}
