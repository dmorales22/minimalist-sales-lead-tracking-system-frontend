"use client";
import React, { lazy, Suspense } from "react";
const Navbar = lazy(() => import("../../components/Navbar"));

export default function AboutPage() {
  return (
    <div>
      <Suspense fallback={<></>}>
        <Navbar />
      </Suspense>
      <div className="mx-4">
        <h2 className={"my-2 font-bold"}>About</h2>
        <p>Hope you guys enjoy the simple sales tracker.</p>
        <p>Created by David Morales, 2023</p>
      </div>
    </div>
  );
}
