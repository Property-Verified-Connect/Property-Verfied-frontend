"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  User,
  Phone,
  Briefcase,
  FileText,
  Building2,
  ParkingMeter,
} from "lucide-react";
import inter from "@/lib/font/Inter";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // ✅ using shadcn-ui dialog
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import StatusTimeline from "./statusline";
import toast from "react-hot-toast";
 // optional but good for feedback

function ReferCard({ lead }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  // ✅ handle API call
 const openWhatsApp = (phone) => {
    // Ensure phone number has country code (e.g. India = +91)
    const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
    const message = encodeURIComponent(
      `Hello ${lead.customer_name}, I am contacting you regarding ${lead.project_name}.`
    );
    const url = `https://wa.me/${formattedPhone}?text=${message}`;
    window.open(url, "_blank");
  };

  const handleLeadApproval = async (id) => {
    try {
      setLoading(true);
    //   const response = await axios.post(`${BASEURL}/api/refer/setCustomerleadtoApproval`, { id }); // change API path if needed
        openWhatsApp(lead.contact_number) 
    toast.success("Lead approved successfully!");
    //   console.log("Response:", response.data);
      window.location.reload()
    } catch (error) {
      console.error("Error approving lead:", error);
      toast.error("Failed to approve lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ y: -5, opacity: 1 }}
      transition={{ duration: 0.3 }}
      key={lead.id}
      className="bg-[#A5D2F2] rounded-2xl p-4 w-full flex flex-col shadow-md"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {lead.project_name}
          </h3>
          <p className="text-xs text-gray-700">
            Lead ID: <span className="text-gray-600">{lead.id.slice(0, 8)}...</span>
          </p>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1 text-sm font-medium text-[#0056b3] hover:text-[#003f80]"
        >
          {open ? "Hide Details" : "View Details"}
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Dropdown Details */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-3"
          >
            <div className="bg-white p-3 rounded-xl text-sm text-gray-800 space-y-2 shadow-inner">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#0070cc]" />
                <span className="font-semibold">Customer:</span> {lead.customer_name}
              </div>

              <div className="flex items-center gap-2">
                <ParkingMeter size={16} className="text-[#0070cc]" />
                <span className="font-semibold">Partner Match:</span> {lead.user_id.name}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-[#0070cc]" />
                <span className="font-semibold">Contact:</span> {lead.contact_number}
              </div>

              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[#0070cc]" />
                <span className="font-semibold">Profession:</span> {lead.profession}
              </div>

              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-[#0070cc]" />
                <span className="font-semibold">Budget:</span> ₹{lead.budget_range}
              </div>

              <div className="flex items-start gap-2">
                <FileText size={16} className="text-[#0070cc] mt-0.5" />
                <span className="font-semibold">Notes:</span>
                <p className="text-gray-700">{lead.notes || "No notes provided"}</p>
              </div>

              {lead.referral_name && (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-[#0070cc]" />
                  <span className="font-semibold">Referred by:</span> {lead.referral_name}
                </div>
              )}
   
           
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white p-2 rounded-2xl mt-2">
        <StatusTimeline status={"approved"}/>
      </div>
    </motion.div>
  );
}

export default ReferCard;
