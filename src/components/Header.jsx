import React from "react";
import Button from "./form/Button";

const Header = ({
  title = "Heading",

  desc,
  buttonData,
}) => {
  return (
    <div className="w-full flex items-center justify-between border-b border-gray pb-4">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p>{desc}</p>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        {buttonData &&
          buttonData.map((button, index) => <Button key={index} {...button} />)}
      </div>
    </div>
  );
};

export default Header;
