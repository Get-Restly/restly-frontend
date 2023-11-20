"use client";

import { Button, Label, Textarea } from "flowbite-react";

function GoalsForm() {
  return (
    <form className="flex w-full flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="goals" value="Goals for the tutorial" />
        </div>
        <Textarea
          id="goals"
          placeholder="Help me write a tutorial for an e-commerce store XYZ"
          rows={4}
          required
        />
      </div>
      <div className="flex flex-col items-end self-stretch">
        <Button color="gray" type="submit">
          Confirm goals
        </Button>
      </div>
    </form>
  );
}

export default GoalsForm;
