import React from "react";
import Input from "./Input"; // Your reusable Input component
import Button from "./Button"; // Your reusable Button component
import FileUpload from "./FileInput";


const DynamicForm = ({ options, submitText = "Submit", onSubmit, title }) => {
  const allFilled = options
    ?.filter((item) => item?.required)
    .every((item) => item?.value);

  return (
    <div className="w-full flex flex-col items-start justify-center">
      <h4 className="text-lg font-medium mt-2">{title}</h4>
      <form className="w-full flex flex-col items-center justify-center gap-2 p-2 text-start">
        {options?.map((item, index) => {
          switch (item.formType) {
            case "input":
              return (
                <Input
                  key={index}
                  label={item.label}
                  name={item.name}
                  required={item.required}
                  type={item.type}
                  placeholder={item.label}
                  value={item.value}
                  onChange={item.onChange}
                />
              );
            case "file":
              return (
                <FileUpload
                  key={index}
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  onChange={item.onChange}
                />
              );
            default:
              return null;
          }
        })}
        {onSubmit && (
          <Button onClick={onSubmit} disabled={!allFilled}>
            {submitText}
          </Button>
        )}
      </form>
    </div>
  );
};

export default DynamicForm;
