"use client";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
const LeadEntryComponent = lazy(
  () => import("../components/LeadEntryComponent"),
);
const LeadPaginationBar = lazy(() => import("../components/LeadPaginationBar"));
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import axios from "axios";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

/**
 * This page is the main landing page that contains the dashboard to view leads.
 */
export default function Home() {
  const [queryCount, setQueryCount] = useState(0);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("0");
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    msg: "Message sent!",
    code: "success",
  });

  const handleShowToast = (message: string, status: string) => {
    setToastMessage({
      msg: message,
      code: status,
    });
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  useEffect(() => {
    async function getLeads() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          //Sends GET request to the server
          baseUrl +
            "/dashboard/v1/lead/page/" +
            limit +
            "/" +
            chunkIndex +
            "/" +
            sort,
          { withCredentials: true },
        );

        setQueryCount(response.data.count);
        setLeads(response.data.data);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        const error_msg = err?.response?.data || "There was an error :(";
        handleShowToast(error_msg, "error");
        console.error(err);
      }
    }
    getLeads();
  }, [chunkIndex, limit, sort]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <Link href={"/create-lead"}>
          <button
            type="button"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-4"
          >
            + Add Lead
          </button>
        </Link>
        <LeadPaginationBar
          queryCount={queryCount}
          chunkIndex={chunkIndex}
          setChunkIndex={setChunkIndex}
          limit={limit}
          setLimit={setLimit}
          sort={sort}
          setSort={setSort}
        />
        {isLoading ? (
          <div>
            <Spinner message={"Loading"} />
          </div>
        ) : (
          <>
            {leads.length === 0 ? <p>No leads in the system.</p> : <></>}
            {leads.map((lead: any) => (
              <Suspense key={lead?.id} fallback={<></>}>
                <LeadEntryComponent lead={lead} />
              </Suspense>
            ))}
          </>
        )}
        {showToast && (
          <Toast
            message={toastMessage.msg}
            status={toastMessage.code}
            onClose={() => setShowToast(false)}
          />
        )}
        <LeadPaginationBar
          queryCount={queryCount}
          chunkIndex={chunkIndex}
          setChunkIndex={setChunkIndex}
          limit={limit}
          setLimit={setLimit}
        />
      </div>
    </div>
  );
}
