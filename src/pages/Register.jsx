import { useNavigate } from "react-router";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { useForm } from "@tanstack/react-form";

export default function Register() {
  const { registerMutation } = useAuthMutation();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      registerMutation.mutate(value, {
        onSuccess: () => {
          alert("Registration successful!");
          navigate("/login");
        },
        onError: (error) => {
          const response = error.response?.data;
          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              form.setFieldMeta(field, (meta) => ({
                ...meta,
                errors: messages,
              }));
            });
          } else if (response?.message) {
            alert(response.message);
          }

          alert("Registration failed!");
          console.log(error.response?.data);
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
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xs md:w-xs border p-4">
          <legend className="fieldset-legend">Register</legend>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value ? "Name is Required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className="label">Name</label>
                <input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input border-none"
                  placeholder="Enter your Name"
                />
                {field.state.meta.errors && (
                  <p className="text-red-400">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => (!value ? "Name is Email" : undefined),
            }}
          >
            {(field) => (
              <div>
                <label className="label">Email</label>
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
                <label className="label">Password</label>
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
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
}
