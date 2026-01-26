import React from 'react';
import { MapPin, Home, Bed, Bath, Square, Heart, Building, Grid2X2, House, Star, CheckCircle, PanelBottom } from 'lucide-react';
import Link from 'next/link';
import { Span } from 'next/dist/trace';
 
 
export default function RecommandationCard({property ,type}) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden group">
        <img 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
          src={property.photos[0]}
        />
        {/* Overlay Badge */}
        <div className="absolute top-3 flex items-center justify-center gap-2  left-3 bg-sky-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Verified <CheckCircle size={14}/>
        </div>
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors">
          <Star className="w-5 h-5 text-gray-600" size={11} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Location */}
         <h1 className='font-bold text-2xl'>{property?.property_name}</h1>
         <p className='text-xs flex items-center gap-1 '> <MapPin size={13}/>{property?.location},{property.city} </p>
         <div className="flex items-center mb-2 gap-2 mt-2">
            <span className="bg-blue-50 text-blue-700 text-xs flex items-center gap-1 font-medium px-2 py-1 rounded">
              
               {property.property_type == "Independent House / Villa" ? <House size={12}/>:property.property_type == "Plot / Land" ?  <Grid2X2 size={12}/> :    <Building size={12}/>}
              {property.property_type == "Independent House / Villa" ?"House / Villa":property.property_type}
            </span>
     
          <span className="bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
              {property.looking_for}
            </span>
          </div>

                 <span className="bg-gray-100 text-gray-700 text-xl font-semibold px-2 py-1 rounded">
              ₹{property.price.toLocaleString('en-IN')}
              
               {type == "Rent" && <span className='text-sm'> / month</span>}
            </span>

            {
              type =="Rent" &&    <>
              <div className='h-10 flex items-center justify-center   mt-2 overflow-hidden rounded-xl w-full bg-slate-100'>
                                <div className='h-full w-[33%] gap-1 flex items-center justify-center  mt-1 overflow-hidden  '>
                               { property?.bedroom}
                                <Bed size={20}/>

                          </div>
                          
                            <div className='h-10  w-[33%] mt-1 flex gap-1 items-center justify-center overflow-hidden  '>
                                     { property?.bathroom}
                              <Bath size={20}/>
                          </div>
                         
                          </div>

                           <div className='flex items-center justify-center mt-3 bg-slate-100 p-2 rounded-xl  gap-10 '>
              <h1 className='text-xs text-center'> <strong>Capacity </strong> <br /> {property.capacity}</h1>
              <h1 className='text-xs text-center'> <strong>Tetants </strong><br />  {property.alreadyrent || "None"} </h1>
               <h1 className='text-xs text-center'> <strong>Empty </strong> <br /> {property.capacity - property.alreadyrent || "None"} </h1>
              </div>
              </> 
              
            }
          

        <div className="flex items-center h-auto mt-1   gap-2">
  <span className="bg-gray-100 text-gray-700 mt-1 py-0.5 text-xs font-semibold px-2 rounded line-clamp-3">
    {property.description}
  </span>
</div>


        {/* Property Type */}

        {/* Price and Action */}
        <div className="flex items-start justify-between w-full flex-col ">
       
       <Link className='w-full'  href={`/dashboard/user/find-property/property-list/proprerty-info/${property.id}?navigation=ai`}>
       
          <button className="bg-[#2396C6]  hover:bg-blue-700 text-white px-1 py-1 mt-2 w-full rounded-lg font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg">
           Visit Property
          </button>
       </Link>
        </div>
      </div>
    </div>
  );
}