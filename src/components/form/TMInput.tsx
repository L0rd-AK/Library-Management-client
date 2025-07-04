import { useFormContext } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { type IInput } from "@/types";

export default function TMInput({ name, label, defaultValue }: IInput) {
  const { register } = useFormContext();

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input type="text" {...register(name)} defaultValue={defaultValue} />
      </FormControl>
    </FormItem>
  );
}
