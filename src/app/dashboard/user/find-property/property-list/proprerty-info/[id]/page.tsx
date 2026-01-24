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
  Loader2,
  ChevronsRight,
  AlertCircle,
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
import toast from "react-hot-toast";

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
  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [showBookingDialog, setShowBookingDialog] = useState<boolean>(false);
  const [timeSlotError, setTimeSlotError] = useState<string>("");
  const [formErrors, setFormErrors] = useState({
    visitType: "",
    date: "",
    timeSlot: ""
  });

  const params = useParams<{ id: string }>();
  const id = params.id;
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  useEffect(() => {
    const fetchProperties = async (): Promise<void> => {
      try {
        const response = await axios.post<ApiResponse>(
          `/api/user/getPropertybyID`,
          { id },
         );

        setPropertyDetails(response.data.properties);
        console.log("Fetched property:", response.data);
      } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("Error fetching property:", axiosError.message);
      }
    };

    if (id) {
      fetchProperties();
    }
  }, [id, BASE_URL]);

const isValidTimeSlot = (time: string): boolean => {
  // Regex for single time: "11 pm", "11 PM", "11:00 AM", "10:00 PM"
  const singleTimeRegex = /^(0?[1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM|am|pm)$/i;
  
  // Regex for time range: "11 pm - 2pm", "10:00 AM - 12:00 PM", "9am-5pm"
  const timeRangeRegex = /^(0?[1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM|am|pm)\s?-\s?(0?[1-9]|1[0-2])(:[0-5][0-9])?\s?(AM|PM|am|pm)$/i;
  
  return singleTimeRegex.test(time.trim()) || timeRangeRegex.test(time.trim());
};
  const handleTimeSlotChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setTimeSlot(value);
    
    // Clear error when user starts typing
    if (timeSlotError) {
      setTimeSlotError("");
    }
    
    // Validate on change if there's already some input
    if (value && !isValidTimeSlot(value)) {
      setTimeSlotError("Invalid format. Use '10:00 AM' or '10:00 AM - 12:00 PM'");
    } else {
      setTimeSlotError("");
    }
  };

  const validateForm = (): boolean => {
    const errors = {
      visitType: "",
      date: "",
      timeSlot: ""
    };

    let isValid = true;

    if (!visitType) {
      errors.visitType = "Please select a visit type";
      isValid = false;
    }

    if (!selectedDate) {
      errors.date = "Please select a date";
      isValid = false;
    }

    if (!timeSlot) {
      errors.timeSlot = "Please enter a time slot";
      isValid = false;
    } else if (!isValidTimeSlot(timeSlot)) {
      errors.timeSlot = "Invalid time format. Use '10:00 AM' or '10:00 AM - 12:00 PM'";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleBookingSubmit = async (): Promise<void> => {
    // Validate form
    if (!validateForm()) {
      return;
    }

    const formData: BookingFormData = {
      propertyid: id,
      visitType,
      date: selectedDate!,
      timeSlot,
      partnerId: propertyDetails?.user_id
    };

    console.log("Booking Request:", formData);

    setIsBooking(true);

    try {
      const response: AxiosResponse<BookingResponse> = await axios.post(
        `/api/user/setBooking`,
        formData,
       
      );

      setIsBooking(false);
      setShowBookingDialog(false);
      toast.success("Visit booked successfully!")
      
      router.push("/dashboard/user");
    } catch (error) {
      setIsBooking(false);
      console.error("Booking error:", error);
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "Failed to book visit";
      toast.error(`❌ ${errorMessage}`);
    }
  };

  const handleVisitTypeChange = (value: string): void => {
    setVisitType(value as VisitType);
    if (formErrors.visitType) {
      setFormErrors({ ...formErrors, visitType: "" });
    }
  };

  const handleDateSelect = (date: Date | undefined): void => {
    setSelectedDate(date);
    if (formErrors.date) {
      setFormErrors({ ...formErrors, date: "" });
    }
  };

  return (
    <>
      <Nav />
      
      <PropertyDetailsPage propertyDetails={propertyDetails}/>

      {/* Action Buttons */}
      <div className={`${inter.className} w-full flex items-center justify-center`}>
        <div className="flex items-center justify-center fixed shadow rounded-2xl bottom-4 bg-white p-4 gap-3 w-full max-w-md">
          <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
            <Download /> Brochure
          </Button>

          {/* Book Visit Dialog */}
          <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-[#2396C6] hover:bg-[#0062cc] text-white py-5 text-base rounded-xl font-medium shadow">
                <Book /> Book Visit
              </Button>
            </DialogTrigger>
            <DialogContent className={`${inter.className} sm:max-w-md z-99  mt-5 bg-white rounded-xl`}>
              <DialogHeader>
                <DialogTitle className="text-[#007BFF] font-bold">
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
                    className="flex gap-4 items-center"
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
                  {formErrors.visitType && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{formErrors.visitType}</span>
                    </div>
                  )}
                </div>

                {/* Date Picker */}
                <div>
                  <Label className="font-semibold  text-gray-700 mb-2 block">
                    Select Date
                  </Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className={`rounded-md border ${formErrors.date ? 'border-red-500' : ''}`}
                  />
                  {formErrors.date && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{formErrors.date}</span>
                    </div>
                  )}
                </div>

                {/* Time Slot */}
                <div>
                  <Label className="font-semibold text-gray-700 mb-2 flex items-center">
                    Select Time Slot <ChevronsRight className="ml-2" />
                  </Label>
                  <Input
                    placeholder="e.g. 10:00 AM - 12:00 PM"
                    value={timeSlot}
                    onChange={handleTimeSlotChange}
                    className={`${timeSlotError || formErrors.timeSlot ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                  {(timeSlotError || formErrors.timeSlot) && (
                    <div className="flex items-center gap-1 mt-1 text-red-500 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      <span>{timeSlotError || formErrors.timeSlot}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Format: "10:00 AM" or "10:00 AM - 12:00 PM"
                  </p>
                </div>
              </div>

              <DialogFooter className="mt-4">
                <Button
                  className="w-full bg-[#007BFF] hover:bg-[#0062cc] text-white"
                  onClick={handleBookingSubmit}
                  disabled={isBooking}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Loading Overlay */}
      {isBooking && (
        <div className="fixed inset-0 bg-[#0000006a]  flex items-center justify-center z-99">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-4 shadow-2xl">
            <Loader2 className="h-12 w-12 animate-spin text-[#007BFF]" />
            <p className="text-lg font-semibold text-gray-800">Please wait...</p>
            <p className="text-sm text-gray-500">Booking your visit</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetails;