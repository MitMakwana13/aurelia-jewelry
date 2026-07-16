"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useWishlistStore } from "@/lib/stores/wishlist";

export function WishlistInit() {
  const { data: session, status } = useSession();
  const { setItems, setLoading } = useWishlistStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      setItems([]);
    } else if (status === "authenticated") {
      setLoading(true);
      fetch("/api/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (data.items) {
            setItems(data.items);
          }
        })
        .catch((err) => {
          console.error("Failed to load wishlist", err);
          setLoading(false);
        });
    }
  }, [status, setItems, setLoading]);

  return null;
}
