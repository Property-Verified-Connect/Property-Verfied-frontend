import RecommandationCard from '@/components/shared/recommdationCard';
import inter from '@/lib/font/Inter';
import { Star, Users } from 'lucide-react';
import React from 'react'

const CategoryResultComponent = ({ answers , predictions , CategoryProperties }: { answers: string[] }) => (
  

  <div className={`${inter.className} bg-white rounded-2xl p-4 shadow-lg max-w-md`}>
    
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-purple-100 p-2 rounded-full">
        <Users className="text-purple-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Community Match</h3>
    </div>
    
    <div className="space-y-2 text-sm mb-4">
       <div className="flex justify-between">
        <span className="text-gray-600">city:</span>
        <span className="font-medium">{answers[0]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Profession:</span>
        <span className="font-medium">{answers[1]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Lifestyle:</span>
        <span className="font-medium">{answers[2]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Family Type:</span>
        <span className="font-medium">{answers[3]}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Mindset:</span>
        <span className="font-medium">{answers[4]}</span>
      </div>
    </div>

    <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-purple-700">Best Match</span>
        <div className="flex items-center gap-1">
          <Star className="text-yellow-500 fill-yellow-500" size={16} />
          <span className="font-bold text-purple-600">{predictions?.matching_score}%</span>
        </div>
      </div>
      <p className="font-semibold text-gray-800">{predictions?.best_match}</p>
      <p className="text-xs text-gray-600 mt-2">🏘️ Popular Areas: {predictions?.area.map((val , index)=>
       ( <p key={index}>{`${index + 1} ${val} `}</p>) 
      )}</p>
    </div>

      <div className="p-4 bg-gradient-to-r mt-2 from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
      <div className="flex  flex-col justify-between mb-2">
        <span className="font-bold text-purple-700 mb-1  ">Recommandation</span>
        <p className='text-xs'>
          {
            predictions?.recommendation
          }
        </p>
      </div>
    </div>

 <div className="p-4 bg-gradient-to-r flex items-center justify-center flex-col gap-1 mt-3 from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
       <p className=' text-sm mb-2 text-zinc-600 font-bold'>People with same Interest </p>
      { predictions?.people.map((val , index)=>
       (
         <div key={index} className=' w-full bg-slate-100 border-2 gap-2 rounded-xl  p-2 flex'>
          <div className='w-[20%] flex items-center justify-center '>
                <div className='h-10 w-10  rounded-full overflow-hidden border-2 '>
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" /> </div>
          </div>

                <div className='w-[80%]'>
                       <p className='text-xs'><strong>Name:</strong> {val.name}</p> 
                        <p className='text-xs'><strong>Profession:</strong> {val.profession}</p> 
                        {
                          val.area &&
                         <p className='text-xs'><strong>Area:</strong> {val.area}</p>
                        }
                </div>
         </div>

       ) 
      )}
    </div>

    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
      <div className="p-2 bg-blue-50 rounded text-center">
        <p className="font-semibold">Safe</p>
        <p className="text-gray-600">Choices</p>
      </div>
      <div className="p-2 bg-green-50 rounded text-center">
        <p className="font-semibold">Peer</p>
        <p className="text-gray-600">Network</p>
      </div>
      <div className="p-2 bg-purple-50 rounded text-center">
        <p className="font-semibold">Smart</p>
        <p className="text-gray-600">Invest</p>
      </div>
    </div>


      <div className="p-4 bg-gradient-to-r mt-2 from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
      <div className="flex  flex-col justify-between mb-2">
        <span className="font-bold text-purple-700 mb-1  ">Recommanded Property</span>
          {
            CategoryProperties?.length !== 0 ? 
            CategoryProperties.map((val ,index)=>(
              <RecommandationCard key={val?.id || index} property={val}/>

            ))
            : 
            <div>Recommanded property Not Found</div>
          }
      </div>
    </div>

   
  </div>
);


export default CategoryResultComponent