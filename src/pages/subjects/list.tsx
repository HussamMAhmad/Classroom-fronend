import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { DEPARTMENT_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { Subject } from "@/types";
import { Badge } from "@/components/ui/badge";

function SubjectList() {
  const [searchQuery, setsearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departmentFilters =
    selectedDepartment === "all"
      ? []
      : [
          {
            field: "department",
            operator: "eq" as const,
            value: selectedDepartment,
          },
        ];
  const searchFilters = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 100,
          header: () => <p className="column-title ml-2">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: "name",
          size: 200,
          accessorKey: "name",
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
          filterFn: "includesString",
        },
        {
          id: "department",
          accessorKey: "department",
          size: 150,
          header: () => <span className="column-title">Department</span>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
        },
        {
          id: "description",
          size: 300,
          accessorKey: "description",
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "subjects",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...departmentFilters, ...searchFilters],
      },
      sorters: {
        initial : [
          {field : "id" , order : "desc" as const}
        ]
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Subject</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>
        <div className="actions-row">
          <div className="search-field">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by name..."
              className="pl-10 w-full p-1 rounded-md border border-muted focus:border-primary focus:ring-1 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => {
                setsearchQuery(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select
              value={selectedDepartment}
              onValueChange={setSelectedDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENT_OPTIONS.map((e) => {
                  return (
                    <SelectItem value={e.value} key={e.label}>
                      {e.label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <CreateButton />
          </div>
        </div>
      </div>
      <DataTable table={subjectTable} />
    </ListView>
  );
}

export default SubjectList;
