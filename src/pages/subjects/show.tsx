import React from "react";
import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileScan, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Subject } from "@/types";
import { useShow } from "@refinedev/core";
import dayjs from "dayjs";

function ShowSubject() {
  const { query } = useShow<Subject>({
    resource: "subjects",
  });

  const subjectDetails = query.data?.data;
  const { isLoading, isError } = query;

  if (isLoading || isError || !subjectDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader resource="subjects" title="Class Details" />
        <p className="state-message">
          {isLoading
            ? "loading subject details..."
            : isError
            ? "Failed to load subject details..."
            : "Subject details not found"}
        </p>
      </ShowView>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader resource="subjects" title="Subject Details" />
      <Card className="subject-show">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="subject-box">
          <div className="subject-details">
            <BookOpen />
            <div className="subject-info">
              <p>Name</p>
              <h1>{subjectDetails.name}</h1>
            </div>
          </div>
          <div className="subject-details">
            <FileScan />
            <div className="subject-info">
              <p>Code</p>
              <Badge>{subjectDetails.code}</Badge>
            </div>
          </div>
          <div className="subject-details">
            <CalendarDays />
            <div className="subject-info">
              <p>Created At</p>
              <h1>
                {subjectDetails.createdAt
                  ? dayjs(subjectDetails.createdAt).format("DD/MM/YYYY")
                  : "No Date"}
              </h1>
            </div>
          </div>
          <div className="subject-details">
            <CalendarDays />
            <div className="subject-info">
              <p>Updated At</p>
              <h1>
                {subjectDetails.updatedAt
                  ? dayjs(subjectDetails.updatedAt).format("DD/MM/YYYY")
                  : "No Date"}
              </h1>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle>Classes</CardTitle>
          <Select>
            <SelectTrigger className="w-full max-w-48">
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardHeader>
        <Separator />
      </Card>
    </ShowView>
  );
}
export default ShowSubject;
