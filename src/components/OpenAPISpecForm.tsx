"use client";

import { Button, Label, TextInput } from "flowbite-react";

function OpenAPISpecForm() {
  return (
    <form className="flex w-full flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="OpenAPI Spec" />
        </div>
        <TextInput
          id="email1"
          type="text"
          placeholder="..."
          required
          className="w-1/2"
        />
      </div>
      <div className="flex flex-col items-end self-stretch">
        <Button color="gray" type="submit">
          Ingest Spec
        </Button>
      </div>
    </form>
  );
}

export default OpenAPISpecForm;
