//This is just a functional component. No lifecycle needed like with a class component

import React from "react";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text center">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </footer>
  );
};
