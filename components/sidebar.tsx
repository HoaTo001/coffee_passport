"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import React from "react";

export default function Sidebar({ setSearchInput }: any) {

  return (
    <div className="absolute left-0 top-0 h-full w-[300px] text-white p-4 pt-28 z-10">
      <div className="flex items-center justify-between space-x-2">
        <Search className="" />
        <Input
          className="bg-gray-700 ml-2"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type store's name to search"
        />
      </div>
    </div>
  );
}
