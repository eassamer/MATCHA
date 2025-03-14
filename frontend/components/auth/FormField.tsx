export type FormFieldInput = {
  id?: string;
  label: string;
  type: string;
  required: boolean;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = (formFieldInput: FormFieldInput) => {
  return (
    <div
      className={`${formFieldInput.className} z-0 relative h-fit w-full lg:w-1/2`}
    >
      <label
        htmlFor={formFieldInput.type}
        className="text-[12px] text-black text-opacity-40 bg-white top-0 mx-4 px-2 font-medium text-black-700 z-10 absolute"
      >
        {formFieldInput.label}
      </label>
      <input
        id={formFieldInput.id ? formFieldInput.id : formFieldInput.type}
        type={formFieldInput.type}
        required={formFieldInput.required}
        value={formFieldInput.value}
        onChange={formFieldInput.onChange}
        className="w-full px-3 sm:py-4 py-3 mt-2 border border-[#E8E6EA] rounded-[15px] sm:text-sm outline-none focus:border-primary"
      />
    </div>
  );
};
