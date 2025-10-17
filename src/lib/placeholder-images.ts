import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl?: string; // Optional: for single image entries
  imageUrls?: string[]; // Optional: for multi-image entries (like services)
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
