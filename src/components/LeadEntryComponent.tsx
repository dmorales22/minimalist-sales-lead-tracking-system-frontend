"use client";
import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Toast from "@/components/Toast";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

/**
 * This component displays information of a specific Lead
 * With buttons that can edit and delete a specific Lead
 * @param props
 * @constructor
 */
const LeadEntryComponent = (props: any) => {
  const [showToast, setShowToast] = useState(false);
  const [deletionFlag, setDeletionFlag] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    msg: "Message sent!",
    code: "success",
  });

  /**
   * This function handles the toast notification
   * @param message
   * @param status
   */
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

  /**
   * This function handles the delete function for a Lead entry.
   * @param event
   * @author David Morales
   */
  async function handleDelete(event: any) {
    event.preventDefault();
    try {
      const response = await axios.delete(
        //Sends DELETE request to the server
        baseUrl + "/dashboard/v1/lead/" + props?.lead?.id,
        { withCredentials: true },
      );

      handleShowToast(response.data, "success");
      setDeletionFlag(true);
    } catch (err: any) {
      console.error(err);
      const error_msg = err?.response?.data || "There was an error :(";
      handleShowToast(error_msg, "error");
    }
  }

  return (
    <>
      {deletionFlag ? (
        <>
          {showToast && (
            <Toast
              message={toastMessage.msg}
              status={toastMessage.code}
              onClose={() => setShowToast(false)}
            />
          )}
        </>
      ) : (
        <div className="p-4 my-2 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
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
            <p>Estimated Sale Amount: ${props.lead?.estimatedSaleAmount}</p>
            {props.lead?.status !== "unqualified" ? (
              <p>
                Estimated Commission Amount: ${props.lead?.estimatedCommission}
              </p>
            ) : (
              <></>
            )}
          </div>
          <br />
          <Link href={"/edit-lead/" + props?.lead?.id}>
            <button
              type="button"
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            >
              <PencilIcon className="h-5 w-5 mr-2" aria-hidden="true" />
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="text-white bg-[#C70000] hover:bg-[#C70000]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
            onClick={handleDelete}
          >
            <TrashIcon className="h-5 w-5 mr-3" aria-hidden="true" />
            Delete
          </button>
        </div>
      )}{" "}
    </>
  );
};

export default LeadEntryComponent;
