"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch("/api/auth/session");
        const text = await res.text(); // pehle text lo
        let data = {};
        try {
          data = text ? JSON.parse(text) : {};
        } catch (err) {
          console.error("Invalid JSON from /api/auth/session:", text);
        }

        if (data.authenticated) setSession(data.user);
        else setSession(null);
      } catch (err) {
        console.error("Session check failed", err);
        setSession(null);
      } finally {
        setLoading(false);
      }
    }

    checkSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 relative">
      {/* Top bar: Back + Login */}
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-orange-500 hover:text-orange-400 font-semibold"
        >
          <FaArrowLeft className="mr-2" />
          Back to Homepage
        </Link>

        {!session && (
          <button
            onClick={() => router.push("/adminsidepages/login")}
            className="bg-orange-600 hover:bg-orange-700 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Login as Admin
          </button>
        )}
      </div>

      <h1 className="text-4xl font-extrabold text-orange-500 mb-2">
        Admin Dashboard
      </h1>
      <p className="text-white mb-8 font-extrabold">MQI – Control Panel</p>

      {/* Notice */}
      {!session && (
        <div className="mb-8 border border-orange-500/40 bg-orange-500/10 p-4 rounded-lg text-orange-300">
          You are viewing the dashboard in <b>read-only mode</b>. Login to
          manage team, projects, and services.
        </div>
      )}

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Team Management",
            desc: "Add, edit, or remove team members displayed on the website.",
            route: "/adminsidepages/adminteam",
          },
          {
            title: "Projects Management",
            desc: "Control all demolition & excavation project showcases.",
            route: "/adminsidepages/adminprojects",
          },
          // {
          //   title: "Services Management",
          //   desc: "Update and maintain the list of services offered by MQI.",
          //   route: "/adminsidepages/adminservice",
          // },
          {
            title: "Contact Messages",
            desc: "View messages submitted from contact form.",
            route: "/adminsidepages/adminContacts",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="border border-gray-800 bg-zinc-950 rounded-xl p-6 hover:border-orange-500 transition"
          >
            <h2 className="text-xl font-bold text-orange-400 mb-2">
              {card.title}
            </h2>
            <p className="text-gray-400 mb-4">{card.desc}</p>
            <button
              onClick={() =>
                session
                  ? router.push(card.route)
                  : router.push("/adminside/login")
              }
              className={`w-full py-2 rounded-lg font-semibold transition ${
                session
                  ? "bg-orange-600 hover:bg-orange-700 text-black"
                  : "bg-gray-800 text-gray-400 cursor-not-allowed"
              }`}
            >
              {session
                ? `Manage ${card.title.split(" ")[0]}`
                : "Login Required"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer Quick Actions */}
      {session && (
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-wrap gap-4">
          <button
            onClick={() => router.push("/adminsidepages/dminsettings")}
            className="border border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-black px-5 py-2 rounded-lg transition"
          >
            Settings
          </button>

          <button
            onClick={async () => {
              await fetch("/api/auth/logout", { method: "POST" });
              setSession(null);
            }}
            className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-black px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
