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
              }))
            })
          } else if (response?.message) {
            alert(response.message)
          }
          
          alert("Registration failed!");
          console.log(error.response?.data);
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? "Name is Required" : undefined),
        }}
      >
        {(field) => (
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Name</legend>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="input"
                placeholder="Enter your Name"
              />
              {field.state.meta.errors && <p className="text-red-400">{field.state.meta.errors[0]}</p>}
            </fieldset>
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="input"
                placeholder="Enter your Email"
              />
              {field.state.meta.errors && <p className="text-red-400">{field.state.meta.errors[0]}</p>}
            </fieldset>
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => (!value ? "Password is Required" : undefined),
        }}
      >
        {(field) => (
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="input"
                placeholder="Enter your Password"
              />
              {field.state.meta.errors && <p className="text-red-400">{field.state.meta.errors[0]}</p>}
            </fieldset>
          </div>
        )}
      </form.Field>
      <button type="submit" className="btn">Register</button>
    </form>
  );
}
