"use client";
import Navbar from "../components/Layout/navbar";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <section className="bg-zinc-950 text-white min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          {/* Form Card */}
          <div className="bg-black border border-zinc-800 rounded-xl p-10 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
              Contact <span className="text-orange-500">Us</span>
            </h1>
            <p className="text-white text-center mb-8">
              Get in touch with MQI Contractors for demolition & excavation services.
              We are ready to discuss your project requirements.
            </p>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:border-orange-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:border-orange-500"
                required
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-4 outline-none focus:border-orange-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-black font-semibold py-3 rounded-lg transition"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>

            {success && (
              <p className="mt-4 text-center text-green-400 font-semibold">
                {success}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-around items-center bg-black border border-zinc-800 rounded-xl p-8 space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-lg">📍 Muscat, Oman</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg">📞 +968 9741 0272</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg">✉️ info@mqicontractors.com</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}