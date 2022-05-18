import React from "react";
import axios from "axios";
import { LOCAL_HOST } from "../utils/constant";
import { MdDeleteForever } from "react-icons/md";

const DeleteAppointment = ({ id }) => {
  const deleteAppointment = () => {
    axios.post(`${LOCAL_HOST}/delete`, { id }).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <h1
        className="text-3xl text-red-600 md:mr-6 cursor-pointer h-full w-full"
        onClick={() => {
          deleteAppointment(id);
        }}
      >
        <MdDeleteForever />
      </h1>
    </div>
  );
};

export default DeleteAppointment;
