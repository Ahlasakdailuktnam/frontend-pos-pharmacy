import { FiLock, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  //  Check already login when open page
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await api.get("/api/user");
        const user = res.data;
        
        if (user.is_admin == 1) {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      } catch (err) {
        // not login = stay login page
      } finally {
        setChecking(false);
      }
    };

    checkLogin();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      //  get csrf token
      await api.get("/sanctum/csrf-cookie");

      //  login
      const res = await api.post("/login", form);

      const user = res.data.user;

      setSuccess("Login success");

      //  redirect by role
      setTimeout(() => {
        if (user.is_admin == 1) {
          navigate("/admin");
        } else {
          navigate("/staff");
        }
      }, 800);

    } catch (err) {
      const status = err.response?.status;

      if (status === 419) {
        setError("Session expired, please try again.");
      } else if (status === 401) {
        setError("Email or password wrong.");
      } else if (status === 422) {
        setError("Please fill all fields.");
      } else if (status === 429) {
        setError("Too many login attempts.");
      } else {
        setError("Server error.");
      }

    } finally {
      setLoading(false);
    }
  };

  if (checking) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D9488]/10 to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl px-10 py-8 flex flex-col items-center gap-5 w-[320px]">

        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#0D9488] border-t-transparent animate-spin"></div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">
            កំពុងពិនិត្យគណនី...
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            សូមរង់ចាំបន្តិច
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-bounce delay-100"></span>
          <span className="w-2 h-2 bg-[#0D9488] rounded-full animate-bounce delay-200"></span>
        </div>

      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0D9488]/10 to-gray-100 p-6">
      <div className="w-full max-w-5xl grid grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-[#0D9488] to-teal-600 text-white p-10 relative">
          <div className="absolute w-40 h-40 bg-white/10 rounded-full top-10 left-10"></div>
          <div className="absolute w-24 h-24 bg-white/10 rounded-full bottom-10 right-10"></div>

          <h1 className="text-3xl font-bold z-10">Pharmacy POS</h1>

          <p className="text-sm opacity-80 text-center mt-3 z-10">
            ប្រព័ន្ធគ្រប់គ្រងឱសថស្ថានសម្រាប់ការលក់ និងស្តុក
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-sm">

            <h2 className="text-2xl font-bold text-gray-800 text-center">
              ចូលប្រព័ន្ធ
            </h2>

            <p className="text-center text-gray-400 text-sm mt-1">
              សូមបញ្ចូលព័ត៌មានរបស់អ្នក
            </p>

            {/* error */}
            {error && (
              <div className="bg-red-100 text-red-600 p-2 rounded text-sm mt-4 text-center">
                {error}
              </div>
            )}

            {/* success */}
            {success && (
              <div className="bg-green-100 text-green-600 p-2 rounded text-sm mt-4 text-center">
                {success}
              </div>
            )}

            <div className="mt-6 space-y-4">

              {/* email */}
              <div className="relative">
                <FiUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="អ៊ីមែលអ្នកប្រើប្រាស់"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>

              {/* password */}
              <div className="relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="ពាក្យសម្ងាត់"
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-[#0D9488]"
                />
              </div>

              {/* actions */}
              <div className="flex justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  ចងចាំខ្ញុំ
                </label>

                <button
                  type="button"
                  className="text-[#0D9488]"
                >
                  ភ្លេចពាក្យសម្ងាត់?
                </button>
              </div>

              {/* button */}
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[#0D9488] hover:bg-teal-600 text-white py-3 rounded-xl font-semibold"
              >
                {loading ? "កំពុងចូល..." : "ចូលប្រើប្រាស់"}
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;