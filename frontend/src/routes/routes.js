import React from "react";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const HomeRoute = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </React.Suspense>
  );
};

const BookAppointment = React.lazy(() =>
  import("../components/BookAppointment")
);
const BookAppointmentRoute = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <BookAppointment />
    </React.Suspense>
  );
};

export { HomeRoute, BookAppointmentRoute };
