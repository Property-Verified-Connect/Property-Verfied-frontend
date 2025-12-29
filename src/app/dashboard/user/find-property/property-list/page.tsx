"use client"
import React, { useState, useEffect } from "react";
import { Search, ChevronRight, ArrowLeft, Filter, Building, Grid, House, TreePalm, ChevronRightIcon, MapPin, Bed, Bath, Home, DollarSign, CheckCircle, Key, X } from "lucide-react";
import Nav from "@/components/layout/nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {motion} from "framer-motion"

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
  bedrooms?: number;
  bathrooms?: number;
  balconies?: number;
  availability_status?: string;
  ownership?: string;
  property_type?: string;
  looking_for?: string;
  bedroom?: number;
  bathroom?: number;
  city?: string;
  AvailabilityStatus?: string;
  Ownership?: string;
  // Add other fields as per your API response
}

interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

const Page = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState<string>("all");
  const [configuration, setConfiguration] = useState<string>("all");
  const [bedrooms, setBedrooms] = useState<string>("all");
  const [bathrooms, setBathrooms] = useState<string>("all");
  const [balconies, setBalconies] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [availabilityStatus, setAvailabilityStatus] = useState<string>("all");
  const [ownership, setOwnership] = useState<string>("all");
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/api/user/getAllApprovedProperty`, {
          headers: {
            "Authorization": `Bearer ${getCookieValue()}`,
            "Content-Type": "application/json",
          }
        });
        const fetchedProperties = response.data.properties ?? response.data ?? [];
        console.log(fetchedProperties)
        setProperties(fetchedProperties);
        setFilteredProperties(fetchedProperties);
      } catch (err) {
        console.error('Failed to fetch properties', err);
        setProperties([]);
        setFilteredProperties([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, [BASE_URL]);

  // Update active filters array whenever any filter changes
  useEffect(() => {
    const filters: ActiveFilter[] = [];

    if (searchQuery.trim()) {
      filters.push({ key: 'search', label: 'Search', value: searchQuery });
    }
    if (propertyType !== "all") {
      filters.push({ key: 'propertyType', label: 'Type', value: propertyType });
    }
    if (configuration !== "all") {
      filters.push({ key: 'configuration', label: 'Config', value: configuration });
    }
    if (bedrooms !== "all") {
      filters.push({ key: 'bedrooms', label: 'Bedrooms', value: `${bedrooms} BHK` });
    }
    if (bathrooms !== "all") {
      filters.push({ key: 'bathrooms', label: 'Bathrooms', value: bathrooms });
    }
    if (balconies !== "all") {
      filters.push({ key: 'balconies', label: 'Balconies', value: balconies });
    }
    if (minPrice || maxPrice) {
      const priceLabel = minPrice && maxPrice 
        ? `₹${minPrice} - ₹${maxPrice}` 
        : minPrice 
        ? `Min ₹${minPrice}` 
        : `Max ₹${maxPrice}`;
      filters.push({ key: 'price', label: 'Price', value: priceLabel });
    }
    if (locationFilter.trim()) {
      filters.push({ key: 'location', label: 'City', value: locationFilter });
    }
    if (availabilityStatus !== "all") {
      filters.push({ key: 'availability', label: 'Status', value: availabilityStatus });
    }
    if (ownership !== "all") {
      filters.push({ key: 'ownership', label: 'Ownership', value: ownership });
    }

    setActiveFilters(filters);
  }, [searchQuery, propertyType, configuration, bedrooms, bathrooms, balconies, minPrice, maxPrice, locationFilter, availabilityStatus, ownership]);

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

    // Bedrooms filter
    if (bedrooms !== "all") {
      filtered = filtered.filter(property =>
        property?.bedroom?.toString() === bedrooms
      );
    }

    // Bathrooms filter
    if (bathrooms !== "all") {
      filtered = filtered.filter(property =>
        property?.bathroom?.toString() === bathrooms
      );
    }

    // Balconies filter
    if (balconies !== "all") {
      filtered = filtered.filter(property =>
        property?.balconies?.toString() === balconies
      );
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filtered = filtered.filter(property => {
        const price =  Number(property?.price);
        const min = minPrice ? parseFloat(minPrice) : 0;
        const max = maxPrice ? parseFloat(maxPrice) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Location filter
    if (locationFilter.trim()) {
      filtered = filtered.filter(property =>
        property?.city?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Availability status filter
    if (availabilityStatus !== "all") {
      filtered = filtered.filter(property =>
        property?.AvailabilityStatus?.toLowerCase() === availabilityStatus.toLowerCase()
      );
    }

    // Ownership filter
    if (ownership !== "all") {
      filtered = filtered.filter(property =>
        property?.Ownership?.toLowerCase() === ownership.toLowerCase()
      );
    }

    setFilteredProperties(filtered);
  }, [searchQuery, propertyType, configuration, bedrooms, bathrooms, balconies, minPrice, maxPrice, locationFilter, availabilityStatus, ownership, properties]);

  const handleReset = () => {
    setSearchQuery("");
    setPropertyType("all");
    setConfiguration("all");
    setBedrooms("all");
    setBathrooms("all");
    setBalconies("all");
    setMinPrice("");
    setMaxPrice("");
    setLocationFilter("");
    setAvailabilityStatus("all");
    setOwnership("all");
    setFilteredProperties(properties);
  };

  const removeFilter = (filterKey: string) => {
    switch(filterKey) {
      case 'search':
        setSearchQuery("");
        break;
      case 'propertyType':
        setPropertyType("all");
        break;
      case 'configuration':
        setConfiguration("all");
        break;
      case 'bedrooms':
        setBedrooms("all");
        break;
      case 'bathrooms':
        setBathrooms("all");
        break;
      case 'balconies':
        setBalconies("all");
        break;
      case 'price':
        setMinPrice("");
        setMaxPrice("");
        break;
      case 'location':
        setLocationFilter("");
        break;
      case 'availability':
        setAvailabilityStatus("all");
        break;
      case 'ownership':
        setOwnership("all");
        break;
    }
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
        <div className="py-2 px-5 md:-ml-20 flex items-start w-96">
          <h1 className={`${inter.className} font-bold text-gray-600 text-2xl flex items-center justify-center`}>
           Property List <ChevronRight />
          </h1>
        </div>

        {/* Active Filters Badge Display */}
    

        {/* Filters */}
        <div className="flex w-11/12 max-w-md justify-between gap-3 items-center mb-4">
         
         <div className="flex gap-1">

         <Sheet>
      <SheetTrigger asChild>
    <Button
            variant="outline"
            className="text-sm bg-white shadow px-3 py-1 rounded-full"
          >
          <Filter/>
          </Button>
      </SheetTrigger>
      <SheetContent side="left" className={`z-99 ${inter.className} overflow-y-auto`}>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-zinc-600 py-4 flex items-center gap-1 ">  <Filter fill="gray" color="gray"/>Property Filter <ChevronRightIcon/></SheetTitle>
        </SheetHeader>
        <div className="flex gap-4 flex-col w-full px-3 pb-6">
          
          {/* Property Type */}
             {/* Location */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <MapPin size={16}/>City <ChevronRight size={18}/>
            </Label>
            <Input
              type="text"
              placeholder="Enter location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full text-sm bg-white shadow rounded-full"
            />
          </div>
          <div>


            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Building size={16}/> Property Type <ChevronRight size={18}/>
            </Label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="text-sm w-full bg-white shadow rounded-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment"><Building size={14}/> Apartment</SelectItem>
                <SelectItem value="plot / land"><Grid size={14}/> Plot / Land</SelectItem>
                <SelectItem value="independent house / villa"><House size={14}/> Independent House / Villa</SelectItem>
                <SelectItem value="farmhouse"><TreePalm size={14}/> Farmhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Configuration */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Home size={16}/> Property Configuration <ChevronRight size={18}/>
            </Label>
            <Select value={configuration} onValueChange={setConfiguration}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Configuration" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="rent / lease">Rent / Lease</SelectItem>
                <SelectItem value="paying guest">Paying Guest</SelectItem>
                <SelectItem value="resell">Resell</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3">
          {/* Bedrooms */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Bed size={16}/> Bedrooms <ChevronRight size={18}/>
            </Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4 BHK</SelectItem>
                <SelectItem value="5">5+ BHK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bathrooms */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Bath size={16}/> Bathrooms <ChevronRight size={18}/>
            </Label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Bathrooms" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          </div>
          

          {/* Balconies */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Home size={16}/> Balconies <ChevronRight size={18}/>
            </Label>
            <Select value={balconies} onValueChange={setBalconies}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Balconies" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <DollarSign size={16}/> Price Range <ChevronRight size={18}/>
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full text-sm bg-white shadow rounded-full"
              />
              <Input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full text-sm bg-white shadow rounded-full"
              />
            </div>
          </div>

         

          {/* Availability Status */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <CheckCircle size={16}/> Availability Status <ChevronRight size={18}/>
            </Label>
            <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ready to move">Ready to move</SelectItem>
                <SelectItem value="under construction">Under Construction</SelectItem>
                <SelectItem value="comming soon">Comming Soon</SelectItem>
               
              </SelectContent>
            </Select>
          </div>

          {/* Ownership */}
          <div>
            <Label className="mb-2 font-semibold text-[#2396C6] flex gap-1 items-center">
              <Key size={16}/> Ownership <ChevronRight size={18}/>
            </Label>
            <Select value={ownership} onValueChange={setOwnership}>
              <SelectTrigger className="w-full text-sm bg-white shadow rounded-full">
                <SelectValue placeholder="Ownership" />
              </SelectTrigger>
              <SelectContent className="z-99">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="freehold">Freehold</SelectItem>
                <SelectItem value="leasehold">Leasehold</SelectItem>
                <SelectItem value="co-operative society">Co-operative Society</SelectItem>
                <SelectItem value="power of attorney">Power of Attorney</SelectItem>
              </SelectContent>
            </Select>
          </div>

        </div>
        <SheetFooter className="px-3 gap-2">
          <Button type="button" variant="selectdashed" className="w-full" onClick={handleReset}>
            Reset All Filters
          </Button>
          <SheetClose asChild>
            <Button variant="outline" className="w-full">Apply & Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
          
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
                <SelectItem value="plot / land"><Grid size={10}/> Plot / Land</SelectItem>
                <SelectItem value="independent house / villa"><House size={10}/> Independent House / Villa</SelectItem>
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
        
        {activeFilters.length > 0 && (
          <motion.div 
           initial={{opacity:0 , y:10}} 
            animate={{opacity:10 , y:0}}
           className="w-11/12 max-w-md mb-3 p-3 bg-white  rounded-lg shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-600">Active Filters</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleReset}
                className="text-xs h-6 px-2"
              >
                Clear All
              </Button>
            </div>
            <div className={` ${ inter.className} flex flex-wrap gap-2`}>
              {activeFilters.map((filter) => (
                <Badge 
                  key={filter.key} 
                  variant="filter" 
                  className="px-2 py-1 flex items-center gap-1"
                >
                  <span className="text-xs font-medium">{filter.label}:</span>
                  <span className="text-xs capitalize">{filter.value}</span>
                  <button
                    onClick={() => removeFilter(filter.key)}
                    className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Property Cards */}
        <div className='h-full w-96 px-5 flex mt-2 flex-col gap-2'>
          {isLoading ? (
            // Loading state
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-30 w-full' />
              <Skeleton className='h-30 w-full' />
            </div>
          ) : properties.length === 0 ? (
            // Empty properties state - NO properties at all
            <div className="text-center py-10">
              <Home size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No Properties Available
              </h2>
              <p className="text-gray-500 mb-4">
                There are currently no properties listed.
              </p>
              <Link href="/dashboard/user">
                <Button className="rounded-full">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          ) : filteredProperties.length > 0 ? (
            // Display filtered properties
            filteredProperties.map((p, i) => (
              <PropertyCards key={p.id || i} property={p} type="User" />
            ))
          ) : (
            // No results found after applying filters
            <div className="text-center py-10 text-gray-500">
              <Filter size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">
                No properties found
              </p>
              <p className="mb-4">
                No properties match your current filters.
              </p>
              <Button
                variant="outline"
                className="rounded-full"
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