"use client";

import React, { type FC, useState } from "react";
import { Button, TextInput, Select } from "flowbite-react";
import { type ApiSpec } from "~/types";
import LoadingSpinner from "./LoadingSpinner";
import { useApi } from "~/hooks/useAPI";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface SelectApiSpecProps {
  // value: number | undefined;
  onSelect: (value: ApiSpec | undefined) => void;
}

const SelectApiSpec: FC<SelectApiSpecProps> = ({ onSelect }) => {
  const { api } = useApi();
  const queryClient = useQueryClient();

  const {
    isLoading: loading,
    // isError,
    data,
    // error,
  } = useQuery<ApiSpec[]>({
    queryKey: ["specs"],
    queryFn: async () => await api.loadSpecs(),
  });
  const specs = data ?? [];

  // Mutations
  const mutation = useMutation({
    mutationFn: async (url: string) => api.createSpec(url),
    onSuccess: async () => {
      // Invalidate and refetch
      await queryClient.invalidateQueries({ queryKey: ["specs"] });
    },
  });

  //For internal state management
  const [apiSpecId, setApiSpecId] = useState<number | undefined>();
  const [url, setUrl] = useState<string>("");

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedSpec = specs.find(
      (spec) => spec.id === parseInt(e.target.value),
    );

    if (!newSelectedSpec) {
      onSelect(undefined);
      return;
    }

    onSelect(newSelectedSpec);
    e.preventDefault();
  };

  const handleLoadSpec = async () => {
    const response = await mutation.mutateAsync(url);

    //Set this as the current spec
    onSelect(response);

    //For local component state
    setApiSpecId(response.id);

    //Clear out state
    setUrl("");
  };

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <Select value={apiSpecId} onChange={handleSelect}>
        {loading ? (
          <option disabled style={{ backgroundColor: "#e2e8f0" }}>
            Loading specs...
          </option>
        ) : (
          <>
            <option key={0} value="">
              Select
            </option>
            {specs.map((spec) => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </>
        )}
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
          disabled={mutation.isLoading || url === ""}
        >
          {mutation.isLoading && <LoadingSpinner />}
          {mutation.isLoading ? "Loading.." : "Load OpenAPI Spec"}
        </Button>
      </div>
    </div>
  );
};

export default SelectApiSpec;
