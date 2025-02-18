export type FormFieldInput = {
  label: string;
  type: string;
  required: boolean;
  className?: string;
  //TODO: Add more onChange event
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
        id={formFieldInput.type}
        type={formFieldInput.type}
        required={formFieldInput.required}
        className="w-full px-3 sm:py-4 py-2 mt-2 border border-[#E8E6EA] rounded-[15px] sm:text-sm outline-none focus:border-primary"
      />
    </div>
  );
};
