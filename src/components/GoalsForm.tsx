"use client";

import React, {FC, useState} from "react";
import { Button, Label, Textarea } from "flowbite-react";

interface GoalsFormProps {
  value: string;
  onConfirm: (goalsText: string) => void;
}

const GoalsForm: FC<GoalsFormProps> = ({ value, onConfirm }) => {
  const [text, setText] = useState(value);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  const handleConfirm = () => {
    onConfirm(text);
  }

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="goals" value="Goals for the tutorial" />
        </div>
        <Textarea
          id="goals"
          placeholder="Help me write a tutorial for an e-commerce store XYZ"
          rows={4}
          required
          value={text}
          onChange={handleTextChange}
        />
      </div>
      <div className="flex flex-col items-end self-stretch">
        <Button color="gray" type="submit" onClick={() => handleConfirm()}>
          Confirm goals
        </Button>
      </div>
    </div>
  );
}

export default GoalsForm;
