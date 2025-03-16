import React, { useState } from "react";
import Input from "../../components/form/Input";
import FileInput from "../../components/form/FileInput";
import Button from "../../components/form/Button";
import toast from "react-hot-toast";
import { ChevronsDown } from "lucide-react";

const Home = () => {
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-center -mt-12">
      <div
        style={{ backgroundImage: "url(/landing.jpg)" }}
        className="min-h-screen w-full object-cover bg-cover bg-center flex items-center justify-center font-bold sticky top-0"
      >
        <div className="flex flex-col items-center justify-end min-h-screen w-full p-10">
          <h3 className="text-4xl font-light text-light">
            Capturing Moments, One{" "}
            <span style={{ fontFamily: "Smooch" }} className="text-6xl font-">
              Frame
            </span>{" "}
            at a Time
          </h3>
          <ChevronsDown className="text-light " size={60} strokeWidth={1.5} />
        </div>
      </div>
      <div className="bg-light min-h-screen w-full z-10">
        <div className="min-h-screen w-full object-cover bg-cover bg-center flex flex-row items-center justify-evenly">
          <div className="flex flex-col gap-4 items-start justify-center w-1/3 text-wrap p-10">
            <h3 className="text-4xl font-normal">About the Artist</h3>
            <p>
              Amet consectetur ex Lorem ut enim. Occaecat consequat magna cillum
              dolore enim sint id reprehenderit Lorem labore enim cillum ad
              minim. Reprehenderit dolor elit exercitation duis non.
            </p>
            <Button navTo="/gallery" className="text-2xl">
              Let's Explore
            </Button>
          </div>
          <div className="flex flex-col items-start justify-center w-1/3 text-wrap p-10">
            <div className="bg-red-400 rounded-full relative">
              <img src="/about.jpg" className="max-w-xl rounded-full " alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
