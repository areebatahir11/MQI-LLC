//adminside/contactsManage.js
"use client";

import { useEffect, useState } from "react";

export default function ContactsManage() {
  const [contacts, setContacts] = useState([]);
  async function fetchContacts() {
    try {
      const res = await fetch("/api/contact");

      if (!res.ok) throw new Error("API failed");

      const data = await res.json();

      setContacts(data.contacts || []);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <div className="grid gap-4">
          {contacts.map((c) => (
            <div
              key={c._id}
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl"
            >
              <h2 className="text-lg font-semibold">{c.name}</h2>
              <p className="text-sm text-gray-400">{c.email}</p>

              <p className="mt-3 text-gray-300">{c.message}</p>

              <p className="text-xs text-gray-500 mt-2">
                {new Date(c.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
