import {
  ShowView,
  ShowViewHeader,
} from "@/components/refine-ui/views/show-view";
import { ClassDetails } from "@/types";
import { useShow } from "@refinedev/core";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AdvancedImage } from "@cloudinary/react";
import { bannerPhoto } from "@/lib/cloudinry";

function Show() {
  const { query } = useShow<ClassDetails>({
    resource: "classes",
  });
  const classDetails = query.data?.data;
  const { isLoading, isError } = query;

  if (isLoading || isError || !classDetails) {
    return (
      <ShowView className="class-view class-show">
        <ShowViewHeader resource="classes" title="Class Details" />
        <p className="state-message">
          {isLoading
            ? "loading class details..."
            : isError
            ? "Failed to load class details..."
            : "Class details not found"}
        </p>
      </ShowView>
    );
  }

  const teacherName = classDetails.teacher?.name ?? "Unknown";
  const teacherInitials = teacherName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const placehoderUrl = `https://placehold.co/600x400?text=${encodeURIComponent(
    teacherInitials || "NA",
  )}`;

  const departmentName = classDetails.subject?.department?.name ?? "Unknown";
  const departmentDetails =
    classDetails.subject?.department?.description ?? "Unknown";

  return (
    <ShowView className="class-view class-show">
      <ShowViewHeader resource="classes" title="Class Details" />
      <div className="banner">
        {classDetails.bannerCldPublic ? (
          <AdvancedImage
            alt="class banner"
            cldImg={bannerPhoto(
              classDetails?.bannerCldPublic ?? "",
              classDetails.name,
            )}
          />
        ) : (
          <div className="placeholder" />
        )}
      </div>
      <Card className="details-card">
        <div className="details-header">
          <div>
            <h1>{classDetails.name}</h1>
            <p>{classDetails.description}</p>
          </div>
          <div>
            <Badge variant="outline">{classDetails.capacity} spots</Badge>
            <Badge
              variant={
                classDetails.status === "active" ? "default" : "secondary"
              }
              data-status={classDetails.status}
            >
              {classDetails.status.toUpperCase()}
            </Badge>
          </div>
        </div>
        <div className="details-grid">
          <div className="instructor">
            <p>instructor</p>
            <div>
              <img
                src={classDetails.teacher?.image ?? placehoderUrl}
                alt="teacherName"
              />
              <div>
                <p>{teacherName}</p>
                <p>{classDetails.teacher?.email}</p>
              </div>
            </div>
          </div>
          <div className="department">
            <p>Department</p>
            <div>
              <p>{departmentName}</p>
              <p>{departmentDetails}</p>
            </div>
          </div>
        </div>
        <Separator />
        <div className="subject">
          <p>Subject</p>
          <div>
            <Badge>Code : {classDetails.subject?.code}</Badge>
            <p>{classDetails.subject?.name}</p>
            <p>{classDetails.subject?.description}</p>
          </div>
        </div>
        <Separator />
        <div className="join">
          <h2>Join Class</h2>
          <ol>
            <li>Ask your teacher for the invite code</li>
            <li>Click on "Join Class" button</li>
            <li>Paste the code and click "Join"</li>
          </ol>
        </div>
        <Button size="lg" className="w-full cursor-pointer">
          Join Class
        </Button>
      </Card>
    </ShowView>
  );
}

export default Show;
