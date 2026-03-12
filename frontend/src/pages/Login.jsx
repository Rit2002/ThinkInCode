import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/signup.schema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../app/authSlice.js";

function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated, loading, error} = useSelector(state => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

   useEffect(() => {
      if(isAuthenticated) {
          navigate('/');
      }
    }, [isAuthenticated]);

  const submittedData = (data) => {
    dispatch(loginUser(data));
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
              <input
                {...register("password")}
                type="password"
                placeholder="Enter Password"
                className={`input w-full ${errors.password ? "input-error" : ""}`}
              />
              {errors.password && (
                <p className="label text-error">{errors.password.message}</p>
              )}
            </fieldset>

            <button type="submit" className="btn btn-primary btn-block mt-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
