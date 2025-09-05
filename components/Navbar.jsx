"use client"
import React, { useState, useEffect } from "react"
import { Menu, X } from "lucide-react" // lightweight icons

function Navbar() {
  const [theme, setTheme] = useState("light")
  const [isOpen, setIsOpen] = useState(false)

  // Sync with system theme on load
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }
  }, [])

  // Apply theme when toggled
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="p-4 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <div className="text-gray-900 dark:text-white text-2xl font-bold">
        rank2college
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex space-x-6">
        <a
          href="/"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Home
        </a>
        <a
          href="/about"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          About
        </a>
        <a
          href="/contact"
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          Contact
        </a>
      </nav>

      {/* Theme Toggle (desktop only) */}
      <div className="hidden md:flex">
        <button
          onClick={toggleTheme}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center space-x-2">
        <button onClick={toggleTheme} className="text-xl">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 dark:text-gray-200">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md md:hidden flex flex-col space-y-4 p-4 z-50">
          <a
            href="/"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="/about"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="/contact"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}

export default Navbar
