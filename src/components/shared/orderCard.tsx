import React from "react";
import StatusTimeline from "./statusline";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { CheckCircle, Calendar, IndianRupee, User, MapPin, Clock, Timer } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

function OrderCard({ Orders }) {
  console.log(Orders);
  
  // Status descriptions
  const getStatusDescription = (status) => {
    const descriptions = {
      pending: "Your booking request has been submitted and is awaiting review by our team.",
      approved: "Your booking has been confirmed! The property partner will contact you soon.",
      contact: "Your property visit has been completed. Thank you for using our service!",
      cancelled: "This booking has been cancelled. If you have questions, please contact support.",
      rejected: "Unfortunately, this booking request could not be processed at this time."
    };
    
    return descriptions[status?.toLowerCase()] || "Status information not available.";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl bg-white rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
    >
      <div className="flex flex-col gap-4 p-4">
        
        {/* Compact Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={Orders.property_approved?.photos[0] || ""}
            className="w-full h-full object-cover"
            alt="property"
          />
          <Badge className="absolute bottom-2 left-2 bg-green-600 hover:bg-green-700 text-white border-none text-xs px-2 py-0.5">
            <CheckCircle size={12} className="mr-1" />
            Verified
          </Badge>
            <Badge className="absolute top-2 right-2 bg-blue-500 hover:bg-green-700 text-white border-none text-xs px-2 py-0.5">
          
            {Orders.property_approved?.looking_for}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
              {Orders.property_approved?.property_name}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MapPin size={14} />
              <span className="line-clamp-1">{Orders.property_approved?.location}</span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
            
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-gray-400" />
              <div>
                <span className="text-gray-500 text-xs">Booked:</span>
                <span className="text-gray-900 ml-1 font-medium">
                  {new Date(Orders.created_at).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric"
                  })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <IndianRupee size={14} className="text-gray-400" />
              <div>
                <span className="text-gray-500 text-xs">Price:</span>
                <span className="text-gray-900 ml-1 font-medium">
                  ₹{Orders.property_approved?.price.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Timer size={14} className="text-gray-400" />
              <div>
                <span className="text-gray-500 text-xs">Visiting time:</span>
                <span className="text-gray-900 ml-1 font-medium">
                  {Orders.visit_time}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={14} className="text-gray-400" />
              <div>
                <span className="text-gray-500 text-xs">Visit:</span>
                <span className="text-gray-900 ml-1 font-medium">
                  {new Date(Orders.visit_date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })}
                </span>
              </div>
            </div>

          </div>
          
          <div className="flex items-center gap-1 mb-3">
            <User size={14} className="text-gray-400 " />
            <div className="flex items-center">
              <span className="text-gray-500 text-xs">Partner: </span>
              <span className="text-gray-900 ml-1 text-sm font-medium line-clamp-1">
                {Orders.property_approved?.user_id.name}
              </span>
            </div>
          </div>

          {/* Status & Action */}
          <div className="flex flex-col items-center w-full gap-3 mt-auto">
            <div className="w-full">
              <StatusTimeline status={Orders.status} />
              
              {/* Status Description */}
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {getStatusDescription(Orders.status)}
                </p>
              </div>
            </div>
            
            <Link
              href={`/dashboard/user/find-property/property-list/proprerty-info/${Orders.property_approved?.id}`}
              className="w-full"
            >
              <Button
                variant="selectdashed"
                size="sm"
                className="border-gray-300 w-full font-medium"
              >
                View Details
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default OrderCard;