import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { loginUser } from "../../slices/authSlice";
import type { RootState } from "../../store";

// Travo Login Page - React + TypeScript + React Hook Form + Redux Toolkit

type LoginFormValues = {
  email: string;
  password: string;
};

export default function TravoLoginPage() {
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (values: LoginFormValues) => {
    dispatch(loginUser(values));
  };

  return (
    <div className="travo-container">
      <div className="travo-card">
        <div className="travo-header">
          <h1>Travo</h1>
          <p>Login to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="travo-form">
          <div className="travo-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="travo-error">{errors.email.message}</span>
            )}
          </div>

          <div className="travo-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required",
                },
              })}
            />
            {errors.password && (
              <span className="travo-error">{errors.password.message}</span>
            )}
          </div>

          {error && <p className="travo-error">{error}</p>}

          <button type="submit" className="travo-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="travo-footer">
          Don't have an account? <span>Sign up</span>
        </div>
      </div>
    </div>
  );
}