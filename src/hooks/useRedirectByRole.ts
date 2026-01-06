"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getCookieValue } from "@/function/cookies";

type UserData = {
  id: string;
  email?: string;
  role?: string;
  is_Interested_filled?: boolean;
};

export default function useRedirectByRole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);
  const BASEURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    let isMounted = true;

    const checkRole = async () => {
      try {
        // 1️⃣ Try localStorage first
        const stored = localStorage.getItem("userdata");

        if (stored) {
          const parsed = JSON.parse(stored);
          if (isMounted) setUser(parsed);
        } else {
          // 2️⃣ Fetch from backend
          const res = await axios.get(`/api/user/profile`);

          localStorage.setItem("userdata", JSON.stringify(res.data));

          if (isMounted) setUser(res.data);
        }
      } catch (err) {
        console.error("Error checking role:", err);
        router.replace("/auth/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkRole();

    return () => {
      isMounted = false;
    };
  }, [router, BASEURL]);

  // ✅ RETURN USER
  return { loading, user };
}
