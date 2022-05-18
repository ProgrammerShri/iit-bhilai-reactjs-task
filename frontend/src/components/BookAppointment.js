import React, { useState } from "react";
import { Form, Input, Select, Button, DatePicker, Space, Divider } from "antd";
import { TimePicker } from "antd";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LOCAL_HOST } from "../utils/constant";

const { Option } = Select;

const BookAppointment = () => {
  const [form] = Form.useForm();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    const { doctor, patientName, patientAge, patientGender, phone } = values;
    const newData = {
      doctor,
      patientName,
      patientAge,
      phone,
      patientGender,
      appointmentDate: date,
      appointmentTime: time,
    };

    axios.post(`${LOCAL_HOST}/book-appointment`, newData).then((res) => {
      form.resetFields();
      setTimeout(() => {
        navigate("/");
      }, 500);
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold ">Book Appointment</h1>
      <Divider />
      <div>
        <Form
          form={form}
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
          className="w-full max-w-lg"
          style={{
            margin: "auto",
            marginTop: "20px",
            paddingTop: "20px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #e8e8e8",
            boxShadow: "0px 0px 10px #e8e8e8",
          }}
        >
          <Form.Item
            name="doctor"
            label="Doctor"
            className="w-full md:w-96"
            rules={[{ required: true, message: "Please select a doctor!" }]}
          >
            <Select placeholder="Select">
              <Option value="Dr. Mahesh">Dr. Mahesh </Option>
              <Option value="Dr. Ramesh">Dr. Ramesh </Option>
              <Option value="Dr. Vijay">Dr. Vijay </Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="w-full md:w-96 "
            name="patientName"
            label="Patient Name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="w-full md:w-96"
            name="patientAge"
            label="Patient Age"
            rules={[
              {
                required: true,
                message: "Please input your age!",
              },

              {
                pattern: /^[0-9]*$/,
                message: "Please input a valid age!",
              },
              {
                max: 3,
                message: "Please input a valid age!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            className="w-full md:w-96 "
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },

              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <Input addonBefore={"+91"} />
          </Form.Item>

          <Form.Item
            className="w-full md:w-96 "
            name="patientGender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Space direction="vertical">
            <h1>Select Data and Time</h1>
            <div className="flex w-full md:w-96  justify-between">
              <DatePicker
                rules={[{ required: true, message: "Please select date!" }]}
                format={"DD-MM-YYYY"}
                onChange={(date, dateString) => {
                  setDate(dateString);
                }}
              />
              <TimePicker
                rules={[{ required: true, message: "Please select time!" }]}
                onChange={(time, timeString) => {
                  setTime(timeString);
                }}
                use12Hours
                format="h:mm a"
                defaultValue={moment("00:00", "HH:mm")}
              />
            </div>
          </Space>

          <Form.Item
            style={{
              marginTop: "20px",
              width: "100%",
            }}
          >
            <Button onClick={() => navigate("/")}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Book
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default BookAppointment;
