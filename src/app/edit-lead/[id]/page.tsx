"use client";
import React, { lazy, Suspense } from "react";
import Link from "next/link";
const LeadEditFormComponent = lazy(
  () => import("@/components/LeadEditFormComponent"),
);
const Navbar = lazy(() => import("../../../components/Navbar"));

export default function EditLeadPage({ params }: { params: { id: string } }) {
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
        <h2 className={"my-2 font-bold"}>Edit Lead</h2>
        <Suspense fallback={<></>}>
          <LeadEditFormComponent id={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
