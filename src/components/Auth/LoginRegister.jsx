//7.12.25
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axios"; // or your axios path
const LoginRegister = () => {
  const navigate = useNavigate();

  // --------------------------
  // FORM STATES
  // --------------------------
  const [form, setForm] = useState({
    uname: "",
    email: "",
    number: "",
    password: "",
    cpassword: "",
    plan: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordRules, setPasswordRules] = useState({
    letter: false,
    capital: false,
    number: false,
    special: false,
    length: false,
  });

  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [planInfo, setPlanInfo] = useState(null);
  const GST_RATE = 0; // Same as CI (GST disabled)

  // --------------------------
  // HANDLE FORM INPUT CHANGE
  // --------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate mobile number
    if (name === "number") {
      if (!/^\d{0,10}$/.test(value)) return;
    }

    // Password strength validation
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  // --------------------------
  // PASSWORD STRENGTH CHECK
  // --------------------------
  const checkPasswordStrength = (password) => {
    setPasswordRules({
      letter: /[a-z]/.test(password),
      capital: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      length: password.length >= 8,
    });
  };

  const isPasswordStrong = () =>
    Object.values(passwordRules).every((rule) => rule === true);

  // --------------------------
  // PLAN PRICE CALCULATION
  // --------------------------
  useEffect(() => {
    calculatePlan();
  }, [form.plan]);

  const calculatePlan = () => {
    let registration = 1000;
    let annual = 0;
    let packageAmount = 0;

    switch (form.plan) {
      case "premium":
        annual = 3000;
        break;

      case "seniorcare":
      case "cancer_care":
      case "mother_child_care":
      case "palliative_hospice_care":
      case "surgery_posthospital_care":
        annual = 3000;
        packageAmount = 12000;
        break;

      default:
        setPlanInfo(null);
        return;
    }

    let gst = (registration + annual + packageAmount) * GST_RATE;
    let total = registration + annual + packageAmount + gst;

    setPlanInfo({
      registration,
      annual,
      packageAmount,
      gst,
      total,
    });

    setForm((prev) => ({ ...prev, amount: total }));
  };

  // -----------------------------
// CHECK EMAIL & PHONE EXISTS
// -----------------------------
const checkUserExists = async () => {
  try {
    const response = await axios.post("/auth/check-user", {
      email: form.email,
      phone: "+91" + form.number
    });

    return response.data.success;
  } catch (err) {
    if (err.response?.data?.field === "email") {
      setErrors({ email: "Email already exists" });
    }
    if (err.response?.data?.field === "phone") {
      setErrors({ number: "Phone number already exists" });
    }

    return false;
  }
};


  // --------------------------
  // -- FORM SUBMIT
  // --------------------------
const handleSubmit = async (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (!form.uname.trim()) tempErrors.uname = "Name is required";
    if (!form.number || form.number.length !== 10)
      tempErrors.number = "Enter valid 10 digit mobile number";

    if (!form.password) tempErrors.password = "Password required";
    if (!isPasswordStrong())
      tempErrors.password = "Password does not meet all requirements";

    if (form.cpassword !== form.password)
      tempErrors.cpassword = "Passwords do not match";

    if (!form.plan) tempErrors.plan = "Please select membership plan";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // -------------------------------
    //  Submit to API
    // -------------------------------
      // Check email & phone exists
      const ok = await checkUserExists();
      if (!ok) return;

      // Only then start payment
      initiatePayment();

    //alert("Form Submitted (React Version)");
  };
// --------------------------
// PAYMENT HANDLER (PhonePe)
// --------------------------
const initiatePayment = async () => {
  try {
    const payload = {
      name: form.uname,
      mobileNumber: form.number,
      amount: form.amount,      // final total from plan calculation
      userId: "guest-user",     // you will replace later
      platform: "web"
    };

    console.log("Sending Payment Payload:", payload);

    const response = await axios.post(
      "/payments/initiate-payment",
      payload
    );

    console.log("Payment Initiated:", response.data);

    if (response.data.url) {
      console.log(response.data.url);
      
      window.location.href = response.data.url;
    } else {
      alert("Payment URL missing!");
    }
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Unable to start payment. Try again.");
  }
};
  // --------------------------
  // JSX UI
  // --------------------------
  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
         
          <div className="text-center">
          <div className="flex justify-center">
            <img 
              src="/assets/logo_new.png" 
              alt="AssistHealth" 
              className=" object-contain"
              style={{ width: 300  }} 
            />
          </div>
         <h2 className="text-center text-3xl font-bold text-gray-700 mb-10">
          Sign up
        </h2>
        </div>
        

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NAME */}
          <div>
            <input
              name="uname"
              placeholder="Enter Your Name"
              value={form.uname}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.uname && (
              <p className="text-red-500 text-sm">{errors.uname}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>


          {/* MOBILE */}
          <div>
            <input
              name="number"
              maxLength={10}
              placeholder="Enter Mobile Number"
              value={form.number}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={() => setShowPasswordInfo(true)}
              onBlur={() => setShowPasswordInfo(false)}
              className="w-full border p-3 rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}

            {/* PASSWORD RULES */}
            {showPasswordInfo && (
              <div className="mt-3 bg-gray-50 p-4 rounded-lg border">
                <h4 className="font-semibold mb-2">Password must contain:</h4>
                <ul className="space-y-1 text-sm">
                  <li className={passwordRules.letter ? "text-green-600" : "text-red-600"}>
                    ✓ At least one letter
                  </li>
                  <li className={passwordRules.capital ? "text-green-600" : "text-red-600"}>
                    ✓ At least one capital letter
                  </li>
                  <li className={passwordRules.number ? "text-green-600" : "text-red-600"}>
                    ✓ At least one number
                  </li>
                  <li className={passwordRules.special ? "text-green-600" : "text-red-600"}>
                    ✓ At least one special character
                  </li>
                  <li className={passwordRules.length ? "text-green-600" : "text-red-600"}>
                    ✓ Minimum 8 characters
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <input
              name="cpassword"
              type="password"
              placeholder="Confirm Password"
              value={form.cpassword}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {errors.cpassword && (
              <p className="text-red-500 text-sm">{errors.cpassword}</p>
            )}
          </div>

          {/* PLAN DROPDOWN */}
          <div>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Select Membership</option>
              <option value="premium">Premium (Preventive Health & Wellness)</option>
              <option value="seniorcare">Senior Care</option>
              <option value="cancer_care">Cancer Care</option>
              <option value="mother_child_care">Mother & Child Care</option>
              <option value="palliative_hospice_care">Palliative & Hospice Care</option>
              <option value="surgery_posthospital_care">Surgery & Post-Hospital Care</option>
            </select>

            {errors.plan && (
              <p className="text-red-500 text-sm">{errors.plan}</p>
            )}
          </div>

          {/* PLAN DETAILS BOX */}
          {planInfo && (
            <div className="bg-gray-50 border p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Membership Details</h4>
              <ul className="text-sm space-y-1">
                <li>Registration: ₹{planInfo.registration}</li>
                <li>Annual: ₹{planInfo.annual}</li>
                {planInfo.packageAmount > 0 && (
                  <li>Package Amount: ₹{planInfo.packageAmount}</li>
                )}
                <li>GST: ₹{planInfo.gst.toFixed(2)}</li>
                <li className="font-bold mt-2">Total: ₹{planInfo.total}</li>
              </ul>
            </div>
          )}

          {/* TERMS */}
          <div className="flex gap-2">
            <input type="checkbox" className="w-4" required />
            <p className="text-sm">
              You accept our{" "}
              <Link to="/terms" className="text-blue-500">Terms</Link>,{" "}
              <Link to="/privacy" className="text-blue-500">Privacy Policy</Link>,{" "}
              <Link to="/refund" className="text-blue-500">Refund Policy</Link>.
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={!isPasswordStrong()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
          >
            Buy Now
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 flex justify-between">
          <Link to="/" className="text-sm text-gray-600">← Back to Home</Link>
          <Link to="/login" className="text-sm text-blue-600">Already a Member?</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

