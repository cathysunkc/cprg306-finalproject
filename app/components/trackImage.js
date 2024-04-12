
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

async function fetchTrackImage( { track}, { artist }) {
    try {
        let response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=fb2b87e326084e3dce78c5439ab49c61&artist=${artist}&track=${track}&format=json`, {Method: 'POST',  cache: 'no-store' });
        let data = await response.json();
        return (data.track.album.image);
       
    } catch (error) {
     //   console.error(error);
    }
   
}     

  

export default function TrackImage({ track, artist }) {

    const [trackImage, setTrackImage] = useState([]);
      
    async function loadTrackImage() {
        try {
  
            let data = await fetchTrackImage({track}, {artist});
          
            if (data)
                setTrackImage(data);
  
        } catch (error) {
            //console.error(error);
        }
    }
  
   
  
    useEffect(() => {       
        loadTrackImage();      
    });



    return (
        <>
                          
                          {
                          trackImage.map((item, index) => (
                             index == 3 &&                             
                                    
                                    <Image alt='' key={index} src={Object.values(item).slice(0,1)} style={{paddingLeft: '10px', paddingRight: '10px'}} />
                                    
                              
                              
                            ))
                      }
   </>
    );
  }