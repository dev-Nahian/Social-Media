import Field from "../common/Field";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  const submitForm = async (formData) => {
    console.log(formData);
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      setError("root.random", {
        type: "random",
        message: `something went wrong: ${error.message} `,
      });
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="border-b border-[#3F3F3F] pb-10 lg:pb-[30px]"
    >
      <Field label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name Is Required" })}
          className={`auth-input ${
            errors.firstName ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter Your First Name"
        />
      </Field>

      <Field label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName")}
          className={`auth-input ${
            errors.lastName ? "border-red-500" : "border-gray-200"
          }`}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter Your Last Name"
        />
      </Field>

      <Field label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email ID Is Required" })}
          className={`auth-input ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email Id"
        />
      </Field>

      <Field label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password Is Missing",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`auth-input ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          name="password"
          id="password"
          placeholder="Enter Your Password"
        />
      </Field>

      <p className="my-3 text-red-400">{errors?.root?.random?.message}</p>

      <Field>
        <button
          className="auth-input bg-lwsGreen font-bold text-deepDark transition-all hover:opacity-90"
          type="submit"
        >
          Register
        </button>
      </Field>
    </form>
  );
}
