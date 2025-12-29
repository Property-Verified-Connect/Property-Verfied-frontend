
import {motion} from "framer-motion"

function StatusTimeline({ status }) {
  const steps = [
    "pending",
    "approved",
    "contact",
    "perchase"
  ];

  const activeIndex = steps.indexOf(status);

  return (
    <div className="w-full mt-4">
      {/* Circles + Lines */}
      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center w-full">
            
            {/* Circle */}
            <div
              className={`w-4 h-4 rounded-full border-2 
              ${index <= activeIndex ? "bg-green-500 border-green-500" : "bg-white border-gray-400"}
              `}
            ></div>

            {/* Line */}
            {index !== steps.length - 1 && (
              <motion.div
              initial={{width:0}}
               animate={{width:80}}

              
                className={`h-1 w-full 
                ${index < activeIndex ? "bg-green-500" : "bg-gray-300"}
                `}
              ></motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Labels */}
      <div className="flex mt-2">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center text-xs font-medium capitalize">
            <span
              className={`${index <= activeIndex ? "text-green-600" : "text-gray-500"}`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusTimeline;
