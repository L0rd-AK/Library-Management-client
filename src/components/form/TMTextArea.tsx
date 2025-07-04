import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { type IInput } from "@/types";
import { Textarea } from "../ui/textarea";

export default function TMTextarea({ name, label, defaultValue }: IInput) {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea {...register(name)} defaultValue={defaultValue} />
      </FormControl>
    </FormItem>
  );
}
