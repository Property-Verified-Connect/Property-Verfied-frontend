"use client"
import React, { useState, useEffect } from "react";
import { Search, ChevronRight, ArrowLeft, Filter, Building, Grid, House, TreePalm, Heart } from "lucide-react";
import Nav from "@/components/layout/nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Inter } from "next/font/google";
import axios from "axios";
import PropertyCards from "@/components/shared/property-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { getCookieValue } from "@/function/cookies";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  config: string;
  price: string;
  img: string;
  // Add other fields as per your API response
}

const Page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [configuration, setConfiguration] = useState<string>("all");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/wishlist/see`, {
          headers: {
            "Authorization": `Bearer ${getCookieValue()}`,
            "Content-Type": "application/json",
          }
        });
 const fetchedProperties =
  (response.data.properties || []).map(
    (item: any) => item.property_id
  );
        console.log(fetchedProperties)
        setProperties(fetchedProperties);
        
        setFilteredProperties(fetchedProperties);
      } catch (err) {
        console.error('Failed to fetch properties', err);
        setProperties([]);
        setFilteredProperties([]);
      }
    };
    fetchProperties();
  }, [BASE_URL]);

  // Apply filters whenever search query or filters change
  useEffect(() => {
    let filtered = [...properties];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(property =>
        property.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Property type filter
    if (propertyType !== "all") {
      filtered = filtered.filter(property =>
        property?.property_type?.toLowerCase() === propertyType.toLowerCase()
      );
    }

    // Configuration filter (Sell/Rent)
    if (configuration !== "all") {
      filtered = filtered.filter(property =>
        property?.looking_for?.toLowerCase().includes(configuration.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, propertyType, configuration, properties]);

  const handleReset = () => {
    setSearchQuery("");
    setPropertyType("all");
    setConfiguration("all");
    setFilteredProperties(properties);
  };

  return (
    <>
      <Nav />
      <div className="bg-prv min-h-screen w-full overflow-hidden flex flex-col items-center pt-15 pb-20">
        {/* Search Bar */}
        <div className="flex items-center justify-center gap-1 md:gap-3">
          <Link href={"/dashboard/user"}>
            <Button variant="outline" className="mb-2 rounded-full">
              <ArrowLeft />
            </Button>
          </Link>

          <div className="flex items-center bg-white rounded-full shadow px-3 w-11/12 max-w-md mb-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search by property name or location..."
              className="w-67 md:w-75 px-3 py-2 text-sm outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Title */}
        <div className="py-2 px-5 md:-ml-20 flex items-center w-96">
          <h1 className={`${inter.className} font-bold text-gray-600 text-2xl flex items-center justify-center`}>
         <span className="flex items-center  gap-1"><Heart size={22} /> Your Wishlist</span> <ChevronRight size={23} />
          </h1>
        </div>

        {/* Filters */}
        <div className="flex w-11/12 max-w-md justify-between gap-3 items-center mb-4">
         
         <div  className="flex gap-1 ">
          
          <Button
            variant="outline"
            className="text-sm bg-white font-semibold shadow px-3 py-1 rounded-full"
            onClick={handleReset}
          >
            Reset
          </Button>

         </div>
          <div className="flex items-center gap-2">
            {/* Property Type Select */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="w-[120px] text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment"><Building size={10}/> Apartment</SelectItem>
                <SelectItem value="plot / land"> <Grid size={10}/>Plot / Land </SelectItem>
                <SelectItem value="independent house / villa"> <House size={10}/>Independent House / Villa </SelectItem>
                <SelectItem value="farmhouse"><TreePalm size={10}/> Farmhouse</SelectItem>
              </SelectContent>
            </Select>

            {/* Configuration Select */}
            <Select value={configuration} onValueChange={setConfiguration}>
              <SelectTrigger className="w-[90px] text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Configuration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="rent / lease">Rent / Lease</SelectItem>
                    <SelectItem value="paying guest">Paying Guest</SelectItem>
                       <SelectItem value="resell">Resell</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Cards */}
        <div className='h-full w-96 px-5 flex mt-2 flex-col gap-2'>
          {properties.length === 0 ? (
            // Loading state
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-30 w-full' />
              <Skeleton className='h-30 w-full' />
            </div>
          ) : filteredProperties.length > 0 ? (
            // Display filtered properties
            filteredProperties.map((p, i) => (
              <PropertyCards key={p.id || i} property={p} mode="wishlist" />
            ))
          ) : (
            // No results found
            <div className="text-center py-10 text-gray-500">
              <p>No properties found matching your filters.</p>
              <Button
                variant="link"
                className="mt-2"
                onClick={handleReset}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;