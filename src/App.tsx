import React, { useState } from "react";
import { InputField } from "./Components/InputField/InputField";
import { DataTable } from "./Components/DataTable/DataTable";
import type { Column } from "./Components/DataTable/DataTable";
import ThemeToggle from "./Components/Themetoggle";

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
];

function App() {
  const [search, setSearch] = useState("");

  const columns: Column<User>[] = [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6 min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors">
      {/* Header with theme toggle */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Demo App</h1>
        <ThemeToggle />
      </div>

      {/* Search Input */}
      <InputField
        label="Search Users"
        placeholder="Type a name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="md"
        clearable
      />

      {/* Data Table */}
      <DataTable<User> columns={columns} data={filteredUsers} selectable />
    </div>
  );
}

export default App;
