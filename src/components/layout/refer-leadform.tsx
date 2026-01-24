"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import inter from "@/lib/font/Inter";
import { getCookieValue } from "@/function/cookies";
import { Skeleton } from "../ui/skeleton";
import ReferCard from "../shared/refer-pro-card";
import toast from "react-hot-toast";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useRedirectByRole from "@/hooks/useRedirectByRole";


export default function PartnerOnboarding() {
  const [accepted, setAccepted] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;
  const [propertyNames, setPropertyNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState("add-lead");
  const {user} = useRedirectByRole()


  // ✅ Fixed: Proper state for customer leads
  const [customerLeads, setCustomerLeads] = useState([]);
  const [leadsLoading, setLeadsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const tabs = [
    { id: "add-lead", label: "Add Lead" },
    { id: "my-leads", label: "My Leads" },
  ];

  const [formData, setFormData] = useState({
    customerName: "",
    contactNumber: "",
    profession: "",
    budgetRange: "",
    projectName: "",
    notes: "",
    referralName: "",
  });

  const customer_leads = [
        {
            id: "7e7ae3da-8aea-4b99-b65d-8f78363d92fc",
            user_id: {
                name: "Muchkundraje thote"
            },
            customer_name: "Muchkundraje thote",
            contact_number: "90968350",
            profession: "Boilogy Teacher",
            budget_range: "500000",
            project_name: "James Apratment ",
            notes: "dewhjlkdshlkjsdajhdklasjlkdsjl",
            referral_name: "",
          status: "approved",
            created_at: "2025-12-29T08:04:55.615107+00:00",
            updated_at: "2025-12-29T08:04:55.615107+00:00"
        }
    ]

  const handleAccept = async() => {
       const res = await axios.post(`${BASEURL}/api/refer/setTerms`, {},{
        headers: {
          "Authorization": `Bearer ${getCookieValue()}`,
          "Content-Type": "application/json",
        }
      });    

      localStorage.clear()

      window.location.reload();
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProjectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      projectName: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/user/referPro/createRefer`, formData);
      toast.success("✅ Customer Lead Added Successfully!");
      setFormData({
        customerName: "",
        contactNumber: "",
        profession: "",
        budgetRange: "",
        projectName: "",
        notes: "",
        referralName: "",
      });
      // ✅ Refresh leads after adding
      if (selected === "my-leads") {
        fetchCustomerLeads();
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error adding customer lead!");
    }
  };

  // ✅ Fetch property names
  useEffect(() => {
    const fetchPropertyNames = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/user/referPro/getPropertyName`);
        
        const property = res.data.Property_name.map(data => data.property_name);
        property.unshift("Other");
        setPropertyNames(property);
        
      } catch (error) {
        console.error("Error fetching property names:", error);
        toast.error("Failed to load property names");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPropertyNames();
  }, [BASEURL]);

  // ✅ NEW: Fetch customer leads
  const fetchCustomerLeads = async () => {
    try {
      setLeadsLoading(true);
      const res = await axios.get(`${BASEURL}/api/refer/getAllApprovedLead`, {
        headers: {
          "Authorization": `Bearer ${getCookieValue()}`,
          "Content-Type": "application/json",
        }
      });

       console.log(res)
      setCustomerLeads(res.data.leads || []);
    } catch (error) {
      console.error("Error fetching customer leads:", error);
      setCustomerLeads([]);
    } finally {
      setLeadsLoading(false);
    }
  };

  // ✅ Fetch leads when switching to "My Leads" tab
  useEffect(() => {
    if (selected === "my-leads") {
      fetchCustomerLeads();
    }
  }, [selected]);

  if (!user?.is_Term) {
    return (
      <motion.div
        className="flex justify-center items-start mt-10 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card className={`${inter.className} w-full max-w-md shadow-lg border`}>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Terms and Condition 
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm text-center">
              Welcome to our <strong>Refer Partner Program</strong>!  
              Please read and accept our Terms & Conditions before continuing.
            </p>

            <ScrollArea className="h-40 border rounded-md p-3 text-sm text-gray-700">
              <p>
                1️⃣ You agree to refer genuine leads only. <br />
                2️⃣ You must ensure the lead's consent before submission. <br />
                3️⃣ The company reserves the right to verify and approve leads. <br />
                4️⃣ By proceeding, you consent to our privacy and data policies.
              </p>
            </ScrollArea>

            <Button onClick={handleAccept} className="w-full">
              Accept & Continue
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <>
      <div className={`${inter.className} flex items-center justify-center w-full px-5`}>
        <div className="inline-flex items-center justify-center gap-1 w-90 px-2 p-2 bg-gray-100 rounded-lg relative">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelected(tab.id)}
              className={`
                px-6 py-2 text-xs font-medium rounded-md
                transition-colors duration-200 ease-in-out
                relative z-10
                ${selected === tab.id 
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {tab.label}
              {selected === tab.id && (
                <motion.div
                  layoutId="activeTabBackground"
                  className="absolute inset-0 bg-[#2396C6] rounded-md -z-10"
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 30
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {selected === "add-lead" ? (
        <motion.div
          className={`${inter.className} flex justify-center items-start mt-2 min-h-screen`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="w-full max-w-md shadow-lg border">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Add Customer Lead
              </CardTitle>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
            <div>
  <Label htmlFor="projectName" className="mb-2 w-full">Project Name</Label>
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        id="projectName"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
      >
        {formData.projectName || "Select a Project"}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-full p-0">
      <Command>
        <CommandInput placeholder="Search project..." />
        <CommandList>
          <CommandEmpty>No project found.</CommandEmpty>
          <CommandGroup>
            {propertyNames.map((project, idx) => (
              <CommandItem
                key={idx}
                value={project}
                onSelect={() => {
                  handleProjectChange(project);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    formData.projectName === project ? "opacity-100" : "opacity-0"
                  )}
                />
                {project}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</div>
                <div>
                  <Label htmlFor="customerName" className="mb-2">Customer Name</Label>
                  <Input
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactNumber" className="mb-2">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="profession" className="mb-2">Profession</Label>
                  <Input
                    id="profession"
                    name="profession"
                    value={formData.profession}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="budgetRange" className="mb-2">Budget Range / Property Interest</Label>
                  <Input
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2">Notes / Extra Info</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="showReferral"
                    checked={showReferral}
                    onCheckedChange={setShowReferral}
                  />
                  <Label htmlFor="showReferral">Show Referral Person Name</Label>
                </div>

                {showReferral && (
                  <div>
                    <Label htmlFor="referralName" className="mb-2">Referral Person Name</Label>
                    <Input
                      id="referralName"
                      name="referralName"
                      value={formData.referralName}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Submit Lead
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="flex justify-center mt-4">
          <div className='h-full w-96 px-3.5 flex flex-col gap-2'>
            {leadsLoading ? (
              <div className='flex flex-col gap-2'>
                <Skeleton className='h-30 w-full' />
                <Skeleton className='h-30 w-full' />
                <Skeleton className='h-30 w-full' />
                <Skeleton className='h-30 w-full' />
              </div>
            ) : customer_leads.length > 0 ? (
              customer_leads.map((p, i) => (
                <ReferCard key={p.id || i} lead={p} />
              ))
            ) : (
              <div className='text-center py-10'>
                <p className='text-gray-600'>No leads available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}