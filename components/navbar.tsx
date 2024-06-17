"use client";

import { Coffee, Menu, Search, User } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const navItems = [
    {
      link: "/",
      text: "Home",
    },
    {
      link: "/store",
      text: "Stores",
    },
  ];
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 z-50 text-white">
      <div className="text-lg font-bold">COFFEE PASSPORT</div>
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
            <div className="border-2 rounded-md p-1">
              <Menu></Menu>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {navItems.map((nav: any, key: number) => (
              <DropdownMenuItem
                key={key}
                className="cursor-pointer border-b-4 border-transparent hover:border-yellow-500 transition-colors duration-300"
              >
                {nav.text}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
