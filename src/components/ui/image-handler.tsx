"use client";

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

// We extend the standard ImageProps to include our custom props
interface ImageHandlerProps extends ImageProps {
  errorMessage: string;
}

export function ImageHandler({ src, alt, errorMessage, ...props }: ImageHandlerProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    console.error(errorMessage);
    setHasError(true);
  };

  if (hasError) {
    // Render a fallback UI if the image fails to load
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground">
        <p>Image failed to load</p>
      </div>
    );
  }

  // Render the Next.js Image component if there is no error
  return (
    <Image
      src={src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
}
