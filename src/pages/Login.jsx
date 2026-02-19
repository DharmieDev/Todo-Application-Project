import { useNavigate } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { useForm } from "@tanstack/react-form";

export default function Login() {
  const { loginMutation } = useAuthMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: () => {
          navigate("/");
        },
        onError: () => {
          alert("Invalid Email or Password");
        },
      });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value ? "Email is Required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <legend className="fieldset-legend">Email</legend>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input border-none"
                  placeholder="Enter your Email"
                />
                {field.state.meta.errors && (
                  <p className="text-red-400">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) =>
                !value ? "Password is Required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <legend className="fieldset-legend">Password</legend>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input border-none"
                  placeholder="Enter your Password"
                />
                {field.state.meta.errors && (
                  <p className="text-red-400">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>
          <button
            type="submit"
            className="btn  bg-gray-300 dark:bg-gray-700 hover:bg-gray-400  dark:hover:bg-gray-800"
          >
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}
