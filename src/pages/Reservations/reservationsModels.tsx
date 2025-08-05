export type InputType = "text" | "checkbox" | "radio" | "textarea" | "select" | "date" | "number";

export type FormField = {
  name: string;
  label: string;
  required: boolean;
  placeholder?: string;
  errorMsg?: string;
  prefix?: React.ReactNode;
  type?: InputType;
  options?: { label: string; value: string }[]; // For radio, checkbox, and select
  min?: number; // For number inputs
  max?: number; // For number inputs
};

export type FormPage = {
  title: string;
  fields: FormField[];
};