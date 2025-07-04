import { type IInput } from "@/types";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Controller } from "react-hook-form";
import { DatePicker } from "../ui/datePicker";


export default function TMDatePicker({ name, label, defaultValue }: IInput) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DatePicker onChange={field.onChange} defaultValue={defaultValue} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
