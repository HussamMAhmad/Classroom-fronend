import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";
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
import UploadWidget from "@/components/upload-widget/upload-widget";
import { Department, Subject, User, ClassDetails } from "@/types";
import { useForm } from "@refinedev/react-hook-form";
import { useList } from "@refinedev/core";
import { zodResolver } from "@hookform/resolvers/zod";
import { subjectSchema } from "@/lib/schema";
import * as z from "zod";

function SubjectCreate() {
  const { query: classQuery } = useList<ClassDetails>({
    resource: "classes",
    pagination: {
      pageSize: 100,
    },
  });

  const { query: departmentQuery } = useList<Department>({
    resource: "classes",
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
          <Button>Go Back</Button>
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
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            value={field.value?.toString() || ""}
                            disabled={classesLoading}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {classes.map((cl) => (
                              <SelectItem
                                key={cl.id}
                                value={cl.id.toString()}
                              >
                                {cl.name}
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
