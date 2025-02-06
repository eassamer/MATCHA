
import { FormField, FormFieldInput } from "./FormField";

interface FormProps {
    formFields: FormFieldInput[];
}
//TODO: ADD onSubmit event
export const Form: React.FC<FormProps> = ({ formFields }) => {
    return (
        <form className="flex flex-col lg:flex-row justify-around gap-8">
            {formFields.map((formField, index) => (
                <FormField key={index} {...formField} />
            ))}
        </form>
    );
};