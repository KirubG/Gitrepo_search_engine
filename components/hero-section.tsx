"use client";

import Link from "next/link";
import { Github, Menu, X, Search, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Github className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              GitHub Repo Finder
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/search"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Search
          </Link>
          <Link
            href="#featured"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Featured
          </Link>
          <Link
            href="https://github.com/topics/awesome"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Awesome Lists
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Desktop Theme Toggle */}
          <Link href="https://github.com/KirubG/GitSearch_Engine.git" className="bg-white text-black rounded-md py-2 text-sm px-4 border">
            Give us Star on Github
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {isMenuOpen && (
          <div
            key={resolvedTheme}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="container flex h-16 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Github className="h-6 w-6" />
                <span className="font-bold">GitHub Repo Finder</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="container grid gap-6 p-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                <Search className="h-5 w-5" />
                Search
              </Link>
              <Link
                href="#featured"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Featured
              </Link>
              <Link
                href="https://github.com/topics/awesome"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-lg font-medium"
                onClick={toggleMenu}
              >
                Awesome Lists
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
