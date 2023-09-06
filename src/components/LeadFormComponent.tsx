"use client";
import React, { useState } from "react";
import Toast from "./Toast";
import Spinner from "./Spinner";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

/**
 * This component is a form to create a new lead.
 * @constructor
 */
export default function LeadFormComponent() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    status: "prospect",
    estimatedSaleAmount: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    msg: "Message sent!",
    code: "success",
  });

  function handleInputs(event: any) {
    const name = event.target.name;
    let value = event.target.value;

    setInputs((inputs: any) => ({ ...inputs, [name]: value }));
  }

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

  async function handleLeadFormSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        //Sends POST request to the server
        baseUrl + "/dashboard/v1/lead",
        {
          name: inputs.name,
          email: inputs.email,
          status: inputs.status,
          estimatedSaleAmount: inputs.estimatedSaleAmount,
        },
        { withCredentials: true },
      );

      handleShowToast(response.data, "success");
      setIsLoading(false);
      window.location.replace("/"); //Redirects to main page
    } catch (err: any) {
      console.error(err);
      const error_msg = err?.response?.data || "There was an error :(";
      handleShowToast(error_msg, "error");
      setIsLoading(false);
    }
  }

  // @ts-ignore
  return (
    <div className="p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form onSubmit={handleLeadFormSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name*
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="name"
          id="name"
          type="text"
          placeholder="John Doe"
          onChange={handleInputs}
          required
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email*
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          onChange={handleInputs}
          required
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status*
        </label>
        <select
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select Status"
          name={"status"}
          onChange={handleInputs}
        >
          <option value={"prospect"}>Prospect</option>
          <option value={"active"}>Active</option>
          <option value={"unqualified"}>Unqualified</option>
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="estimatedSaleAmount"
        >
          Sales Amount (USD)*
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="estimatedSaleAmount"
          type="number"
          placeholder="250"
          onChange={handleInputs}
          required
        />
        {isLoading ? (
          <div className="m-4">
            <Spinner message={"Loading..."} />
          </div>
        ) : (
          <button
            type="submit"
            className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mt-4"
          >
            Submit
          </button>
        )}
        {showToast && (
          <Toast
            message={toastMessage.msg}
            status={toastMessage.code}
            onClose={() => setShowToast(false)}
          />
        )}
      </form>
    </div>
  );
}
