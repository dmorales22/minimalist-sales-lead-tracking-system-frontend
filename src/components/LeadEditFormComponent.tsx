"use client";
import React, { useEffect, useState } from "react";
import Toast from "./Toast";
import Spinner from "./Spinner";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASEURL;

export default function LeadEditFormComponent(props: any) {
  const id = props.id;
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    status: "",
    estimatedSaleAmount: "",
  });
  const [lead, setLead] = useState({
    name: "",
    email: "",
    status: "",
    estimatedSaleAmount: "",
    estimatedCommission: "",
  });
  const [editedLead, setEditedLead] = useState({});
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
    setLead((lead: any) => ({ ...lead, [name]: value }));
    setEditedLead((editLead: any) => ({ ...editLead, [name]: value }));
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
      const response = await axios.patch(
        //Sends POST request to the server
        baseUrl + "/dashboard/v1/lead/" + id,
        { update_obj: editedLead },
        { withCredentials: true },
      );

      handleShowToast(response.data, "success");
      setIsLoading(false);
    } catch (err: any) {
      console.error(err);
      const error_msg = err?.response?.data || "There was an error :(";
      handleShowToast(error_msg, "error");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getLeadById() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          //Sends POST request to the server
          baseUrl + "/dashboard/v1/lead/" + id,
          { withCredentials: true },
        );

        const parseObj = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          status: response.data.status,
          estimatedSaleAmount: response.data.estimatedSaleAmount.toString(),
          estimatedCommission: response.data.estimatedCommission.toString(),
        };
        setLead(parseObj);
        setIsLoading(false);
      } catch (err: any) {
        setIsLoading(false);
        const error_msg = err?.response?.data || "There was an error :(";
        handleShowToast(error_msg, "error");
        console.error(err);
      }
    }
    getLeadById();
  }, []);

  return (
    <div className="p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form onSubmit={handleLeadFormSubmit}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="name"
          id="name"
          type="text"
          placeholder="John Doe"
          value={lead?.name}
          onChange={handleInputs}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="email"
          type="email"
          placeholder="johndoe@email.com"
          value={lead?.email}
          onChange={handleInputs}
        />
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="status"
        >
          Status
        </label>
        <select
          className="shadow appearance-none bg-white border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Select Status"
          name={"status"}
          value={lead?.status}
          onChange={handleInputs}
        >
          <option value={"prospect"}>Prospect</option>
          <option value={"active"}>Active</option>
          <option value={"unqualified"}>Unqualified</option>
        </select>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Estimated Sales Amount (USD)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          name="estimatedSaleAmount"
          type="number"
          placeholder="25"
          value={lead?.estimatedSaleAmount}
          onChange={handleInputs}
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
