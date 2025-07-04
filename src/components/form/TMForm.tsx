import type { ReactNode } from "react";
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from "react-hook-form";

interface IProps {
  children: ReactNode;
  className?: string;
  onSubmit: SubmitHandler<FieldValues>;
}

export default function TMForm({ children, onSubmit, className }: IProps) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form className={className} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
}
