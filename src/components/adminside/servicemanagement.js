"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManageServices() {
  const router = useRouter();

  useEffect(() => {
    async function check() {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (!data.loggedIn) {
        router.push("/adminside/login");
      }
    }

    check();
  }, [router]);

  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl font-bold">Manage Services</h1>
      {/* CRUD UI yahan baad me add hogi */}
    </div>
  );
}
