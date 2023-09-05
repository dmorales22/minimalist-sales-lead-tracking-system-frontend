"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Link from "next/link";
const Navbar = lazy(() => import("../../components/Navbar"));
const LeadFormComponent = lazy(
  () => import("../../components/LeadFormComponent"),
);

export default function CreateLeadPage() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Navbar />
      </Suspense>
      <div className="mx-4">
        <Link href={"/"}>
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 my-4"
          >
            {"<- Back"}
          </button>
        </Link>
        <h2 className={"my-2 font-bold"}>Create New Lead</h2>
        <Suspense fallback={<></>}>
          <LeadFormComponent />
        </Suspense>
      </div>
    </div>
  );
}
