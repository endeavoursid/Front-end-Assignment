import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";
import type { Column } from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

const columns: Column<User>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age" },
];

const sampleData: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com", age: 25 },
  { id: 2, name: "Bob", email: "bob@example.com", age: 30 },
  { id: 3, name: "Charlie", email: "charlie@example.com", age: 28 },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DataTable** is a reusable, accessible table for displaying structured data.  

### Features
- Configurable columns  
- Row selection (single / multiple)  
- Sorting by columns  
- Loading & empty states  
- 🌙 Dark mode supported  

### Accessibility
- Uses semantic roles: \`role="table"\`, \`role="row"\`, \`role="cell"\`  
- Checkboxes/radio buttons are screen-reader labeled  

### Best Practices
- Keep column count manageable for readability  
- Use **single selection** for detail views  
- Use **multiple selection** for batch actions  
        `,
      },
    },
  },
  argTypes: {
    columns: { control: "object" },
    data: { control: "object" },
    loading: { control: "boolean" },
    selectable: { control: "radio", options: [false, true, "single"] },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

// ✅ Default example
export const Default: Story = {
  args: { data: sampleData, columns },
};

// ✅ Selectable (multiple rows)
export const SelectableMultiple: Story = {
  args: { data: sampleData, columns, selectable: true },
};

// ✅ Selectable (single row)
export const SelectableSingle: Story = {
  args: { data: sampleData, columns, selectable: "single" },
};

// ✅ Loading state
export const Loading: Story = {
  args: { data: [], columns, loading: true },
};

// ✅ Empty state
export const Empty: Story = {
  args: { data: [], columns },
};
