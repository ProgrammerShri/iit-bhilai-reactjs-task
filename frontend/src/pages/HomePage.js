import React from "react";
import { Button, Divider, Table } from "antd";
import axios from "axios";
import { LOCAL_HOST } from "../utils/constant";
import DeleteAppointment from "../components/DeleteAppointment";
import { useNavigate } from "react-router-dom";
import EditAppointment from "../components/EditAppointment";

const HomePage = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    axios.get(`${LOCAL_HOST}/getAllData`).then((res) => {
      setData(res.data);
    });
  }, [data]);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
    },
    {
      title: "Name",
      dataIndex: "patientName",
    },
    {
      title: "Age",
      dataIndex: "patientAge",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
    },

    {
      title: "Gender",
      dataIndex: "patientGender",
    },
    {
      title: "Date",
      dataIndex: "appointmentDate",
    },
    {
      title: "Time",
      dataIndex: "appointmentTime",
    },
    {
      title: "Action",

      render: (text, record) => {
        return (
          <div className="flex justify-start">
            <EditAppointment record={record} />
            <DeleteAppointment id={record._id} />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold ">Appointment Dashboard</h1>
      <Divider />

      <div>
        <Button
          type="primary"
          className="mt-4"
          onClick={() => navigate("/book-appointment")}
        >
          + Book Appointment
        </Button>
      </div>
      <Divider />
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ x: "calc(700px + 50%)", y: 240 }}
          rowKey="_id"
        />
      </div>
    </div>
  );
};

export default HomePage;
