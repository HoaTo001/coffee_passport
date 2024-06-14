// StoreCarousel.tsx

import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";

interface Store {
  name: string;
  image: StaticImageData;
}

interface StoreCarouselProps {
  setSelectedStoreIndex: React.Dispatch<React.SetStateAction<number>>;
  storeCards: Store[];
}

const StoreCarousel: React.FC<StoreCarouselProps> = ({
  setSelectedStoreIndex,
  storeCards,
}) => {
  const handleStoreSelect = (index: number) => {
    setSelectedStoreIndex(index);
  };

  return (
    <Carousel className="w-full max-w-md">
      <CarouselContent className="-ml-1">
        {storeCards.map((store, index) => (
          <CarouselItem
            key={index}
            className="pl-3 overflow-hidden rounded-md md:basis-1/2 lg:basis-1/3 relative hover:border-yellow-500 border border-transparent"
            onClick={() => handleStoreSelect(index)}
          >
            <Image
              src={store.image}
              alt="Store Image"
              objectFit="cover"
              layout="fill"
              className="opacity-70 rounded-md"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50">
              <Card>
                <CardContent className="p-6 text-white text-center">
                  <span className="text-2xl font-semibold">{store.name}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default StoreCarousel;
