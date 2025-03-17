import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DynamicForm from "../../components/form/DynamicForm";
import toast from "react-hot-toast";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/form/Button";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { loading, setLoading } = useGlobalContext();
  const { loginAdmin } = useAuth();
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

    if (!emailPattern.test(form.email))
      newErrors.email = "Invalid email format.";
    if (!form.password) newErrors.password = "Password is required.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError("");

    try {
      const response = await loginAdmin(form.email, form.password);

      if (response.success) {
        navigate("/admin");
        toast.success("Logged In Successfully.");
      }
    } catch (err) {
      toast.error(error.response?.data?.message || "Something went wrong");
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) navigate("/admin");
  }, []);

  const formOptions = [
    {
      formType: "input",
      type: "email",
      label: "Email",
      name: "email",
      value: form.email,
      onChange: (e) => setForm((prev) => ({ ...prev, email: e.target.value })),
    },
    {
      formType: "input",
      type: "password",
      label: "Password",
      name: "password",
      value: form.password,
      onChange: (e) =>
        setForm((prev) => ({ ...prev, password: e.target.value })),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-light px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center">Welcome Back</h2>
        <p className="text-sm text-placeholder text-center ">
          Manage your portfolio with ease. Log in to upload and organize your
          photos.
        </p>

        <DynamicForm options={formOptions} />

        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            type="button"
            onClick={handleSubmit}
            loading={loading}
            className="w-full"
          >
            Login
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
