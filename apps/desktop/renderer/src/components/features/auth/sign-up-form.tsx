import { registerUser } from "@appkit/api-client";
import { registerSchema } from "@appkit/core";
import { Button } from "@appkit/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@appkit/ui";
import { Field, FieldError, FieldGroup, FieldLabel } from "@appkit/ui";
import { Input } from "@appkit/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

export function SignUpForm() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerSchema>) {
    const result = await registerUser(data, {
      apiBaseUrl: "http://localhost:4000",
    });

    if (!result.success) {
      console.error(result.message);
    }

    console.info("successfully registered.");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-sign-up" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-name"
                    aria-invalid={fieldState.invalid}
                    placeholder=""
                    autoComplete="name"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-confirm-password">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-sign-up">
            Sign Up
          </Button>
          <Button asChild variant="outline">
            <a href="/">Cancel</a>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
