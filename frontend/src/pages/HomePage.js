import React from "react";
import { Divider, Form, Table } from "antd";
import axios from "axios";
import { LOCAL_HOST } from "../utils/constant";

// import Table from "../components/Table/Table";

const HomePage = () => {
  const [form] = Form.useForm();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${LOCAL_HOST}/get`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctor",
      width: 150,
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      width: 150,
    },
    {
      title: "Patient Age",
      dataIndex: "patientAge",
    },
    {
      title: "Mobile",
      dataIndex: "phone",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold ">Book Appointment</h1>
      <Divider />

      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
          scroll={{ y: 240 }}
        />
      </div>
    </div>
  );
};

export default HomePage;
