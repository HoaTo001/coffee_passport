"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/stores/${params.slug}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStore(data);
          console.log(data);
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.slug]);

  return (
    <div className="relative min-h-screen w-full bg-gray-900 text-white overflow-hidden">
      <div className="relative pt-24 min-h-screen">
        {store ? (
          <>
            <Image
                src={`/stores/${store.slug}_background.jpg`}
                alt="Background Image"
                layout="fill"
                objectFit="cover"
                sizes="100vw"
                className="opacity-40"
              />
              {/* Main Content */}
            <div className="relative flex flex-col lg:flex-row items-start justify-between h-full w-full pt-24">
              {/* Text Content */}
              <div className="flex items-center pl-6 w-full h-full">
              <div className="flex flex-col max-w-lg bg-black bg-opacity-70 rounded-md p-4">
                <h3 className="text-sm uppercase">{store.address}</h3>
                <h1 className="text-6xl font-bold">{store.name}</h1>
                <p className="mt-4 text-gray-300">
                  Mauris malesuada nisi sit amet augue accumsan tincidunt.
                  Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros
                  facilisis libero.
                </p>
                <Link href={store.google_map_link} passHref target="_blank">
                  <Button className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded">
                    <Bookmark className="w-4 h-4" />
                    Discover Location
                  </Button>
                </Link>
              </div>
              </div>
              
              
              {/* Image Section */}
              <div className="hidden lg:block ml-12 w-1/2 pr-6">
                <Image
                  src={`/stores/${store.slug}_1.jpg`}
                  alt="Store Image"
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
            {/* <div className="relative flex flex-col items-start justify-between h-full w-full pt-24 min-h-screen">
              <div className="flex items-center pl-6 w-full h-full">
                <div className="max-w-lg bg-black bg-opacity-70 rounded-md p-4">
                  <h3 className="text-sm uppercase">{store.address}</h3>
                  <h1 className="text-6xl font-bold">{store.name}</h1>
                  <p className="mt-4 text-gray-300">
                    Mauris malesuada nisi sit amet augue accumsan tincidunt.
                    Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros
                    facilisis libero.
                  </p>
                  <Link href={store.google_map_link} passHref target="_blank">
                    <Button className="mt-6 flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded">
                      <Bookmark className="w-4 h-4" />
                      Discover Location
                    </Button>
                  </Link>
                </div>
              </div>
            </div> */}
          </>
        ) : (
          <Error statusCode={404} />
        )}
      </div>
    </div>
  );
}
