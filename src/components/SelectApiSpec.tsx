"use client";

import React, { FC, useEffect, useState } from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { ApiSpec } from "~/types";
import { spec } from "node:test/reporters";
import { cp } from "node:fs";
import { createSpec, loadSpecs } from "~/api";
import LoadingSpinner from "./LoadingSpinner";

interface SelectApiSpecProps {
  value: number | undefined;
  onSelect: (value: number) => void;
}

const SelectApiSpec: FC<SelectApiSpecProps> = ({ value, onSelect }) => {
  const [specs, setSpecs] = useState<ApiSpec[]>([]);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const reloadSpecs = async () => {
    const specs = await loadSpecs();
    setSpecs(specs);
  };

  useEffect(() => {
    reloadSpecs().catch((e) => console.error(e));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onSelect(parseInt(e.target.value));
  };

  const handleLoadSpec = async () => {
    const specId = await createSpec(url);
    await reloadSpecs();
    onSelect(specId);
    setUrl("");
  };

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <Select value={value} onChange={handleSelect}>
        <option key={0} value={undefined}>
          Select
        </option>
        {specs.map((spec) => (
          <option key={spec.id} value={spec.id}>
            {spec.name}
          </option>
        ))}
      </Select>
      <div className="flex w-full flex-row gap-4">
        <TextInput
          id="email1"
          type="text"
          placeholder="Enter OpenAPI Spec URL"
          required
          className="w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="whitespace-nowrap"
          color="gray"
          onClick={handleLoadSpec}
          disabled={loading}
        >
          {loading && <LoadingSpinner />}
          {loading ? "Loading.." : "Load OpenAPI Spec"}
        </Button>
      </div>
    </div>
  );
};

export default SelectApiSpec;
