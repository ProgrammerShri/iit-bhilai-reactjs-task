import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <>
      {/* <Navbar />   Add your public layout components here like Navbar, Footer etc. */}
      <div>{children}</div>
    </>
  );
};

export default PublicLayout;
