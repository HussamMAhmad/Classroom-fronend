import { ListView } from "@/components/refine-ui/views/list-view";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { ClassDetails } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { useList } from "@refinedev/core";
import { Badge } from "@/components/ui/badge.tsx";
import { ShowButton } from "@/components/refine-ui/buttons/show.tsx";

function ClassesList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectSubject, setSelectSubject] = useState("all");
  const { query: subjectQuery } = useList({
    resource: "subjects",
    pagination: {
      pageSize: 100,
    },
  });
  const { query: teacherQuery } = useList({
    resource: "users",
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "teacher",
      },
    ],
    pagination: {
      pageSize: 100,
    },
  });
  const subjects = subjectQuery?.data?.data ?? [];
  const subjectsLoading = subjectQuery.isLoading;
  const teachers = teacherQuery?.data?.data ?? [];
  const teachersLoading = teacherQuery.isLoading;
  const classSearch =
    searchQuery === ""
      ? []
      : [
          {
            field: "name",
            operator: "contains" as const,
            value: searchQuery,
          },
        ];
  const teacherFilter =
    selectedTeacher === "all"
      ? []
      : [
          {
            field: "teacher",
            operator: "eq" as const,
            value: selectedTeacher,
          },
        ];
  const subjectFilter =
    selectSubject === "all"
      ? []
      : [
          {
            field: "subject",
            operator: "eq" as const,
            value: selectSubject,
          },
        ];
  const table = useTable<ClassDetails>({
    columns: useMemo<ColumnDef<ClassDetails>[]>(
      () => [
        {
          id: "bannerUrl",
          accessorKey: "bannerUrl",
          size: 80,
          header: () => <p className="column-title ml-2">bannerUrl</p>,
          cell: ({ getValue }) => (
            <div className="flex items-center justify-center ml-2">
              <img
                src={getValue<string>() || "/placeholder-class.png"}
                alt="Class Banner"
                className="w-10 h-10 rounded object-cover"
              />
            </div>
          ),
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="column-title ml-2">name</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title ml-2">status</p>,
          cell: ({ getValue }) => {
            const status = getValue<string>();
            return (
              <Badge variant={status === "active" ? "default" : "secondary"}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            );
          },
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 150,
          header: () => <p className="column-title ml-2">subject</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "teacher",
          accessorKey: "teacher.name",
          size: 150,
          header: () => <p className="column-title ml-2">teacher</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 100,
          header: () => <p className="column-title ml-2">capacity</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground text-center">{getValue<string>()}</p>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 140,
          header: () => <p className="column-title ml-2">description</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "details",
          size: 140,
          header: () => <p className="column-title">Details</p>,
          cell: ({ row }) => (
            <ShowButton
              resource="classes"
              recordItemId={row.original.id}
              variant="outline"
              size="sm"
            >
              View
            </ShowButton>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...subjectFilter, ...teacherFilter, ...classSearch],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" as const }],
      },
    },
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Class</h1>
      <div className="flex items-center justify-between">
        <p>Quick access to essential metrics and management tools.</p>
        <div className="actions-row items-center">
          <div className="search-field">
            <Search className="search-icon" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Search by Class name or invite code..."
              type="text"
              className="pl-10 w-full p-1 rounded-md border border-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <Select
            value={selectedTeacher}
            onValueChange={setSelectedTeacher}
            disabled={teachersLoading}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="filter by teacher" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((tech) => (
                  <SelectItem value={tech.name} key={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={selectSubject}
            onValueChange={setSelectSubject}
            disabled={subjectsLoading}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">all Subjects</SelectItem>
                {subjects.map((sub) => (
                  <SelectItem value={sub.name} key={sub.id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateButton />
        </div>
      </div>
      <DataTable table={table} />
    </ListView>
  );
}
export default ClassesList;
