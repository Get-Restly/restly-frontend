"use client";

import React, {FC, useMemo} from "react";
import { Button, Select } from "flowbite-react";
import { OpenApiSpec, ApiEndpoint, extractApiEndpoints } from "~/types";

interface ApiPickerProps {
  spec?: OpenApiSpec;
  value: ApiEndpoint[];
  onChange: (value: ApiEndpoint[]) => void;
  onAutoSelect: () => void;
}

const ApiPicker: FC<ApiPickerProps> = ({spec, value, onChange, onAutoSelect}) => {
  const endpoints = useMemo(() => spec?.paths ? extractApiEndpoints(spec) : [], [spec]);
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.selectedOptions;
    const selectedEndpoints = Array.from(selected).map((option) => {
      const [path, verb] = option.value.split('#');
      return endpoints.find((endpoint) => endpoint.path === path && endpoint.verb === verb);
    }).filter(Boolean) as ApiEndpoint[];
    onChange(selectedEndpoints);
  }

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <Button color="gray" onClick={() => onAutoSelect()}>
        Auto select
      </Button>
      <div>
        <Select
          id="api-endpoints"
          required
          multiple
          className="focus:ring-1 focus:ring-gray-200"
          onChange={handleChange}
          value={value.map((endpoint) => `${endpoint.path}#${endpoint.verb}`)}
          size={Math.min(12, endpoints.length)}
        >
          {endpoints.map((endpoint) => (
            <option 
              key={`${endpoint.path}-${endpoint.verb}`}
              value={`${endpoint.path}#${endpoint.verb}`}
            >
              {endpoint.path} {endpoint.verb.toUpperCase()}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default ApiPicker;
