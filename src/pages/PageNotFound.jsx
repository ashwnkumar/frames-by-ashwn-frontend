import { useState, useEffect } from "react";
import Button from "../components/form/Button";

const messages = [
  {
    header: "404 – Out of Focus!",
    description:
      "Oops! It looks like this page is just a blur. Try adjusting your settings or heading back to the homepage.",
  },
  {
    header: "404 – Negative Space",
    description:
      "This page might have been cropped out of the frame. Let's get you back in focus!",
  },
  {
    header: "404 – Lost in the Darkroom",
    description:
      "We tried developing this page, but it seems the film got overexposed. Let’s find another shot!",
  },
  {
    header: "404 – Shutter Closed!",
    description:
      "Click! But no capture. This page might have vanished into thin air. Try another angle!",
  },
  {
    header: "404 – Out of Frame!",
    description:
      "Whoops! This page didn’t make it into the final composition. Let’s zoom out and find something else.",
  },
  {
    header: "404 – Empty Gallery",
    description:
      "This page must have been deleted from the album. Let’s snap our way back to safety!",
  },
  {
    header: "404 – Blurry Vision",
    description:
      "Looks like this page is a bit out of focus. Let’s bring things back into view!",
  },
  {
    header: "404 – Exposure Error",
    description:
      "This page is either underexposed or overexposed. Either way, it’s not visible!",
  },
  {
    header: "404 – Lens Cap Still On",
    description:
      "Oops! We forgot to take the lens cap off. This page isn’t showing up!",
  },
  {
    header: "404 – Photo Not Found",
    description:
      "This snapshot is missing from the album. Maybe check another roll of film?",
  },
];

const PageNotFound = () => {
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setMessage(randomMessage);
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen text-center bg-gray-100 p-6">
      <div className="flex flex-col gap-2 items-center justify-center w-full text-center">
        <h1 className="text-5xl font-bold text-dark">{message.header}</h1>
        <p className="text-2xl text-placeholder font-medium">
          {message.description}
        </p>
      </div>
      <Button navTo={"/"}>Go Back Home</Button>
    </div>
  );
};

export default PageNotFound;
