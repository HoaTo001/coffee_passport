"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Star } from "lucide-react";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/app/loading";
import { splitReviews } from "@/lib/string-format";

interface CoffeeStoreDetail {
  name: string;
  google_map_link: string;
  address: string;
  rating: number;
  review: string;
  slug: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [store, setStore] = useState<CoffeeStoreDetail | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  //const [reviews, setReviews] = useState([""]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stores/${params.slug}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        const response_images = await fetch(`/api/images/${params.slug}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          const imgs = await response_images.json();
          setStore(data);
          setImages(imgs.images);
          // console.log(data);
          // console.log(imgs.images)
          // console.log(typeof store?.review)
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!store || images.length === 0) {
    return <Loading />;
  }
  // console.log(store.review)
  // console.log(splitReviews(store.review));
  const reviews = splitReviews(store.review);
  //setReviews(splitReviews(store.review));
  return (
    <div className="relative min-h-screen w-full bg-gray-600/50 text-white overflow-hidden">
      {store ? (
        <>
          <Image
            src={`/stores/${store.slug}_background.jpg`}
            alt="Background Image"
            layout="fill"
            object-fit="cover"
            sizes="100vw"
            className="opacity-40 brightness-50"
          />
          {/* Main Content */}
          <div className="relative flex flex-col lg:flex-row min-h-screen w-full gap-6">
            {/* Image Section */}
            {/* <div className="hidden lg:flex flex-col flex-1 h-full pt-24 min-h-screen items-center"> */}
              <div className="relative flex-1 w-full h-full bg-yellow-500">
                <Image
                  //src={`/background${images[selectedImageIndex]}`}
                  src={`/carousel/${store.slug}/${images[selectedImageIndex]}`}
                  alt="Store Image"
                  objectFit="contain"
                  layout="fill"
                  className="pl-4 flex-1 overflow-hidden h-full w-full"
                  // width={0}
                  // height={0}
                  // sizes="100vh"
                  // style={{ width: "auto", height: "auto" }}
                />
              </div>
              {/* <Carousel className="w-4/5 pt-8 pb-8">
                <CarouselContent>
                  {images.map((img, index) => (
                    <CarouselItem
                      key={index}
                      className="md:basis-1/2 lg:basis-1/4"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <div className="p-1">
                        <Card className="hover:border-yellow-500 border-2 border-white">
                          <CardContent className="relative flex aspect-square items-center justify-center group">
                            <Image
                              //src={`/background${img.link}`}
                              src={`/carousel/${store.slug}/${img}`}
                              alt="Store Image"
                              objectFit="cover"
                              fill
                              className="rounded-lg overflow-hidden"
                            />
                            <div className="absolute inset-0 rounded-md bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center text-white">
                              <span className="text-xl text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex-1"></span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel> */}
            {/* </div> */}

            {/* Text Content */}
            <div className="flex flex-col items-center flex-1 h-full min-h-screen pt-24 pb-4">
              <div className="flex flex-col items-center p-8 pt-0">
                {/* <div className="flex flex-col max-w-lg bg-black bg-opacity-70 rounded-md p-4"> */}
                <h3 className="text-sm uppercase opacity-70 mb-4">
                  {store.address}
                </h3>
                <h1 className="text-6xl font-bold">{store.name}</h1>
                <p className="text-gray-300 text-center mt-4">
                  {/* Mauris malesuada nisi sit amet augue accumsan tincidunt.
                    Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros
                    facilisis libero. */}
                  {reviews[0]}
                </p>
              </div>

              <div className="grid grid-cols-2 w-full flex-1 mr-4 text-center text-gray-700">
                <div className="flex flex-col items-center gap-2 bg-white bg-opacity-45 p-4 rounded-tl-lg">
                  <h3 className="text-3xl font-bold text-gray-600">Drinks</h3>
                  <span>{reviews[1]}</span>
                </div>
                <div className="flex flex-col items-center gap-2 bg-white bg-opacity-45 p-4 rounded-tr-lg">
                  <h3 className="text-3xl font-bold text-gray-600">
                    Service
                  </h3>
                  <span>{reviews[2]}</span>
                </div>
                <div className="flex flex-col items-center gap-2  bg-white bg-opacity-45 p-4 rounded-bl-lg">
                  <h3 className="text-3xl font-bold text-gray-600">
                    Atmosphere
                  </h3>
                  <span>{reviews[3]}</span>
                </div>
                <div className="flex flex-col items-center gap-2  bg-white bg-opacity-45 p-4 rounded-br-lg">
                  <h3 className="text-3xl font-bold text-gray-600">
                    Originality
                  </h3>
                  <span>{reviews[4]}</span>
                </div>
              </div>

              <div className="flex items-center mt-6 gap-6">
                <Link href={store.google_map_link} passHref target="_blank">
                  <Button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded">
                    <Bookmark className="w-4 h-4" />
                    Discover Location
                  </Button>
                </Link>
                <div className="flex items-center gap-1">
                  <span>4.5</span>
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </>
      ) : (
        <Error statusCode={404} />
      )}
    </div>
  );
}
