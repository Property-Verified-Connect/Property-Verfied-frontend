import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getCookieValue } from '@/function/cookies';
import inter from '@/lib/font/Inter';
import toast from 'react-hot-toast';


function InterestForm() {
  const [step, setStep] = useState(1); // 1 = logo only, 2 = form
  const [formData, setFormData] = useState({
    area: '',
    otherArea: '',
    income: '',
    profession: '',
    otherProfession: '',
    propertyType: ''
  });

  const BaseURL= process.env.NEXT_PUBLIC_API_URL

  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStep(2);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = {
        area: formData.area === "Other" ? formData.otherArea : formData.area,
        income: formData.income,
        profession: formData.profession === "Other" ? formData.otherProfession : formData.profession,
        propertyType: formData.propertyType
      };
        
       console.log(submitData)
      const response = await fetch(`${BaseURL}/api/user/SetUserInterest`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${getCookieValue()}`,
          'Content-Type': 'application/json',
              
        },
        
        body: JSON.stringify(submitData)
      });

      localStorage.clear()
      window.location.reload();

      if (response.ok) {
        toast.success('Form submitted successfully!');
      } else {
        toast.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed ${inter.className} inset-0 bg-[#0000000c] bg-opacity-50 flex items-center justify-center z-50`}>
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="logo"
              initial={{ x: 0 ,scale:0 }}
              animate={{scale:1}}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center justify-center bg-white  z-99 h-96 w-full"
            >  
            
            <div className='w-96 '>
               <img src="/image/Logo.png" alt="" />

            </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="p-8 w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="space-y-6">
                {/* Area Question */}
           <h1 className='text-2xl text-center text-gray-500'>
             Lets Know About You 
            </h1> 
                <div className="space-y-3">
                  <Label className="text-md font-medium">Hi! Which area are you searching property in?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Nagpur", "Mumbai", "Pune", "Nashik", "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={formData.area === option ? "selectdashed" : "select"}
                        size="sm"
                        type="button"
                        onClick={() => setFormData({ ...formData, area: option })}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {formData.area === "Other" && (
                    <Input
                      placeholder="Enter your area"
                      value={formData.otherArea}
                      onChange={(e) => setFormData({ ...formData, otherArea: e.target.value })}
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Income Question */}
                <div className="space-y-3">
                  <Label className="text-md font-medium">What's your monthly income?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["₹50,000-75,000", "₹75,000-1,00,000", "₹1,00,000-1,50,000", "₹1,50,000+"].map((option) => (
                      <Button
                        key={option}
                        variant={formData.income === option ? "selectdashed" : "select"}
                        size="sm"
                        type="button"
                        onClick={() => setFormData({ ...formData, income: option })}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Profession Question */}
                <div className="space-y-3">
                  <Label className="text-md font-medium">What's your profession?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Software Engineer", "Business Owner", "Doctor", "Teacher", "Government Employee", "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={formData.profession === option ? "selectdashed" : "select"}
                        size="sm"
                        type="button"
                        onClick={() => setFormData({ ...formData, profession: option })}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                  {formData.profession === "Other" && (
                    <Input
                      placeholder="Enter your profession"
                      value={formData.otherProfession}
                      onChange={(e) => setFormData({ ...formData, otherProfession: e.target.value })}
                      className="mt-2"
                    />
                  )}
                </div>

                {/* Property Type Question */}
                <div className="space-y-3">
                  <Label className="text-md font-medium">What are you looking for?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Room", "Apartment", "Plots", "Farmhouse", "Other"].map((option) => (
                      <Button
                        key={option}
                        variant={formData.propertyType === option ? "selectdashed" : "select"}
                        size="sm"
                        type="button"
                        onClick={() => setFormData({ ...formData, propertyType: option })}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isSubmitting || !formData.area || !formData.income || !formData.profession || !formData.propertyType}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default InterestForm;