"use client";

import React, {FC, useEffect, useState} from "react";
import { Button, Label, TextInput, Select } from "flowbite-react";
import { ApiSpec } from "~/types";
import { spec } from "node:test/reporters";
import { cp } from "node:fs";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

interface SelectApiSpecProps {
  value: number | undefined;
  onSelect: (value: number) => void;
}

const SelectApiSpec: FC<SelectApiSpecProps> = ({ value, onSelect }) => {
  const [specs, setSpecs] = useState<ApiSpec[]>([]);

  const loadSpecs = async () => {
    const response = await fetch(`${API_URL}/api/v1/specs`);
    const specsResp = await response.json();
    const specs = specsResp.specs;
    setSpecs(specs);
  }

  useEffect(() => {
    loadSpecs();
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onSelect(parseInt(e.target.value));
  }

  return (
    <div className="flex flex-col gap-4 w-full px-2">
      <Select value={value} onChange={handleSelect}>
        <option key={0} value={undefined}>Select Spec</option>
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
        <Button className="whitespace-nowrap" color="gray" type="submit">
            Load spec
        </Button>
        <div className="flex flex-col items-end self-stretch">
          
        </div>
      </div>
    </div>
  );
}

export default SelectApiSpec;
