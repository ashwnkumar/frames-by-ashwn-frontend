import React, { useState } from "react";
import Input from "../../components/form/Input";
import FileInput from "../../components/form/FileInput";
import Button from "../../components/form/Button";
import toast from "react-hot-toast";
import { ChevronsDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const [value, setValue] = useState("");
  const { adminDetails } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center -mt-12">
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: adminDetails?.landingImageUrl || "url(/landing.jpg)",
        }}
        className="min-h-screen w-full bg-cover bg-center flex items-center justify-center font-bold"
      >
        <div className="flex flex-col items-center justify-end min-h-screen w-full p-5 md:p-10 text-center">
          <h3 className="text-xl md:text-4xl font-light text-light">
            Capturing Moments, One{" "}
            <span
              style={{ fontFamily: "Smooch" }}
              className="text-3xl md:text-6xl"
            >
              Frame
            </span>{" "}
            at a Time
          </h3>
          <ChevronsDown
            className="text-light mt-4"
            size={40}
            md:size={60}
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-light min-h-screen w-full flex flex-col md:flex-row items-center justify-evenly p-5 md:p-10">
        <div className="flex flex-col gap-4 items-start justify-center max-w-[90%] md:w-1/3 text-wrap text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-normal">About the Artist</h3>
          <p className="text-sm md:text-base">{adminDetails?.aboutText}</p>
          <Button navTo="/gallery" className="text-lg md:text-2xl">
            Let's Explore
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center max-w-[90%] md:w-1/3 p-5">
          <div className="bg-red-400 rounded-full relative">
            <img
              src={adminDetails?.profileUrl || "/default-about.jpg"}
              className="max-w-[200px] md:max-w-xl rounded-full"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
