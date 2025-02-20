import { useContext } from "react";
import { FormField, FormFieldInput } from "../FormField";
import { SignupContext } from "@/context/SignupContext";

const Email = () => {
  const { state, dispatch } = useContext(SignupContext);
  const emailFormField = {
    label: "Email",
    type: "email",
    id: "email",
    required: true,
    value: state.email,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_EMAIL", payload: e.target.value });
    },
  };
  const passwordFormFields: FormFieldInput[] = [
    {
      label: "Password",
      type: "password",
      id: "password",
      required: true,
      value: state.password,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_PASSWORD", payload: e.target.value });
      },
    },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      required: true,
      value: state.confirmPassword,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_CONFIRM_PASSWORD", payload: e.target.value });
      },
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-center">
        <FormField {...emailFormField} />
      </div>
      <div className={`flex flex-col lg:flex-row gap-4`}>
        {passwordFormFields.map((formField, index) => (
          <FormField key={index} {...formField} />
        ))}
      </div>
    </div>
  );
};

export default Email;
