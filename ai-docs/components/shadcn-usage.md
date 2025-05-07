# Shadcn UI Usage

## Overview

This project uses [Shadcn UI](https://ui.shadcn.com/) - a collection of reusable components built on top of Radix UI primitives. Unlike traditional component libraries, Shadcn UI components are directly copied into the project's codebase, allowing for easy customization.

## Implementation Details

- **Location**: All Shadcn UI components are in the `components/ui` directory
- **Customization**: Components can be directly modified since they're part of the project codebase
- **Configuration**: Configured via the `components.json` file in the project root
- **Styling**: Components use Tailwind CSS for styling with a consistent design system

## Components In Use

The project includes a comprehensive set of Shadcn UI components:

- **Layout**: Accordion, AspectRatio, Collapsible, ResizablePanels, ScrollArea, Separator, Sheet, Tabs
- **Forms**: Button, Checkbox, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, ToggleGroup
- **Data Display**: Avatar, Badge, Calendar, Card, Carousel, Table, Tooltip
- **Feedback**: Alert, AlertDialog, Progress, Skeleton, Toast
- **Navigation**: Breadcrumb, ContextMenu, DropdownMenu, HoverCard, Menubar, NavigationMenu, Pagination, Sidebar
- **Overlays**: Dialog, Drawer, Popover
- **Data Entry**: Command (cmdk)

## Theme Implementation

- **Dark Mode**: Implemented using next-themes
- **Color Scheme**: Custom colors defined in `tailwind.config.ts`
- **CSS Variables**: Used for consistent theming across components
- **Animations**: Uses tailwindcss-animate for transitions and animations

## Custom Extensions

Several Shadcn UI components have been extended for project-specific needs:

- **Sidebar**: Enhanced for site navigation with mobile responsiveness
- **Charts**: Added chart functionality based on Recharts
- **Carousel**: Extended with custom controls and animations

## Usage Patterns

### Basic Component Usage

```tsx
import { Button } from "@/components/ui/button"

function MyComponent() {
  return (
    <Button variant="default">Click Me</Button>
  )
}
```

### Form Components with React Hook Form

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email(),
})

function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

## Accessibility

All components are built on Radix UI primitives, which provide strong accessibility features out of the box:

- Proper ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

## Best Practices

- Use Shadcn UI components whenever possible for consistency
- Customize components by modifying their source files directly
- Maintain accessibility features when customizing components
- Follow the existing styling patterns when extending components 