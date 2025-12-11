"use client";
import React, { useState, useEffect } from "react";
import {
  Heart,
  ArrowLeft,

  Phone,
  Bot,
  Download,
  Book,
  CircleCheck,
  Car,
  Shield,
  MapPin,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Inter } from "next/font/google";
import Nav from "@/components/layout/nav";
import { Badge } from "@/components/ui/badge";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import { getCookieValue } from "@/function/cookies";
import PropertyDetailsPage from "@/components/layout/propertyDetailCard";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Type Definitions
type VisitType = "home" | "site";

interface PropertyDetails {
  _id: string;
  property_kind: string;
  property_type?: string;
  location: string;
  photos: string[];
  price: number | string;
  size?: string;
  rera_number?: string;
  description?: string;
  amenities?: string[];
  users?: {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  status?: string;
  created_at?: string;
  updated_at?: string;
}

interface StaticProperty {
  title: string;
  image: string;
  name: string;
  location: string;
  size: string;
  type: string;
  price: string;
  RERA: string;
  description: string;
  contact: {
    whatsapp: string;
  };
}

interface ApiResponse {
  properties: PropertyDetails;
  message?: string;
}

interface BookingFormData {
  propertyid: string;
  visitType: VisitType;
  date: Date;
  timeSlot: string;
}

interface BookingResponse {
  success: boolean;
  message: string;
  booking?: {
    id: string;
    propertyid: string;
    visitType: VisitType;
    date: string;
    timeSlot: string;
  };
}

interface ErrorResponse {
  error: string;
  message?: string;
}

const PropertyDetails: React.FC = () => {
  const [visitType, setVisitType] = useState<VisitType>("home");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [propertyDetails, setPropertyDetails] = useState<PropertyDetails | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams<{ id: string }>();
  const id = params.id;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

 

  useEffect(() => {
    const fetchProperties = async (): Promise<void> => {
      try {
        const response = await axios.post<ApiResponse>(
          `${BASE_URL}/api/user/getApprovedPropertybyID`,
          { id },
          {

            headers: {
                "Authorization": `Bearer ${getCookieValue()}`, 
                "Content-Type": "application/json",
          }
        }
        );

        setPropertyDetails(response.data.properties);
        console.log("Fetched property:", response.data);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Error fetching property:", axiosError.message);
    } 
    // finally {
      //   setIsLoading(false);
      // }
    };

    if (id) {
      fetchProperties();
    }
  }, [id, BASE_URL]);

  const handleBookingSubmit = async (): Promise<void> => {
    // Validation
    if (!visitType || !selectedDate || !timeSlot) {
      alert("❌ Please fill all fields");
      return;
    }

    const formData: BookingFormData = {
      propertyid: id,
      visitType,
      date: selectedDate,
      timeSlot,
      partnerId:propertyDetails?.user_id
    };

    console.log("Booking Request:", formData);

    try {
      const response: AxiosResponse<BookingResponse> = await axios.post(
        `${BASE_URL}/api/user/setApprovalBooking`,
        formData,
        {
        headers: {
                  "Authorization": `Bearer ${getCookieValue()}`, 
                  "Content-Type": "application/json",
                },
   
        }
      );

      alert("✅ Visit booked successfully!");
      router.push("/dashboard/user");
    } catch (error) {
      console.error("Booking error:", error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to book visit";
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleVisitTypeChange = (value: string): void => {
    setVisitType(value as VisitType);
  };

  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTimeSlot(e.target.value);
  };

  return (
    <>
      <Nav />
    
      
      <PropertyDetailsPage propertyDetails={propertyDetails}/>


        {/* Action Buttons */}
        <div className={`${inter.className} w-full flex items-center justify-center`}>
        <div className="flex items-center justify-center fixed shadow rounded-2xl bottom-4 bg-white p-4  gap-3 w-full max-w-md">
          <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
            <Download /> Brochure
          </Button>

          {/* Book Visit Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
                <Book /> Book Visit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md mt-5 bg-white rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-[#007BFF]">
                  Book a Property Visit
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Visit Type */}
                <div>
                  <Label className="font-semibold text-gray-700 mb-2 block">
                    Visit Type
                  </Label>
                  <RadioGroup
                    defaultValue={visitType}
                    onValueChange={handleVisitTypeChange}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home">Home Visit</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="site" id="site" />
                      <Label htmlFor="site">Site Visit</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Date Picker */}
                <div>
                  <Label className="font-semibold text-gray-700 mb-2 block">
                    Select Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <Label className="font-semibold text-gray-700 mb-2 block">
                    Select Time Slot
                  </Label>
                  <Input
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                    value={timeSlot}
                    onChange={handleTimeSlotChange}
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  className="w-full bg-[#007BFF] hover:bg-[#0062cc] text-white"
                  onClick={handleBookingSubmit}
                >
                  Confirm Booking
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        </div>
     
    </>
  );
};

export default PropertyDetails;