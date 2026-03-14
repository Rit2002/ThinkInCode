import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "../schemas/signup.schema";
import { registerUser } from "../app/authSlice.js";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signupSchema) });

 

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const submittedData = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div
      data-theme="night"
      className="min-h-screen flex items-center justify-center bg-base-200"
    >
      <div className="card bg-base-100 w-full max-w-sm shadow-xl">
        <div className="card-body gap-4">
          <div className="card-title justify-center">
            <h2 className="text-3xl font-extrabold tracking-tight justify-center">
              <span className="text-base-content">Think</span>
              <span className="text-primary">In</span>
              <span className="text-base-content">Code</span>
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(submittedData)}
            className="flex flex-col gap-4"
          >
            {/* first name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              {/* 
                            1) In react-hook-form, register() tells the form system: “Hey, track this input field and store its value under the name firstName.” 
                            2) register function than return the object containing the properties like name,onChange,onBlur etc.
                            3)The Spread Operator ... than spreads the object properties into JSX props.
                                name="firstName"    
                                onChange={...}
                                onBlur={...}
                                ref={...}
                            4) Without spread : You would need to write like this
                                <input
                                name={register("firstName").name}
                                onChange={register("firstName").onChange}
                                onBlur={register("firstName").onBlur}
                                ref={register("firstName").ref}
                                />
                            */}
              <input
                {...register("firstName")}
                type="text"
                placeholder="Enter Name"
                className={`input w-full ${errors.firstName ? "input-error" : ""}`}
              />
              {errors.firstName && (
                <p className="label text-error">{errors.firstName.message}</p>
              )}
            </fieldset>

            {/* email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter Email"
                className={`input w-full ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && (
                <p className="label text-error">{errors.email.message}</p>
              )}
            </fieldset>

            {/* password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <div className="relative w-full">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`input w-full pr-10 ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    // Eye-off icon (hide password)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    // Eye icon (show password)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="label text-error">{errors.password.message}</p>
              )}
            </fieldset>
            {/* submit */}
            <button type="submit" className="btn btn-primary btn-block mt-2" disabled={loading}>
              Submit
            </button>
            {/* navigate to login */}
            <button
            type="button"
              onClick={() => navigate("/login")}
              className="btn btn-outline btn-primary btn-sm"
            >
              Already have an account? Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
