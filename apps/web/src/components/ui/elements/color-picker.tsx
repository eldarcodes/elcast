'use client';

import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { z } from 'zod';

import { cn } from '@/utils/tw-merge';

import { Input } from '../common/input';

const hexColorSchema = z.string().regex(/^#[A-Fa-f0-9]{6}$/, {
  message: 'Invalid hex color format',
});

interface ColorPickerProps {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ className, value, onChange }: ColorPickerProps) {
  const [inputValue, setInputValue] = useState(value);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (!newValue.startsWith('#')) {
      newValue = '#' + newValue.replace(/^#+/, '');
    }

    setInputValue(newValue);

    const result = hexColorSchema.safeParse(newValue);
    setIsValid(result.success);

    if (result.success) {
      onChange(newValue);
    }
  };

  return (
    <div className={cn('w-[200px] space-y-2', className)}>
      <HexColorPicker
        color={value}
        onChange={(newColor) => {
          setInputValue(newColor);
          setIsValid(true);
          onChange(newColor);
        }}
      />

      <Input
        type="text"
        maxLength={7}
        variant={isValid ? 'default' : 'destructive'}
        value={inputValue}
        onChange={handleInputChange}
        endIcon={isValid ? undefined : TriangleAlert}
      />
    </div>
  );
}
