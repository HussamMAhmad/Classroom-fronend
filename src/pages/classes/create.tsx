import React from "react";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view";
import { useForm } from "@refinedev/react-hook-form";
import { classSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { useBack } from "@refinedev/core";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadWidget from "@/components/upload-widget/upload-widget";

function ClassesCreate() {
  const back = useBack();
  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      action: "create",
      resource: "classes",
    },
    defaultValues: {
      status: "active",
    },
  });

  const teachers = [
    {
      id: "1",
      name: "John Doe",
    },
    {
      id: "2",
      name: "Jane Smith",
    },
    {
      id: "3",
      name: "Dr. Alan Turing",
    },
  ];

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      code: "MATH",
    },
    {
      id: 2,
      name: "Computer Science",
      code: "CS",
    },
    {
      id: 3,
      name: "Physics",
      code: "PHY",
    },
    {
      id: 4,
      name: "Chemistry",
      code: "CHEM",
    },
  ];

  const {
    handleSubmit,
    formState: { isSubmitting , errors},
    control,
  } = form;

  const onSubmit = (data: z.infer<typeof classSchema>) => {
    try {
      console.log("Form data:", data);
    } catch (e) {
      console.log("Error creating class:", e);
    }
  };
  const bannerPublicId = form.watch("bannerCldPubId");
  const setBannerImage = (file : any, field : any) => {
    if (file) {
      field.onChange(file.url);
      form.setValue("bannerCldPubId", file.publicId, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }else{
      field.onChange("");
      form.setValue("bannerCldPubId", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };
  return (
    <CreateView>
      <Breadcrumb />
      <h1 className="page-title">Create New Class</h1>
      <div className="intro-row">
        <p>Provide the required information to create a new class.</p>
        <Button>Go Back</Button>
      </div>
      <Separator />
      <div className="my-4 flex items-center">
        <Card className="class-form-card">
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
                  name="bannerUrl"
                  render={({ field }) => {
                    console.log("Banner URL field value:", field.value);
                    console.log("the field object is:", field);
                    return (
                      <FormItem>
                        <FormLabel>
                          Banner Image{" "}
                          <span className="text-orange-600">*</span>
                        </FormLabel>
                        <FormControl>
                          <UploadWidget
                            value={
                              field.value?{
                                    url: field.value,
                                    publicId: bannerPublicId ?? "",
                                  } : null 
                            }
                            onChange={(file: any) =>
                              setBannerImage(file, field)
                            }
                          />
                        </FormControl>
                        <FormMessage />
                        {errors.bannerCldPubId && !errors.bannerUrl && (
                          <p className="text-sm text-destructive">
                            {errors.bannerCldPubId.message?.toString()}
                          </p>
                        )}
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Class Name <span className="text-orange-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Introduction to Biology - Section A"
                          {...field}
                        />
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
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString() || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((sub) => (
                              <SelectItem
                                key={sub.id}
                                value={sub.id.toString()}
                              >
                                {sub.name} ({sub.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Teacher <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString() || ""}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a teacher" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem
                                key={teacher.id}
                                value={teacher.id.toString()}
                              >
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="30"
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value ? Number(value) : undefined);
                            }}
                            value={(field.value as number | undefined) ?? ""}
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-orange-600">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
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
                    Create Class
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
}

export default ClassesCreate;
