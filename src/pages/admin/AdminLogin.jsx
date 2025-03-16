import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";
import envConfig from "../../utils/envConfig";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, setLoading } = useGlobalContext();
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const validateForm = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required.";
    if (form.email !== envConfig.adminEmail) newErrors.email = "Invalid email.";
    if (!emailPattern.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.password) newErrors.password = "Password is required.";
    if (form.password !== envConfig.adminPassword)
      newErrors.password = "Invalid password.";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      const { data } = await axiosInstance.post("/admin/login", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem("adminToken", data.token);
      toast.success("Login successful.");
      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) navigate("/admin");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">
          Welcome Back, {envConfig.adminName}!
        </h2>
        <p className="text-sm text-placeholder text-center mb-6">
          Manage your portfolio with ease. Log in to upload and organize your
          photos.
        </p>

        <form className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            id="email"
            placeholder="admin@portfolio.com"
            value={form.email}
            onChange={handleChange}
            error={error.email}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            error={error.password}
            required
          />

          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full mt-2"
            loading={loading}
          >
            Log In
          </Button>
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="w-full mt-2"
            loading={loading}
            variant="secondary"
          >
            Back to Home
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
