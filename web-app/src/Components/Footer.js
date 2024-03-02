import React from "react";

const Footer = () => {
  return (
    <div className="flex text-blue-200 justify-center w-full bg-black text-sm">
      <p className="m-4">
        Powered by{" "}
        <a
          className=" font-bold underline"
          href="https://penpalplayground.com"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          PenPal{" "}
        </a>{" "}
        &copy; 2024
      </p>
    </div>
  );
};

export default Footer;
