import { Link } from "react-router-dom";
import Footer from "./Footer";


const Signup = () => {
  const imageUrl =
    "https://i.ibb.co/JjG6hBxG/Ecommerce-online-shopping-cart-filled-bags-and-packages-Ecommerce-concept-Premium-AI-generated-image.jpg";

  return (
    <>
      <div className="flex justify-center items-center h-3/4 p-10 bg-white font-sans">
        <div className="flex flex-col md:flex-row w-[90%] max-w-[900px] h-auto md:h-[550px] bg-white rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.1)] overflow-hidden">
          {/* Left Side Image */}
          <div
            className="flex-1 bg-cover bg-center h-[200px] md:h-auto"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>

          {/* Right Side Form */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h2 className="mb-5 text-2xl text-gray-800 font-semibold">SIGN UP</h2>
            <form className="flex flex-col gap-4">
   
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full p-3 border border-gray-300 rounded-md text-base"
                />
              </div>

              <input
                type="email"
                placeholder="Email"
                required
                className="p-3 border border-gray-300 rounded-md text-base"
              />

              <select
                required
                className="p-3 border border-gray-300 rounded-md text-base"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Country"
                required
                className="p-3 border border-gray-300 rounded-md text-base"
              />

              <input
                type="password"
                placeholder="Password"
                required
                className="p-3 border border-gray-300 rounded-md text-base"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                className="p-3 border border-gray-300 rounded-md text-base"
              />

              <Link to="/dashboard">
                <button
                  type="submit"
                  className="w-full p-3 bg-[#72338e] hover:bg-[#ad7ac4] text-white font-bold rounded-md transition-colors"
                >
                  Sign up
                </button>
              </Link>

              <Link to="/login">
                <button
                  type="button"
                  className="w-full p-3 bg-[#72338e] hover:bg-[#ad7ac4] text-white font-bold rounded-md transition-colors"
                >
                  Already have an account?
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <Footer/>

    </>
  );
};

export default Signup;
