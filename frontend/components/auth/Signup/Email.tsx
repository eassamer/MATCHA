import { Form } from "../Form";

const Email = () => {
  const emailFormFields = [{ label: "Email", type: "email", required: true }];
  const passwordFormFields = [
    { label: "Password", type: "password", required: true },
    { label: "Confirm Password", type: "password", required: true },
  ];

  return (
    <div className="flex flex-col justify-center gap-4">
      <Form
        formFields={emailFormFields}
        className="w-full justify-center items-center"
      />
      <Form formFields={passwordFormFields} className="gap-4" />
    </div>
  );
};

export default Email;
