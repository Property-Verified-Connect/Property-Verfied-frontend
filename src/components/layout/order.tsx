import React, { useEffect, useState } from "react";
import inter from "@/lib/font/Inter";
import OrderCard from "../shared/orderCard";
import { ChevronRight, Search } from "lucide-react";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import useCheckRole from "@/hooks/useCheckToken";
import MiddlewareLoader from "../shared/middleware-loader";

function Order() {
  const [Orders, setOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  
  const [active, setActive] = useState<ActiveTab>("Home");

  // 👉 Fetch Orders
  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/user/getOrder`);

        setOrders(response.data.booking || []);
        console.log(response);
      } catch (error) {
        console.error("something went wrong", error);
      } finally {
        setIsLoading(false);
      }
    };

    getOrder();
  }, []);

  // 👉 FILTER LOGIC
  const filteredOrders = Orders.filter((order) => {
    const text = searchText.toLowerCase();

    return (
      order.property_approved?.property_name.toLowerCase().includes(text) ||
      order.property_approved.location.toLowerCase().includes(text) ||
      order.property_approved.user_id.name.toLowerCase().includes(text) ||
      order.status.toLowerCase().includes(text)
    );
  });

  return (
    <div
      className={`${inter.className} p-2 text-2xl text-gray-500 flex flex-col md:items-center md:justify-center overflow-hidden pt-24 mb-30 min-h-screen w-full -mt-20`}
    >
      <div>
        <h1 className="flex items-center font-bold">
          Orders <ChevronRight />
        </h1>

        {/* 🔍 Search Box */}
        <div className="flex items-center bg-white rounded-full shadow px-3 w-full mt-2 max-w-md mb-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by property name, location, partner..."
            className="w-full px-3 py-2 text-sm outline-none bg-transparent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        {/* Order List */}
        <div className="h-full w-full mt-3 gap-4 flex flex-col items-center justify-center">
          {isLoading ? (
            // 🔄 Loading State
            <>
              <div className="w-full h-96 max-w-2xl bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-[60%]" />
                <Skeleton className="h-10 w-[50%]" />
                <Skeleton className="h-10 w-[40%]" />
              </div>
              <div className="w-full h-96 max-w-2xl bg-white border rounded-lg shadow-sm p-4 flex flex-col gap-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-[60%]" />
                <Skeleton className="h-10 w-[50%]" />
                <Skeleton className="h-10 w-[40%]" />
              </div>
            </>
          ) : filteredOrders.length > 0 ? (
            // ✅ Orders Found
            filteredOrders.map((val, index) => (
              <OrderCard
                key={index}
                Orders={val}
                image="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
              />
            ))
          ) : Orders.length === 0 ? (
            // 📭 No Orders at All
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Orders Yet
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                You haven't placed any orders yet. Start exploring properties to make your first booking!
              </p>
            </div>
          ) : (
            // 🔍 No Search Results
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Results Found
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-md">
                No orders match "{searchText}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;