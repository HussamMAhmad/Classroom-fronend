import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Department, ClassDetails } from "@/types";
import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema } from "@/lib/schema";
import * as z from "zod";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { Check } from "lucide-react";

function SubjectCreate() {
  const [open, setOpen] = useState(false);

  const { query: classQuery } = useList<ClassDetails>({
    resource: "classes",
    pagination: {
      pageSize: 100,
    },
  });

  const { query: departmentQuery } = useList<Department>({
    resource: "departments",
    pagination: {
      pageSize: 100,
    },
  });

  const classes = classQuery?.data?.data || [];
  const classesLoading = classQuery.isLoading;

  const departments = departmentQuery?.data?.data || [];
  const departmentsLoading = departmentQuery.isLoading;

  const form = useForm({
    resolver: zodResolver(subjectSchema),
    refineCoreProps: {
      action: "create",
      resource: "subjects",
    },
    defaultValues: {
      name: "",
    },
  });

  const {
    refineCore: { onFinish },
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = async (data: z.infer<typeof subjectSchema>) => {
    try {
      await onFinish(data);
    } catch (e) {
      console.log("Error creating class:", e);
    }
  };
  return (
    <CreateView>
      <Breadcrumb />
      <h1 className="page-title">Create New Class</h1>
      <div className="">
        <div className="flex justify-between items-center p-3">
          <p>Provide the required information to create a new class.</p>
        </div>
        <Separator />
        <div className="mt-3">
          <Card className="">
            <CardHeader className="relative z-10">
              <CardTitle className="text-2xl pb-0 font-bold">
                Fill out the form
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="mt-7">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject Name{" "}
                          <span className="text-orange-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Subject Name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="className"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Class <span className="text-orange-600">*</span>
                          </FormLabel>
                          <div className="flex flex-col gap-4">
                            <Button
                              onClick={() => setOpen(true)}
                              variant="outline"
                              className="w-fit"
                              type="button"
                            >
                              Open Menu
                            </Button>
                            <CommandDialog open={open} onOpenChange={setOpen}>
                              <Command>
                                <CommandInput placeholder="Search for Classes..." />
                                <CommandList>
                                  <CommandEmpty>No results found.</CommandEmpty>
                                  <CommandGroup heading="Classes">
                                    {classes.map((cl) => (
                                      <CommandItem
                                        disabled={classesLoading}
                                        key={cl.id}
                                        onSelect={() => {
                                          const currentValue =
                                            field.value || [];
                                          const newValue =
                                            currentValue.includes(cl.id)
                                              ? currentValue.filter(
                                                  (id) => id !== cl.id,
                                                )
                                              : [...currentValue, cl.id];
                                          field.onChange(newValue);
                                        }}
                                        className="flex items-center gap-2 cursor-pointer"
                                      >
                                        <div
                                          className={`h-4 w-4 border rounded flex items-center justify-center
                  ${
                    field.value?.includes(cl.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent"
                  }
                                                    `}
                                        >
                                          {field.value?.includes(cl.id) && (
                                            <Check className="h-3 w-3" />
                                          )}
                                        </div>
                                        {cl.name}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </CommandDialog>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Department{" "}
                            <span className="text-orange-600">*</span>
                          </FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value?.toString() || ""}
                            disabled={departmentsLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a Department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {departments.map((de) => (
                                <SelectItem
                                  key={de.id}
                                  value={de.id.toString()}
                                >
                                  {de.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description about the class"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Separator />
                  <div className="flex justify-end space-x-2">
                    <Button type="submit" className="w-full">
                      Create Subject
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </CreateView>
  );
}
export default SubjectCreate;
