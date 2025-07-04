import { type IInput } from "@/types";
import { FormControl, FormItem, FormLabel } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Controller } from "react-hook-form";

interface ISelect extends IInput {
  options: { value: string; label: string }[];
}

export default function TMSelect({
  name,
  label,
  options,
  defaultValue,
}: ISelect) {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={defaultValue}>
              <SelectTrigger>
                <SelectValue placeholder={`Select - ${label}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
