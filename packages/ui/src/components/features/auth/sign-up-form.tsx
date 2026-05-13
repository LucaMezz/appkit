import { Controller, type UseFormReturn } from "react-hook-form";

import { Button } from "#shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#shadcn/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "#shadcn/field";
import { Input } from "#shadcn/input";

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpFormProps {
  form: UseFormReturn<SignUpFormValues>;
  onSubmit: (data: SignUpFormValues) => Promise<void> | void;
  cancelHref?: string;
}

export function SignUpForm({
  form,
  onSubmit,
  cancelHref = "/",
}: SignUpFormProps): React.JSX.Element {
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
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Your name"
                    autoComplete="name"
                    type="text"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                    type="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-up-confirm-password">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-up-confirm-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    type="password"
                    autoComplete="new-password"
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
          <Button type="submit" form="form-sign-up" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>

          <Button asChild variant="outline">
            <a href={cancelHref}>Cancel</a>
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
