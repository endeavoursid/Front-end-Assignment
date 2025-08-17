import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**InputField** is a reusable text input component with multiple variants, states, and sizes.  

### ✨ Features
- Label, placeholder, helper text, error message  
- States: default, disabled, invalid, loading  
- Variants: filled, outlined, ghost  
- Sizes: small, medium, large  
- Optional: clear button & password toggle  
- 🌙 Dark mode supported  

### ♿ Accessibility
- Uses \`aria-invalid\` and \`aria-describedby\` for error/helper text  
- Fully keyboard & screen reader friendly  

### ✅ Best Practices
- Use **outlined** for forms (default choice)  
- Use **filled** for compact/dense UIs  
- Use **ghost** for inline minimal inputs  
        `,
      },
    },
  },
  argTypes: {
    variant: { control: "radio", options: ["filled", "outlined", "ghost"] },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    loading: { control: "boolean" },
    type: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof InputField>;

// ✅ Default example
export const Default: Story = {
  args: {
    label: "Username",
    placeholder: "Enter your username",
    helperText: "This will be public",
  },
};

// ✅ Error state
export const Error: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    invalid: true,
    errorMessage: "Invalid email address",
  },
};

// ✅ Password field
export const Password: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
  },
};

// ✅ Loading state
export const Loading: Story = {
  args: {
    label: "Search",
    placeholder: "Type something...",
    loading: true,
  },
};

// ✅ Disabled input
export const Disabled: Story = {
  args: {
    label: "Disabled",
    placeholder: "Can't type here",
    disabled: true,
  },
};

// ✅ Clearable input
export const Clearable: Story = {
  args: {
    label: "Search",
    placeholder: "Type to search...",
    clearable: true,
  },
};

// ✅ Variants showcase
export const Filled: Story = {
  args: { label: "Name", placeholder: "Enter name", variant: "filled" },
};

export const Outlined: Story = {
  args: { label: "Name", placeholder: "Enter name", variant: "outlined" },
};

export const Ghost: Story = {
  args: { label: "Name", placeholder: "Enter name", variant: "ghost" },
};

// ✅ Sizes showcase
export const Small: Story = {
  args: { label: "Small Input", placeholder: "sm size", size: "sm" },
};

export const Medium: Story = {
  args: { label: "Medium Input", placeholder: "md size", size: "md" },
};

export const Large: Story = {
  args: { label: "Large Input", placeholder: "lg size", size: "lg" },
};
