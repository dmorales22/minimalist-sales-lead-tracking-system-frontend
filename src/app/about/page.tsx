"use client";
import React from "react";
import Navbar from "../../components/Navbar";

/**
 * This page contains a simple about me of the application and the creator.
 */
export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="mx-4">
        <h2 className={"my-2 text-xl font-bold"}>About</h2>
        <p>
          Hope you guys enjoy the simple sales lead tracker. Have a nice day 🎉🎉🎉
        </p>
        <p>Created by David Morales, 2023</p>
      </div>
    </div>
  );
}
