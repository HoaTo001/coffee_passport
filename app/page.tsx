"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import placeholder from "../public/background/placeholder.jpg";
import placeholder_2 from "../public/background/placeholder_2.jpg";
import placeholder_3 from "../public/background/placeholder_3.jpg";
import placeholder_4 from "../public/background/placeholder_4.jpg";
import { Bookmark, Menu, Search, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Navbar from "@/components/navbar";

export default function Home() {
  const storeCards = [
    {
      name: "Store 1",
      image: placeholder,
    },
    {
      name: "Store 2",
      image: placeholder_2,
    },
    {
      name: "Store 3",
      image: placeholder_3,
    },
    {
      name: "Store 4",
      image: placeholder_4,
    },
  ];
  const [api, setApi] = React.useState<CarouselApi>();
  const [selectedStoreIndex, setSelectedStoreIndex] = React.useState(0);
  const handleStoreSelect = (index: number) => {
    setSelectedStoreIndex(index);
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white">
      {/* Background Image */}
      <Image
        src={storeCards[selectedStoreIndex].image}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        sizes="100vw"
        className="opacity-70"
      />

      {/* Header */}
      {/* <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-50">
        <div className="text-lg font-bold">GLOBE EXPRESS</div>
        <nav className="hidden md:flex gap-16 overflow-hidden">
          {navItems.map((nav: any, key: number) => (
            <div key={key}>
              <Link
                href={nav.link}
                className="cursor-pointer border-b-4 border-transparent hover:border-yellow-500 transition-colors duration-300"
              >
                {nav.text}
              </Link>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 cursor-pointer" />
            <User className="w-6 h-6 cursor-pointer" />
          </div>
        </nav>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="border-2 rounded-md p-1"><Menu></Menu></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {navItems.map((nav: any, key: number) => <DropdownMenuItem key={key} className="cursor-pointer border-b-4 border-transparent hover:border-yellow-500 transition-colors duration-300">{nav.text}</DropdownMenuItem> )}
              
              
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}
 
      {/* Main Content */}
      <main className="relative flex flex-col items-start justify-between h-full w-full pt-24 min-h-screen">
        <div className="flex items-center pl-6 w-full h-full">
          <div className="max-w-lg">
            <h3 className="text-sm uppercase">Japan Alps</h3>
            <h1 className="text-6xl font-bold">Nagano Prefecture</h1>
            <p className="mt-4 text-gray-300">
              Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas
              tincidunt, velit ac porttitor pulvinar, tortor eros facilisis
              libero.
            </p>
            <Button className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded">
              <Bookmark className="w-4 h-4" />
              Discover Location
            </Button>
          </div>
        </div>

        <div className="flex h-full w-full pl-[800px] pb-20">
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {storeCards.map((store, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                  onClick={() => handleStoreSelect(index)}
                >
                  <Card className="hover:border-yellow-500 border-2 border-white">
                    <CardContent className="relative flex aspect-square items-center justify-center">
                      <Image
                        src={store.image}
                        alt="Store Image"
                        objectFit="cover"
                        layout="fill"
                        className="rounded-lg overflow-hidden"
                      />
                      <span className="text-2xl font-semibold z-50">
                        {store.name}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* <Carousel className="w-full max-w-md" setApi={setApi}>
            <CarouselContent className="-ml-1">
              {storeCards.map((store, index) => (
                <CarouselItem
                  key={index}
                  className="pl-3 overflow-hidden rounded md:basis-1/2 lg:basis-1/3 relative"
                  onClick={() => handleStoreSelect(index)}
                >
                  <Image
                    src={store.image}
                    alt="Store Image"
                    objectFit="cover"
                    layout="fill"
                    className="rounded-lg overflow-hidden ml-3 opacity-70 hover:border-yellow-500 border border-transparent"
                  />
                  <div className="">
                    <Card>
                      <CardContent className="flex items-center justify-center p-20">
                        <span className="text-2xl font-semibold z-50">
                          {store.name}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel> */}
        </div>
      </main>
    </div>
  );
}
