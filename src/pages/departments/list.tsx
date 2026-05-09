import React from "react";
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
import { useMemo, useState } from "react";
import { DEPARTMENT_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ShowButton } from "@/components/refine-ui/buttons/show";

function DepartmentList() {
  const [searchQuery, setsearchQuery] = useState("");
  const [selectDepartment, setselectDepartment] = useState("all");

  const userFilter =
    selectDepartment === "all"
      ? []
      : [
          {
            field: "department",
            operator: "eq" as const,
            value: selectDepartment,
          },
        ];

  const userSearch = searchQuery
    ? [
        {
          field: "name",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const userTable = useTable<User>({
    columns: useMemo<ColumnDef<User>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 50,
          header: () => <p className="column-title">Code</p>,
          cell: ({ getValue }) => (
            <Badge>{getValue<string>()}</Badge>
          ),
        },
        {
          id: "name",
          accessorKey: "name",
          size: 100,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 150,
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <Badge variant="secondary">{getValue<string>()}</Badge>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "departments",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...userFilter, ...userSearch],
      },
    },
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Departments</h1>
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
              value={selectDepartment}
              onValueChange={setselectDepartment}
            >
              <SelectTrigger>
                <SelectValue placeholder="filter by role" />
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
      <DataTable table={userTable} />
    </ListView>
  );
}

export default DepartmentList;
