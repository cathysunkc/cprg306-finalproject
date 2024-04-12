
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import arrowIcon from '../images/arrow-icon.png';


export default function Breadcrumb({pageName, artistName}) {
    
return (
        <>
       
            <Link href='/' prefetch={false} className='text-purple-800 hover:underline '>Home</Link>

            {pageName == 'home' &&  
                <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-gray-400' alt="arrow icon" /> Chart</> }
            {pageName == 'artists' && artistName == '' &&   
                <><Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-purple-400' alt="arrow icon" /> Artist</>}
            {pageName == 'artists' && artistName != '' && 
                <>
                <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-purple-400' alt="arrow icon" /> Artist
                <Image src={arrowIcon} className='w-3.5 h-3.5 mt-1 ml-2 mr-2 text-gray-400' alt="arrow icon" />{artistName}
                </>}
        </>
)};
