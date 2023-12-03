import { Select } from "flowbite-react";
import React, { useState } from "react";

type ServerSelectorProps = {
  servers: string[];
};

const ServerSelector: React.FC<ServerSelectorProps> = ({ servers }) => {
  const [serverValue, setServerValue] = useState<string>(servers[0] ?? "");
  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServerValue(e.target.value);
  };

  return (
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
  );
};

export default ServerSelector;
