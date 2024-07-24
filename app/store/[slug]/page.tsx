"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/app/loading";
import { splitReviews } from "@/lib/string-format";
import {prevItem, nextItem} from "@/lib/array";

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
    <div className="relative min-h-screen w-full bg-gray-600 text-white overflow-hidden flex">
      <div className="relative flex flex-1">
        <Image
          src={`/carousel/${store.slug}/${images[selectedImageIndex]}`}
          alt="Store Image"
          objectFit="cover"
          layout="fill"
          className="absolute left-0 brightness-75"
          
        />
        <div className="absolute bottom-12 left-12 flex gap-8">
          <Button className="border-none rounded-full box-border bg-white w-16 h-16" onClick={() => setSelectedImageIndex(prevItem(selectedImageIndex, images.length))}>
            <ChevronLeft size={24} color="#565554"/>
          </Button>
          <Button className="border-none rounded-full box-border bg-white w-16 h-16" onClick={() => setSelectedImageIndex(nextItem(selectedImageIndex, images.length))}>
            <ChevronRight size={24} color="#565554"/>
          </Button>
        </div>
      </div>
      {/* <div className="flex flex-1 bg-gradient-to-tr from-[#c2c0ba] to-[#cdcbc7] justify-center pt-24"> */}
      <div className="flex flex-1 bg-[#c2c0ba] justify-center pt-24">
        <div className="relative flex flex-col w-4/5 gap-6">
          <h1 className="text-7xl text-[#9e9b96] font-bold">{store.name}</h1>
          <span className="text-[#565554]">{store.address}</span>
          <span className="drop-shadow-sm">{reviews[0]}</span>
          <div className="flex items-center gap-6 mt-4">
            <Link href={store.google_map_link} passHref target="_blank">
              <Button className="flex items-center gap-2 px-4 py-2 bg-[#FFE8B7] text-[#565554] rounded shadow-md">
                <Bookmark className="w-4 h-4" />
                Discover Location
              </Button>
            </Link>
            <div className="flex items-center gap-1">
              <span>4.5</span>
              <Star fill="yellow" color="yellow"></Star>
            </div>
          </div>
          <div className="absolute bottom-12 -left-1/3 flex gap-4">
            <Card className="w-[254px] group text-black bg-white hover:bg-[#9A9892] hover:text-white shadow-lg border-none ease-in duration-300 hover:scale-105">
              <CardHeader className="h-full flex flex-col justify-between">
                <CardDescription className="text-[#565554] text-[15px] group-hover:text-white ease-in duration-300">{reviews[1]}</CardDescription>
                <CardTitle className="text-lg text-[#C0B59A] group-hover:text-[#FFE8B7] ease-in duration-300">Drinks</CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-[254px] group text-black bg-white hover:bg-[#9A9892] hover:text-white shadow-lg border-none ease-in duration-300 hover:scale-105">
              <CardHeader className="h-full flex flex-col justify-between">
                <CardDescription className="text-[#565554] text-[15px] group-hover:text-white ease-in duration-300">{reviews[2]}</CardDescription>
                <CardTitle className="text-lg text-[#C0B59A] group-hover:text-[#FFE8B7] ease-in duration-300">Service</CardTitle>
              </CardHeader>
            </Card>
            <Card className="w-[254px] group text-black bg-white hover:bg-[#9A9892] hover:text-white shadow-lg border-none ease-in duration-300 hover:scale-105">
              <CardHeader className="h-full flex flex-col justify-between">
                <CardDescription className="text-[#565554] text-[15px] group-hover:text-white ease-in duration-300">{reviews[3]}</CardDescription>
                <CardTitle className="text-lg text-[#C0B59A] group-hover:text-[#FFE8B7] ease-in duration-300">Atmosphere</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
