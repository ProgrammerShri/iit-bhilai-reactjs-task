import React from "react";

const HomePage = React.lazy(() => import("../pages/HomePage"));
const HomeRoute = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <HomePage />
    </React.Suspense>
  );
};

export { HomeRoute };
