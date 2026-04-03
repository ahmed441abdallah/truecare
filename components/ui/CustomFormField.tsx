"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  feildType?: string;
  icon?: React.ReactNode;
}

function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  feildType,
  icon,
}: CustomProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="border rounded-md shadow-xs flex items-center px-3 py-2">
            {icon && <span className="mr-3 text-gray-400">{icon}</span>}
            <FormControl>
              {name !== "phone" ? (
                <Input placeholder={name} type={feildType} {...field} />
              ) : (
                <PhoneInput
                  placeholder="Enter phone number"
                  defaultCountry="EG"
                  withCountryCallingCode
                  international
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default CustomFormField;
