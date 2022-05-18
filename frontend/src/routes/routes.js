import React from "react";
import { Spin } from "antd";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const HomeRoute = () => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      }
    >
      <HomePage />
    </React.Suspense>
  );
};

const BookAppointment = React.lazy(() =>
  import("../components/BookAppointment")
);
const BookAppointmentRoute = () => {
  return (
    <React.Suspense
      fallback={
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin size="large" />
        </div>
      }
    >
      <BookAppointment />
    </React.Suspense>
  );
};

export { HomeRoute, BookAppointmentRoute };
