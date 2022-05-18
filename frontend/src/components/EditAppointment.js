import React, { useState } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Modal,
  Button,
  Space,
} from "antd";
import { LOCAL_HOST } from "../utils/constant";
import axios from "axios";
import { MdModeEditOutline } from "react-icons/md";

const { Option } = Select;

const EditAppointment = ({ record }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [date, setDate] = useState(record.appointmentDate);
  const [time, setTime] = useState(record.appointmentTime);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    const { doctor, patientName, patientAge, patientGender, phone } = values;
    const newData = {
      id: record._id,
      doctor,
      patientName,
      patientAge,
      phone,
      patientGender,
      appointmentDate: date,
      appointmentTime: time,
    };
    axios.post(`${LOCAL_HOST}/update`, newData).then((res) => {
      form.resetFields();
      handleCancel();
    });
  };

  return (
    <div>
      <div className="text-3xl cursor-pointer h-full w-full md:mr-6">
        <MdModeEditOutline onClick={showModal} />
      </div>
      <Modal
        title={`Edit ${record.patientName} Appointment`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <div>
          <Form
            form={form}
            onFinish={onFinish}
            scrollToFirstError
            layout="vertical"
            initialValues={record}
            className="w-full max-w-lg"
            style={{
              margin: "auto",
              marginTop: "20px",
              paddingTop: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
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
              </Select>
            </Form.Item>

            <Space direction="vertical">
              <h1>Select Data and Time</h1>
              <div className="flex w-full md:w-96   justify-between">
                <DatePicker
                  rules={[{ required: true, message: "Please select date!" }]}
                  format={"DD-MM-YYYY"}
                  defaultValue={moment(date, "DD-MM-YYYY")}
                  onChange={(date, dateString) => {
                    setDate(dateString);
                  }}
                />
                <TimePicker
                  rules={[{ required: true, message: "Please select time!" }]}
                  use12Hours
                  format="h:mm a"
                  defaultValue={moment(time, "h:mm a")}
                  onChange={(time, timeString) => {
                    setTime(timeString);
                  }}
                />
              </div>
            </Space>

            <Form.Item
              style={{
                marginTop: "20px",
                width: "100%",
              }}
            >
              <div className="flex justify-end items-end">
                <Button onClick={() => handleCancel()}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default EditAppointment;
