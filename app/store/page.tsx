"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import React, { Suspense } from "react";
import { removeDots, toLowerCase } from "@/lib/string-format";
import ReactPaginate from "react-paginate";
import Loading from "../loading";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/sidebar";
import NextButton from "@/components/next-button";
import PrevButton from "@/components/prev-button";

interface CoffeeStore {
  name: string;
  google_map_link: string;
  address: string;
  slug: string;
}

export default function Store() {
  var slugify = require("slugify");
  const [stores, setStores] = React.useState<CoffeeStore[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [searchInput, setSearchInput] = React.useState("");
  const storesPerPage = 6;

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

  // Handle case when stores might be invalid
  // Handle case when stores or selectedStoreIndex might be invalid
  if (stores.length === 0) {
    return <Loading />;
  }

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const offset = currentPage * storesPerPage;
  const currentStores = filteredStores.slice(offset, offset + storesPerPage);
  const pageCount = Math.ceil(stores.length / storesPerPage);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#c2c0ba] to-[#b4b0a9] text-white">
      {/* Background Image */}
      {/* <Image
        src={`/background/background.jpg`}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        className="opacity-70"
      /> */}
      <Sidebar setSearchInput={setSearchInput} />
      {/* Main Content */}
      <div className="relative flex flex-col items-start justify-between h-full w-full pt-28 pl-32 min-h-screen">
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full ml-16">
            {currentStores.map((store, index) => (
              <div key={index} className="flex items-center justify-center">
                <Link href={`/store/${store.slug}`}>
                  <Card className="hover:border-[#FFE8B7] border-2 border-white relative size-64 cursor-pointer aspect-square rounded-full object-cover">
                    <CardContent className="relative flex items-center aspect-square rounded-full object-cover justify-center group">
                      <Image
                        src={`/stores/${slugify(
                          toLowerCase(removeDots(store.name))
                        )}_background.jpg`}
                        alt="Store Image"
                        objectFit="cover"
                        fill
                        className="rounded-full overflow-hidden"
                      />
                      <div className="absolute inset-0 rounded-full bg-[#565554] bg-opacity-0 group-hover:bg-opacity-70 transition-opacity flex items-center justify-center text-white">
                        <span className="text-xl text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex-1">
                          {store.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center w-full py-4">
          <ReactPaginate
            previousLabel={<PrevButton />}
            nextLabel={<NextButton />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            className="flex items-center space-x-2"
            activeLinkClassName="bg-[#FFE8B7] text-black rounded px-2 py-1"
            pageLinkClassName="hover:bg-[#FFE8B7] text-[#565554] rounded px-2 py-1"
            // previousLinkClassName="hover:bg-yellow-500 bg-gray-700 text-white rounded px-2 py-1"
            // nextLinkClassName="hover:bg-yellow-500 bg-gray-700 text-white rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
}
