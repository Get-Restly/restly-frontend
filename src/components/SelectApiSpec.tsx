"use client";

import React, {FC, useEffect, useState} from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { ApiSpec } from "~/types";
import { spec } from "node:test/reporters";
import { cp } from "node:fs";
import { loadSpecs } from "~/api";

interface SelectApiSpecProps {
  value: number | undefined;
  onSelect: (value: number) => void;
}

const SelectApiSpec: FC<SelectApiSpecProps> = ({ value, onSelect }) => {
  const [specs, setSpecs] = useState<ApiSpec[]>([]);

  const reloadSpecs = async () => {
    const specs = await loadSpecs();
    setSpecs(specs);
  }

  useEffect(() => {
    reloadSpecs().catch(e => console.error(e));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onSelect(parseInt(e.target.value));
  }

  return (
    <div className="flex flex-col gap-4 w-full px-2">
      <Select value={value} onChange={handleSelect}>
        <option key={0} value={undefined}>Select</option>
        {specs.map(spec => (
          <option key={spec.id} value={spec.id}>{spec.name}</option>
        ))}
      </Select>
      <div className="flex w-full flex-row gap-4">
        <TextInput
          id="email1"
          type="text"
          placeholder="Enter OpenAPI Spec URL"
          required
          className="w-full"
        />
        <Button className="whitespace-nowrap" color="gray">
            Load OpenAPI Spec
        </Button>
      </div>
    </div>
  );
}

export default SelectApiSpec;
