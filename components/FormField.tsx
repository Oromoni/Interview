import React from 'react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'file';
}

// ✅ Declare generic <T> here
const FormField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
}: FormFieldProps<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="label">{label}</FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className="input"
                type={type}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FormField;
