"use client";

import React, { FC } from "react";
import { Textarea } from "flowbite-react";

interface GoalsFormProps {
  value: string;
  onChange: (value: string) => void;
}

const GoalsForm: FC<GoalsFormProps> = ({ value, onChange }) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <Textarea
        id="goals"
        placeholder="Help me write a tutorial for an e-commerce store XYZ"
        rows={12}
        required
        value={value}
        onChange={handleTextChange}
      />
    </div>
  );
};

export default GoalsForm;
