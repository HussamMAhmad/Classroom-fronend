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
import { ClassDetails} from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

function ClassesList() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const classFilter =
    selectedClass === "all"
      ? []
      : [
          {
            field: "name",
            operator: "eq" as const,
            value: selectedClass,
          },
        ];
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

  const table = useTable<ClassDetails>({
    columns: useMemo<ColumnDef<ClassDetails>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 100,
          header: () => <p className="column-title ml-2">name</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 300,
          header: () => <p className="column-title ml-2">description</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title ml-2">status</p>,
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
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "courseCode",
          accessorKey: "courseCode",
          size: 150,
          header: () => <p className="column-title ml-2">courseCode</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "courseName",
          accessorKey: "courseName",
          size: 150,
          header: () => <p className="column-title ml-2">courseName</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "bannerCldPubId",
          accessorKey: "bannerCldPubId",
          size: 200,
          header: () => <p className="column-title ml-2">bannerCldPubId</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "bannerUrl",
          accessorKey: "bannerUrl",
          size: 200,
          header: () => <p className="column-title ml-2">bannerUrl</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "subject",
          accessorKey: "subject",
          size: 100,
          header: () => <p className="column-title ml-2">subject</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "teacher",
          accessorKey: "teacher",
          size: 100,
          header: () => <p className="column-title ml-2">teacher</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "department",
          accessorKey: "department",
          size: 150,
          header: () => <p className="column-title ml-2">department</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "schedules",
          accessorKey: "schedules",
          size: 200,
          header: () => <p className="column-title ml-2">schedules</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "inviteCode",
          accessorKey: "inviteCode",
          size: 200,
          header: () => <p className="column-title ml-2">inviteCode</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...classFilter, ...classSearch],
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
              placeholder="Search by Class..."
              type="text"
              className="pl-10 w-full p-1 rounded-md border border-muted focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="filter by class" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">all Classes</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
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
