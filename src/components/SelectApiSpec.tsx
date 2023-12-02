"use client";

import React, { type FC, useEffect, useState } from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { type ApiSpec } from "~/types";
import LoadingSpinner from "./LoadingSpinner";
import { useApi } from "~/hooks/useAPI";

interface SelectApiSpecProps {
  value: number | undefined;
  onSelect: (value: number) => void;
}

const SelectApiSpec: FC<SelectApiSpecProps> = ({ value, onSelect }) => {
  const { api, authenticated } = useApi();

  const [specs, setSpecs] = useState<ApiSpec[]>([]);
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const reloadSpecs = async () => {
    const specs = await api.loadSpecs();
    setSpecs(specs);
  };

  useEffect(() => {
    if (!authenticated) {
      return;
    }
    reloadSpecs().catch((e) => console.error(e));
  }, [authenticated]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    onSelect(parseInt(e.target.value));
  };

  const handleLoadSpec = async () => {
    const specId = await api.createSpec(url);
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
          disabled={loading ?? url === ""}
        >
          {loading && <LoadingSpinner />}
          {loading ? "Loading.." : "Load OpenAPI Spec"}
        </Button>
      </div>
    </div>
  );
};

export default SelectApiSpec;
