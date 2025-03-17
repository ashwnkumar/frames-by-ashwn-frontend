import React, { useState } from "react";
import Button from "../../components/form/Button";
import { ChevronsDown } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import {
  faArtstation,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import SocialIcon from "../../components/SocialIcon";
import DynamicForm from "../../components/form/DynamicForm";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useGlobalContext } from "../../contexts/GlobalContext";

const socialLinks = [
  {
    href: "https://www.instagram.com/frames.by.ashwn/",
    icon: faInstagram,
  },
  {
    href: "https://in.pinterest.com/ashwnkumar07/",
    icon: faPinterest,
  },
  {
    href: "https://www.artstation.com/ashwnkumar",
    icon: faArtstation,
  },
];

const Home = () => {
  const { adminDetails } = useAuth();
  const { setLoading } = useGlobalContext();
  const [formData, setFormData] = useState({
    senderName: "",
    senderMail: "",
    subject: "",
    message: "",
  });

  const adminLanding =
    adminDetails?.landingPageUrl?.trim() !== ""
      ? adminDetails?.landingPageUrl
      : null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("formData before call", formData);
      const response = await axiosInstance.post("/send-email", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Email sent successfully!");
        setFormData({
          senderName: "",
          senderMail: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error("Unable To Send Email. Try again later.");
      }
    } catch (error) {
      toast.error("Something Went Wrong. Try again later.");
      console.log("Error sending email", error);
    } finally {
      setLoading(false);
    }
  };

  const formOptions = [
    {
      formType: "input",
      type: "text",
      name: "senderName",
      label: "Your Name",
      placeholder: "Your Name",
      required: true,
      value: formData.senderName,
      onChange: (e) => setFormData({ ...formData, senderName: e.target.value }),
    },
    {
      formType: "input",
      type: "text",
      name: "senderMail",
      label: "Your Email",
      placeholder: "So that I can get back to you",
      required: true,
      value: formData.senderMail,
      onChange: (e) => setFormData({ ...formData, senderMail: e.target.value }),
    },
    {
      formType: "input",
      type: "text",
      name: "subject",
      label: "Subject",
      placeholder: "Add a subject for your message",
      required: true,
      value: formData.subject,
      onChange: (e) => setFormData({ ...formData, subject: e.target.value }),
    },
    {
      formType: "textarea",
      type: "text",
      name: "message",
      label: "Message",
      placeholder: "Type your message here",
      required: true,
      value: formData.message,
      onChange: (e) => setFormData({ ...formData, message: e.target.value }),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center -mt-12">
      {/* Hero Section */}
      <div
        className="min-h-screen w-full bg-cover bg-center flex items-center justify-center font-bold"
        style={{
          backgroundImage: adminLanding
            ? `url(${adminLanding})`
            : "url(/landing.jpg)",
        }}
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
            className="text-light mt-4 w-10 h-10 md:w-16 md:h-16"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* About Section */}
      <div className="bg-light min-h-screen w-full flex flex-col md:flex-row items-center justify-evenly p-5 md:p-10">
        <div className="flex flex-col gap-4 items-center md:items-start justify-center w-full max-w-lg text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-normal">About the Artist</h3>
          <p className="text-sm md:text-base break-words">
            {adminDetails?.aboutText}
          </p>
          <Button navTo="/gallery" className="text-lg md:text-2xl">
            Let's Explore
          </Button>
        </div>
        {adminDetails?.profileUrl && (
          <div className="flex flex-col items-center justify-center w-full max-w-lg p-5">
            <div className=" rounded-full relative">
              <img
                src={adminDetails?.profileUrl || "/default-about.jpg"}
                className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full object-cover"
                alt="Profile"
              />
            </div>
          </div>
        )}
      </div>

      {/* About Section */}
      <div className="bg-light min-h-[50vh] w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-around p-5 md:p-10 gap-10">
        <div className="flex flex-col items-start justify-center w-full md:w-1/3">
          <h2 className="text-2xl md:text-4xl">
            Like what you see? Feel free to reach out!
          </h2>
          <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
            {socialLinks.map(({ href, icon }) => (
              <SocialIcon key={href} href={href} icon={icon} />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start justify-center w-full md:w-1/3">
          <h2 className="text-2xl md:text-4xl">Or Send Me A Message!</h2>
          <DynamicForm
            options={formOptions}
            onSubmit={handleSubmit}
            submitText="Send Message"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
