import React from 'react'
import Link from 'next/link'
import { Search , ArrowLeft , ChevronRightIcon} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Nav from '@/components/layout/nav'
import PartnerOnboarding from '@/components/layout/refer-leadform'
import {inter} from '@/lib/font/Inter'

function page() {
  return (
    <>
    <Nav/>
    <div className={` min-h-screen w-full bg-prv py-20 px-3 ${inter.className}`}>
           <div className="flex items-center justify-center gap-1 md:gap-3">
         <Link  href={"/dashboard/user"}>
          <Button variant="outline" className="mb-2  rounded-full"><ArrowLeft/></Button>
              </Link>

      <div className="flex items-center w-11/12 max-w-md mb-3">
         <h1 className={`${inter.className} text-2xl  font-bold text-gray-600 flex items-center`}>Refer Pro<ChevronRightIcon/></h1>
    
      </div>

      </div>
                <PartnerOnboarding/>




    </div>
    </>
  )
}

export default page