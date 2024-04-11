
"use client"

import React, { useState, useEffect } from 'react';

async function fetchTrackImage( { track}, { artist }) {
    try {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=fb2b87e326084e3dce78c5439ab49c61&artist=${artist}&track=${track}&format=json`, {Method: 'POST',  cache: 'no-store' });
        const data = await response.json();
        return (data.track.album.image);
    } catch (error) {
        console.error(error);
    }
   
}     

  

export default function TrackImage({ track, artist }) {

    const [trackImage, setTrackImage] = useState([]);
      
    async function loadTrackImage() {
        try {
  
            const data = await fetchTrackImage({track}, {artist });
          
            if (!data)
                setTrackImage([]);            
            else 
                setTrackImage(data);
  
        } catch (error) {
            console.error(error);
        }
    }
  
   
  
    useEffect(() => {       
        loadTrackImage();      
    });



    return (
        <>
                          
                          {
                          trackImage.map((item, index) => (
                             index == 1 &&                             
                                    
                                    <img key={index} src={Object.values(item).slice(0,1)} style={{paddingLeft: '10px', paddingRight: '10px'}}></img>
                                    
                              
                              
                            ))
                      }
   </>
    );
  }