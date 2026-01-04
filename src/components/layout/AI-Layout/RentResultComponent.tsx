import RecommandationCard from '@/components/shared/recommdationCard';
import { Building2, MapPin, Home, IndianRupee, Star, Bed, Bath, PanelBottom, Badge } from 'lucide-react';
import React from 'react'

const RentResultComponent = ({ answers , predictions }: { answers: string[] }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg max-w-md">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-blue-100 p-2 rounded-full">
        <Building2 className="text-blue-600" size={24} />
      </div>
      <h3 className="font-bold text-lg">Rent Match Found</h3>
    </div>
    
    <div className="space-y-2 text-sm mb-4">
      <div className="flex items-center gap-2">
        <MapPin size={14} className="text-blue-600" />
        <span className="text-gray-600">Area:</span>
        <span className="font-medium">{answers[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <Home size={14} className="text-green-600" />
        <span className="text-gray-600">Type:</span>
        <span className="font-medium">{answers[1]}</span>
      </div>
      <div className="flex items-center gap-2">
        <IndianRupee size={14} className="text-purple-600" />
        <span className="text-gray-600">Budget:</span>
        <span className="font-medium">{answers[2]}</span>
      </div>
    </div>

    <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-green-700">Perfect Match</span>

      </div>
      <p className="text-sm text-gray-700">✅ Matched with {predictions.length} verified roommates</p>
      <p className="text-xs text-gray-600 mt-2">Same profession + {answers[4]} lifestyle</p>
    </div>

    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs">
      <p className="font-semibold mb-1">✨ Benefits:</p>
      <ul className="space-y-1 text-gray-700">
        <li>• Safe verified locality</li>
        <li>• Similar lifestyle match</li>
        <li>• Low noise environment</li>
      </ul>
    </div>

      <h1 className='text-center  font-bold mb-2 text-zinc-600 mt-2' >Matching Rent Solution </h1>
 {
  predictions.length !== 0
  ?
    // <div className='h-auto w-full p-2 bg-white  rounded-xl'>
    //         <div className='h-40  rounded-2xl overflow-hidden w-full '>
    //                <img src={predictions[0]?.photos[0]} alt="" />
    //         </div>
    //            <div className='h-10 flex items-center justify-center   mt-2 overflow-hidden rounded-xl w-full bg-slate-100'>
    //               <div className='h-full w-[33%] gap-1 flex items-center justify-center  mt-1 overflow-hidden  '>
    //              { predictions[0]?.bedroom}
    //               <Bed size={20}/>
    //         </div>
    //           <div className='h-10  w-[33%] mt-1 flex gap-1 items-center justify-center overflow-hidden  '>
    //                    { predictions[0]?.bathroom}
    //             <Bath size={20}/>
    //         </div>
    //           <div className='h-10 w-[33%]  mt-1 flex gap-1 items-center justify-center  overflow-hidden  '>
    //                    { predictions[0]?.balconies}
    //             <PanelBottom size={20}/>
    //         </div>
    //         </div>
    //           <div className='  mt-2 overflow-hidden rounded-xl p-2 w-full '>
    //             <h1 className='font-bold text-zinc-600'>{predictions[0].property_name}</h1>
    //             <div className='flex gap-2 mt-2'>
    //             <h1 className='text-xs'>{predictions[0].location}</h1>
    //                 <div className='text-xs inline-flex rounded  bg-prv gap-1 items-center justify-center px-2 '> <Home size={12 }/> {predictions[0].property_type}</div>
    //             </div>
                
    //             <div className='flex items-center justify-center mt-3 bg-slate-100 p-2 rounded-xl  gap-10 '>
    //             <h1 className='text-xs text-center'> <strong>Capacity </strong> <br /> {predictions[0].capacity}</h1>
    //             <h1 className='text-xs text-center'> <strong>Tetants </strong><br />  {predictions[0].alreadyrent || "None"} </h1>
    //              <h1 className='text-xs text-center'> <strong>Empty </strong> <br /> {predictions[0].capacity-predictions[0].alreadyrent || "None"} </h1>
    //             </div>

    //                 <div className=' mt-3  p-2 rounded-xl  gap-10 '>
    //             <h1 className='text-xs '> <strong>Tetant Profession :</strong>  {predictions[0].profession}</h1>
    //              <h1 className='text-xs '> <strong>Description :</strong>  {predictions[0].description}</h1>
    //               <h1 className='text-xs '> <strong>Partner :</strong>  {predictions[0].user_id.name}</h1>
    //                 <h1 className='text-sm '> <strong>Price :</strong>  ₹{predictions[0].price}</h1>
    //           <h1 className='text-sm '> <strong>Rent Price :</strong> {predictions[0].price} / {predictions[0].capacity} = ₹{predictions[0].price/predictions[0].capacity} Each Tetant</h1>
                  
    //               </div>
    //         </div>
    // <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
    //   Schedule Property Visit
    // </button>
    // </div>

       predictions.map((val ,inx)=>(
         <RecommandationCard key={inx} property={val} type ="Rent"/>

       ))
  
  :
    <h1 className='text-center capitalize'>No match found</h1>
 }

    

  </div>
);


export default RentResultComponent