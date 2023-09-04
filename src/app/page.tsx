"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
const Navbar = lazy(() => import("../components/Navbar"));
const LeadEntryComponent = lazy(
  () => import("../components/LeadEntryComponent"),
);
import axios from "axios";
import { PencilIcon } from "@heroicons/react/20/solid";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export default function Home() {
  const [leads, setLeads] = useState([
    { id: 1, name: "David Morales", email: "dev@test.com", status: "prospect" },
    { id: 2, name: "David Morales", email: "dev@test.com", status: "prospect" },
  ]);
  useEffect(() => {
    async function getLeads() {
      try {
        const response = await axios.get(
          //Sends POST request to the server
          baseUrl + "/dashboard/v1/lead",
          { withCredentials: true },
        );
      } catch (err) {
        console.error(err);
      }
    }
    getLeads();
  }, []);

  return (
    <div>
      <Suspense fallback={<></>}>
        <Navbar />
      </Suspense>
      <div className="p-2">
        <button
          type="button"
          className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
        >
          + Add Lead
        </button>
        {leads.map((lead) => (
          <Suspense key={lead.id} fallback={<></>}>
            <LeadEntryComponent lead={lead} />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
