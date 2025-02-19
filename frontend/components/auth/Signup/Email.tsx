import { FormField } from "../FormField";

const Email = () => {
  const emailFormField = { label: "Email", type: "email", required: true };
  const passwordFormFields = [
    { label: "Password", type: "password", required: true },
    {
      label: "Confirm Password",
      type: "password",
      id: "confirmPassword",
      required: true,
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
