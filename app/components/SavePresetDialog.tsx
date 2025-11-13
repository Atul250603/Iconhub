"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { Save } from "lucide-react";
import { useForm } from "@tanstack/react-form"
import * as z from "zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import usePresets from "@/hooks/usePresets";
import { useState } from "react";
import { SvgConfig } from "@/types";
import { Spinner } from "@/components/ui/spinner";

export const SavePresetDialog = ({ open, setOpen, svgConfig }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, svgConfig: SvgConfig }) => {
    const { add } = usePresets();
    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
      name: z.string().min(1, { message: "Preset name is required" }),
    })

    const form = useForm({
      defaultValues: {
        name: "",
      },
      validators: {
        onSubmit: formSchema,
      },
      onSubmit: async ({value}) => {
        setLoading(true);
        await add(value.name, svgConfig);
        setLoading(false);
        setOpen(false);
        form.reset();
      }
    })
  
    return (
      <ResponsiveDialog
        open={open}
        setOpen={setOpen}
        title="Save as New Preset"
        description="Create a new preset with your current icon configuration"
        trigger={<Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setOpen(true)}>
          <Save className="size-4" />
          <span>Save as New Preset</span>
        </Button>}
      >
        <form className="grid items-start gap-3" id="save-preset-form" onSubmit={(e) => { e.preventDefault(); form.handleSubmit() }}>
          <FieldGroup>
            <form.Field
             name="name"
             children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Preset Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Preset Name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
          <Button type="submit" className="w-full mt-4" form="save-preset-form" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="size-4" />
                Saving...
              </>
            ) : (
              <>Save</>
            )}
          </Button>
        </form>
      </ResponsiveDialog>
    )
  }