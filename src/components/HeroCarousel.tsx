
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

import image1 from '../../public/inicio/inicio.jpg';
import image2 from '../../public/inicio/inicio3.jpg';
import image3 from '../../public/inicio/inicio4.jpg';

const images = [
  { src: image1, alt: 'Amanecer en un lago del sur de Chile con montañas de fondo' },
  { src: image2, alt: 'Kayakistas remando en un río rodeado de naturaleza en Panguipulli' },
  { src: image3, alt: 'Grupo de personas preparándose para una aventura de rafting' },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className="relative h-full w-full">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.src}
          alt={image.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
