"use client";

import React, { type FC, useMemo, useState } from "react";
import { Button, Select } from "flowbite-react";
import {
  type OpenApiSpec,
  type ApiEndpoint,
  extractApiEndpoints,
} from "~/types";
import LoadingSpinner from "./LoadingSpinner";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface ApiPickerProps {
  spec?: OpenApiSpec;
  value: ApiEndpoint[];
  onChange: (value: ApiEndpoint[]) => void;
  onAutoSelect: () => void;
  autoSelectLoading: boolean;
  goalsText: string;
}

const ApiPicker: FC<ApiPickerProps> = ({
  spec,
  value,
  onChange,
  onAutoSelect,
  autoSelectLoading,
  goalsText,
}) => {
  const endpoints = useMemo(
    () => (spec?.paths ? extractApiEndpoints(spec) : []),
    [spec],
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.selectedOptions;
    const selectedEndpoints = Array.from(selected)
      .map((option) => {
        const [path, verb] = option.value.split("#");
        return endpoints.find(
          (endpoint) => endpoint.path === path && endpoint.verb === verb,
        );
      })
      .filter(Boolean) as ApiEndpoint[];
    onChange(selectedEndpoints);
  };

  const autoSelectText = autoSelectLoading ? "Loading..." : "Auto Select";

  const selectValue = useMemo(() => {
    return value.map(
      (endpoint) => `${endpoint.path}#${endpoint.verb.toLowerCase()}`,
    );
  }, [value]);

  //List of servers
  const servers: string[] = useMemo(() => {
    if (!spec?.servers) {
      return [];
    }
    return spec.servers.map((server) => server.url);
  }, [spec]);

  const [serverValue, setServerValue] = useState<string>(servers[0] ?? "");
  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerValue(e.target.value);
  };

  const cannotAutoSelect =
    autoSelectLoading || spec === undefined || goalsText === "";

  return (
    <div className="flex w-full flex-col gap-4 px-2">
      <Button
        color="gray"
        onClick={() => onAutoSelect()}
        disabled={cannotAutoSelect}
      >
        {autoSelectLoading ? (
          <LoadingSpinner />
        ) : (
          <SparklesIcon className="mx-1 h-5 w-5" />
        )}
        <span>{autoSelectText}</span>
      </Button>
      <div>
        <Select
          id="api-endpoints"
          required
          multiple
          className="focus:ring-1 focus:ring-gray-200"
          onChange={handleChange}
          value={selectValue}
          size={Math.min(12, endpoints.length)}
        >
          {endpoints.map((endpoint) => (
            <option
              key={`${endpoint.path}#${endpoint.verb}`}
              value={`${endpoint.path}#${endpoint.verb}`}
            >
              {endpoint.path} {endpoint.verb.toUpperCase()}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label
          htmlFor="server"
          className="block text-sm font-medium text-gray-700"
        >
          Select server
        </label>
        <Select
          id="server"
          required
          className="focus:ring-1 focus:ring-gray-200"
          onChange={handleServerChange}
          value={serverValue}
        >
          {servers.map((server) => (
            <option key={server} value={server}>
              {server}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ApiPicker;
