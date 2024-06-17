"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, Menu, Search, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Loading from "./loading";

interface CoffeeStore {
  name: string;
  google_map_link: string;
  address: string;
}

export default function Home() {
  var slugify = require("slugify");
  const [stores, setStores] = React.useState<CoffeeStore[]>([]);
  const [selectedStoreIndex, setSelectedStoreIndex] = React.useState(0);
  const handleStoreSelect = (index: number) => {
    setSelectedStoreIndex(index);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stores", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStores(data); // Update state with fetched data
          console.log(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle case when stores or selectedStoreIndex might be invalid
  if (stores.length === 0 || selectedStoreIndex >= stores.length) {
    return <Suspense fallback={<Loading />} />;
  }

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white">
      {/* Background Image */}
      <Image
        src={`/stores/${slugify(
          stores[selectedStoreIndex].name
        )}_background.jpg`}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        sizes="100vw"
        className="opacity-70"
      />

      {/* Main Content */}
      <main className="relative flex flex-col items-start justify-between h-full w-full pt-24 min-h-screen">
        <div className="flex items-center pl-6 w-full h-full">
          <div className="max-w-lg bg-black bg-opacity-70 rounded-md p-4">
            <h3 className="text-sm uppercase">
              {stores[selectedStoreIndex].address}
            </h3>
            <h1 className="text-6xl font-bold">
              {stores[selectedStoreIndex].name}
            </h1>
            <p className="mt-4 text-gray-300">
              Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas
              tincidunt, velit ac porttitor pulvinar, tortor eros facilisis
              libero.
            </p>
            <Link
              href={stores[selectedStoreIndex].google_map_link}
              passHref
              target="_blank"
            >
              <Button className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded">
                <Bookmark className="w-4 h-4" />
                Discover Location
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex h-full w-full pl-[800px] pb-20">
          <Carousel className="w-full max-w-lg">
            <CarouselContent>
              {stores.map((store, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                  onClick={() => handleStoreSelect(index)}
                >
                  <Card className="hover:border-yellow-500 border-2 border-white">
                    <CardContent className="relative flex aspect-square items-center justify-center group">
                      <Image
                        src={`/stores/${slugify(store.name)}_background.jpg`}
                        alt="Store Image"
                        objectFit="cover"
                        fill
                        className="rounded-lg overflow-hidden"
                      />
                      <div className="absolute inset-0 rounded-md bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity flex items-center justify-center text-white">
                        <span className="text-xl text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex-1">
                          {store.name}
                        </span>
                      </div>
                    </CardContent>  
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
    </div>
  );
}
