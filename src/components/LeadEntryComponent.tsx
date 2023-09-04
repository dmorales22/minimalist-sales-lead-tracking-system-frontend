"use client";
import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

async function handleDelete(event: any) {}

const LeadEntryComponent = (props: any) => {
  return (
    <div className="p-4 my-2 rounded-md shadow-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <p className="text-lg">{props.lead?.name}</p>
      <p>{props.lead?.email}</p>
      <div>
        {props.lead?.status === "prospect" ? (
          <span className="bg-blue-100 text-white text-md font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-white">
            Prospect
          </span>
        ) : props?.lead?.status === "active" ? (
          <span className="bg-green-100 text-white text-md font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-white">
            Active
          </span>
        ) : props.lead?.status === "unqualified" ? (
          <span className="bg-red-100 text-white text-md font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-white">
            Unqualified
          </span>
        ) : (
          <></>
        )}
      </div>
      <br />
      <button
        type="button"
        className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
      >
        <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
        Edit
      </button>
      <button
        type="button"
        className="text-white bg-[#C70000] hover:bg-[#C70000]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
      >
        <TrashIcon className="h-5 w-5 mr-3" aria-hidden="true" />
        Delete
      </button>
    </div>
  );
};

export default LeadEntryComponent;
