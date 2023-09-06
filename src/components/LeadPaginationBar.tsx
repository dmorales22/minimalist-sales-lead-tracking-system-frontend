"use client";
import React, { useState } from "react";

/**
 * This component displays handles the pagination for dashboard
 * @param props
 * @constructor
 */
const LeadPaginationBar = (props: any) => {
  const queryCount = props?.queryCount;
  const chunkIndex = props?.chunkIndex;
  const setChunkIndex = props?.setChunkIndex;
  const limit = props?.limit;
  const setLimit = props?.setLimit;
  const sort = props?.sort;
  const setSort = props?.setSort;

  /**
   * This function handles inputs from the sort and limit select
   * @param event
   */
  function handleInputs(event: any) {
    const name = event.target.name;
    const value = event.target.value;

    switch (name) {
      case "limit":
        setLimit(parseInt(value));
        break;
      case "sort":
        setSort(value);
        break;
      default:
    }
  }
  /**
   * This function calculates the next page of entries
   * @param event
   */
  function handlePage(event: any) {
    let updatedChunkIndex = 0;
    const value = event.target.value;

    switch (value) {
      case "previous":
        if (chunkIndex > 0 && chunkIndex - limit >= 0) {
          updatedChunkIndex = chunkIndex - limit;
        }
        break;

      case "next":
        if (chunkIndex >= 0 && chunkIndex + limit < queryCount) {
          updatedChunkIndex = chunkIndex + limit;
        } else if (chunkIndex + limit > queryCount) {
          let modulus = chunkIndex % limit;
          updatedChunkIndex = chunkIndex - modulus;
        } else if (chunkIndex >= queryCount) {
          console.log("At max");
        }
        break;

      case "first":
        updatedChunkIndex = 0;
        break;

      case "last":
        let modulus = queryCount % limit;
        updatedChunkIndex = queryCount - modulus;
        break;
    }

    setChunkIndex(updatedChunkIndex);
  }

  return (
    <div>
      <button
        className="text-black bg-[#f1f1f1] hover:bg-[#f1f1f1]/90 focus:ring-4 focus:outline-none focus:ring-[#f1f1f1]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#f1f1f1]/55 mr-2 mb-2"
        onClick={(e) => handlePage(e)}
        name={"chunk_index"}
        value={"first"}
      >
        {"<<"}
      </button>
      <button
        className="text-black bg-[#f1f1f1] hover:bg-[#f1f1f1]/90 focus:ring-4 focus:outline-none focus:ring-[#f1f1f1]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#f1f1f1]/55 mr-2 mb-2"
        onClick={(e) => handlePage(e)}
        name={"chunk_index"}
        value={"previous"}
      >
        {"<"}
      </button>
      <button
        className="text-black bg-[#f1f1f1] hover:bg-[#f1f1f1]/90 focus:ring-4 focus:outline-none focus:ring-[#f1f1f1]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#f1f1f1]/55 mr-2 mb-2"
        onClick={(e) => handlePage(e)}
        name={"chunk_index"}
        value={"next"}
      >
        {">"}
      </button>
      <button
        className="text-black bg-[#f1f1f1] hover:bg-[#f1f1f1]/90 focus:ring-4 focus:outline-none focus:ring-[#f1f1f1]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#f1f1f1]/55 mr-2 mb-2"
        onClick={(e) => handlePage(e)}
        name={"chunk_index"}
        value={"last"}
      >
        {">>"}
      </button>
      <select
        className="shadow appearance-none bg-white border rounded w-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2 mr-1"
        name={"sort"}
        onChange={handleInputs}
        value={sort}
      >
        <option value={"0"}>Oldest</option>
        <option value={"1"}>Latest</option>
      </select>
      <select
        className="shadow appearance-none bg-white border rounded w-[75px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2"
        name={"limit"}
        onChange={handleInputs}
        value={limit}
      >
        <option value={"5"}>5</option>
        <option value={"10"}>10</option>
        <option value={"25"}>25</option>
        <option value={"50"}>50</option>
      </select>
      <p>
        {chunkIndex + 1}-{limit + chunkIndex} of {queryCount}
      </p>
    </div>
  );
};

export default LeadPaginationBar;
