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
import { ROLE_OPTIONS } from "@/constants";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ShowButton } from "@/components/refine-ui/buttons/show";

function UsersList() {
  const [searchQuery, setsearchQuery] = useState("");
  const [selectRole, setSelectRole] = useState("all");

  const userFilter =
    selectRole === "all"
      ? []
      : [
          {
            field: "role",
            operator: "eq" as const,
            value: selectRole,
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
          id: "name",
          accessorKey: "name",
          size: 100,
          header: () => <p className="column-title">Name</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "email",
          accessorKey: "email",
          size: 150,
          header: () => <p className="column-title">Email</p>,
          cell: ({ getValue }) => (
            <p className="text-foreground">{getValue<string>()}</p>
          ),
        },
        {
          id: "role",
          accessorKey: "role",
          size: 100,
          header: () => <p className="column-title">Role</p>,
          cell: ({ getValue }) => {
            let badge;
            if (getValue<string>() === "teacher") {
              badge = "bg-sky-800";
            } else if (getValue<string>() === "admin") {
              badge = "bg-red-800";
            } else {
              badge = "bg-green-800";
            }
            return <Badge className={`${badge}`}>{getValue<string>()}</Badge>;
          },
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "users",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...userFilter , ...userSearch],
      },
    },
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Users</h1>
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
            <Select value={selectRole} onValueChange={setSelectRole}>
              <SelectTrigger>
                <SelectValue placeholder="filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {ROLE_OPTIONS.map((e) => {
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

export default UsersList;
