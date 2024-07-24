"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import React from "react";
import { useDebouncedCallback } from 'use-debounce';

export default function Sidebar({ setSearchInput }: any) {  
  return (
    <div className="absolute left-0 top-0 h-full w-[300px] text-white p-4 pt-28 z-10">
      <div className="flex items-center justify-between space-x-2">
        <Search className="" />
        <Input
          className="bg-[#565554] text-[#C0B59A] drop-shadow-md ml-2"
          onChange={useDebouncedCallback((e) => setSearchInput(e.target.value), 500)}
          placeholder="Type store's name to search"
        />
      </div>
    </div>
  );
}
