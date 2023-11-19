"use client";

import { Button, Label, Select } from "flowbite-react";

function APIPicker() {
  //TODO: pass in props for the options
  return (
    <form className="flex w-full flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="countries" value="Pick relevant API endpoints" />
        </div>
        <Select
          id="countries"
          required
          multiple
          className="focus:ring-1 focus:ring-gray-200"
        >
          <option selected>United States</option>
          <option>Canada</option>
          <option>France</option>
          <option>Germany</option>
        </Select>
      </div>
      <div className="flex flex-col items-center self-stretch">
        <Button
          color="blue"
          type="submit"
          size="lg"
          className="focus:ring-1 focus:ring-gray-200"
        >
          Generate tutorial
        </Button>
      </div>
    </form>
  );
}

export default APIPicker;
