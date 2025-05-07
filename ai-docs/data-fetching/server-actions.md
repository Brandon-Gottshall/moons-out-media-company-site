# Server Actions & Data Fetching

## Overview

This project uses Next.js 15's data fetching capabilities and Server Actions for handling data. Server Components enable direct data fetching without client-side API calls, while Server Actions provide a secure way to mutate data from client components.

## Server Components Data Fetching

Server Components fetch data directly in the component using async/await:

```tsx
// app/portfolio/page.tsx
async function PortfolioPage() {
  // Fetch data directly in the server component
  const portfolioItems = await getPortfolioItems()
  
  return (
    <div>
      {portfolioItems.map(item => (
        <PortfolioItem key={item.id} item={item} />
      ))}
    </div>
  )
}

// Data fetching function 
async function getPortfolioItems() {
  // Implementation
  return items
}
```

### Best Practices for Server Components

1. Keep data fetching close to where it's used
2. Use caching and revalidation strategies appropriately
3. Handle loading and error states with built-in Next.js features
4. Parallel data fetching when possible

## Server Actions

Server Actions are used for form submissions and data mutations. They are implemented with appropriate validation using Zod:

```tsx
'use server'

import { z } from "zod"

// Schema for validating contact form input
const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

// Server Action
export async function submitContactForm(formData: FormData) {
  // Extract and validate form data
  const result = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })
  
  // Handle validation errors
  if (!result.success) {
    return { success: false, errors: result.error.format() }
  }
  
  try {
    // Process the form submission
    // e.g., send email, store in database, etc.
    
    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      errors: { _form: ["An error occurred while submitting the form"] } 
    }
  }
}
```

### Client Component Integration with Server Actions

```tsx
'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { submitContactForm } from "@/actions/contact"

// Form schema matching the server-side schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })
  
  const [isPending, startTransition] = useTransition()
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormError(null)
    setFormSuccess(false)
    
    startTransition(async () => {
      const formData = new FormData()
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value)
      })
      
      const result = await submitContactForm(formData)
      
      if (result.success) {
        form.reset()
        setFormSuccess(true)
      } else {
        if (result.errors?._form) {
          setFormError(result.errors._form[0])
        } else {
          // Map specific field errors to form fields
          Object.entries(result.errors || {}).forEach(([key, value]) => {
            if (key !== "_form") {
              form.setError(key as any, { message: value[0] })
            }
          })
        }
      }
    })
  }
  
  // Render the form with React Hook Form integration
}
```

## Error Handling

Server-side errors are handled consistently:

1. **Expected Errors**: Validation errors, missing data, etc. are returned as structured data
2. **Unexpected Errors**: Server errors are caught and return appropriate responses
3. **Client-Side Display**: Errors are displayed in the UI with appropriate feedback

## Form Validation

1. **Server-Side Validation**: Always validate data on the server with Zod schemas
2. **Client-Side Validation**: Use the same Zod schemas with react-hook-form
3. **Error Messages**: Provide clear, user-friendly error messages

## Performance Optimization

1. **Caching**: Use Next.js caching mechanisms for improved performance
2. **Revalidation**: Implement appropriate revalidation strategies:
   - Time-based revalidation for relatively static data
   - On-demand revalidation for user-specific data
3. **Streaming**: Leverage React Suspense for progressively loading UI

## Security Considerations

1. **Input Validation**: Always validate all inputs on the server
2. **CSRF Protection**: Next.js handles CSRF protection automatically for Server Actions
3. **Rate Limiting**: Implement rate limiting for public-facing actions
4. **Error Handling**: Don't expose sensitive information in error messages 