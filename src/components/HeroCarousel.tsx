"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

import image1 from '../../public/inicio/inicio.jpg';
import image2 from '../../public/inicio/inicio3.jpg';
import image3 from '../../public/inicio/inicio4.jpg';

const images = [image1, image2, image3];

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
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Carrusel de imágenes de fondo #${index + 1}`}
          fill
          className={`object-fill transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          priority={index === 0}
        />
      ))}
    </div>
  );
}
