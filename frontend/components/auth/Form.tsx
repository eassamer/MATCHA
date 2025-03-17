import { FormField, FormFieldInput } from "./FormField";

interface FormProps {
  formFields: FormFieldInput[];
  className?: string;
}
//TODO: ADD onSubmit event
export const Form: React.FC<FormProps> = ({ formFields, className }) => {
  return (
    <form className={`${className} flex flex-col lg:flex-row`}>
      {formFields.map((formField, index) => (
        <FormField key={index} {...formField} />
      ))}
    </form>
  );
};
