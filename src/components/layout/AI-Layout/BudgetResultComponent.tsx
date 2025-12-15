import { PieChart, TrendingUp } from "lucide-react";
import {motion} from "framer-motion"
import PropertyCards from "@/components/shared/property-cards";
import { Button } from "@/components/ui/button";
import RecommandationCard from "@/components/shared/recommdationCard";

const property={
  property_name:"Rajshree"
  
}


const formatToLakhRange = (rangeStr) => {
  if (!rangeStr) return "";

  const [min, max] = rangeStr.split("-").map(Number);

  const minLakh = min / 100000;
  const maxLakh = max / 100000;

  return `${minLakh} - ${maxLakh} lakh`;
};

const BudgetResultComponent = ({ answers ,  predictions ,BudgetProperties }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div
    
    className="flex items-center gap-2 mb-4">
      <div className="bg-green-100 p-2 rounded-full">
        <PieChart className="text-green-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Budget Analysis</h3>
    </div>
    
    <div className="space-y-3 text-sm">
      <motion.div
      className="p-3 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Monthly Income</p>
        <motion.p
              initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:0.7}}
        className="font-bold text-lg">{answers[1]} </motion.p>
      </motion.div>
      
      <motion.div
     
      className="grid grid-cols-2 gap-2">
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-gray-600 text-xs">Current EMIs</p>
          <motion.p 
             initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.0}}
          className="font-semibold">{answers[2]}</motion.p>
        </div>
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-gray-600 text-xs">Expenses</p>
          <motion.p
             initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.2}}
          className="font-semibold">{answers[3]}</motion.p>
        </div>
      </motion.div>
    </div>

    <motion.div
  
    
    className="mt-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-green-600" size={20} />
        <span className="font-bold text-green-700">Safe Purchase Limit</span>
      </div>
      <motion.p
          initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.2}}
    
       className="text-2xl font-bold text-green-600">{formatToLakhRange(predictions?.safe_purchase_limit)}</motion.p>
      <p className="text-xs text-gray-600 mt-1">EMI Capacity: {predictions?.emi_capacity} /month</p>
      <p className="text-xs text-green-700 mt-2">✅ Risk Level: {predictions?.risk}</p>
    </motion.div>

    <motion.div
    className="mt-3 p-3 bg-yellow-50 rounded-lg text-xs">
      <motion.p 
          initial={{opacity:0}}
      animate={{opacity:1}}
    transition={{delay:1.5}}
      
      className="text-gray-700">💡 <strong>Recommendation:</strong> {predictions?.recommendation}</motion.p>
    </motion.div>

    <div className="min-h-20  rounded-lg flex items-center justify-center flex-col gap-2  mt-2">
      <h1 className="font-bold" >Recommended Property</h1>
      {/* <div className="w-full flex h-25 rounded-lg bg-white">
       <div className="h-full w-30 p-2 rounded-2xl overflow-hidden ">
          <img className="h-full w-full object-cover rounded-xl" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTta0XsQDICRBsKhhCivnBCRkL3KDsfAc66jg&s" alt="" />
       </div>
       <div className="w-full p-2"> 
              <h1 className="font-bold">Rajshree</h1>
              <div className="flex gap-6 ">
              <h1 className="text-sm">Apartment</h1>
              <h1 className="text-sm">Itwari</h1>
              </div>
           
                <div className="h-3">
                           ₹400000
                </div>
              <Button variant={"selectdashed"} className="h-3 mt-3 rounded text-sm ">Book visit</Button>

              

       </div>
      </div> */}
  
     {  BudgetProperties.length !== 0 ?
        BudgetProperties.map((val ,index)=>(
          
          <RecommandationCard key={index} property={val} />
        ))
        :
        <div> No Recommanded  Property found  </div>
     }
       
   <div className="flex w-full items-start justify-between flex-col ">
      
          <button className="bg-[#2396C6]  hover:bg-sky-600 text-white px-2 py-2 mt-2 w-full rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
           See more Property
          </button>
        </div>
    </div>
  </div>
);


export default BudgetResultComponent