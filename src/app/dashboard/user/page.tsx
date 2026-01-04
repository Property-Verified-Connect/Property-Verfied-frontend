"use client";

import React, { JSX, useState } from "react";
import useRedirectByRole from "@/hooks/useRedirectByRole";
import Nav from "@/components/layout/nav";
import { Inter } from "next/font/google";
import MiddlewareLoader from "@/components/shared/middleware-loader";
import BottomNav from "@/components/shared/bottom-nav";
import PropertyDashboard from "@/components/layout/user-menu-1";
import UserProfile from "@/components/layout/user-profile";
import Order from "@/components/layout/order";
import InterestForm from "@/components/layout/InterestForm";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type ActiveTab = "Home" | "Menu" | "Profile" | string;

export default function Page(): JSX.Element {
  // if your hook returns something other than boolean adjust the type accordingly
  const loading = useRedirectByRole() as boolean;
  const [active, setActive] = useState<ActiveTab>("Home");

  if (loading) {
    return <MiddlewareLoader />;
  }

  return (
    <>
      <Nav />
      <div
        className={`${inter.className} min-h-screen w-full flex flex-col   bg-prv pt-12 md:pt-20`}
      >
        {active === "Home" ? (
          <PropertyDashboard />
        ) : active === "Menu" ? (
         <Order/>
        ) : (
          <UserProfile/>
        )}

        <BottomNav active={active} setActive={setActive} type={"user"} />
        {/* <InterestForm/> */}
      </div>
    </>
  );
}
