import { ShowView } from "@/components/refine-ui/views/show-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { useList } from "@refinedev/core";
import { Department, Subject, User } from "@/types";
import { useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "dayjs";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  BookOpen,
  PieChartIcon,
  BookText,
  UserRoundPen,
} from "lucide-react";
import { Pie, PieChart } from "recharts";

export default function Dashboard() {
  const { query: subjectsQuery } = useList<Subject>({
    resource: "subjects",
    pagination: { mode: "off" },
  });

  const { query: teachersQuery } = useList<User>({
    resource: "users",
    pagination: { mode: "off" },
    filters: [
      {
        field: "role",
        operator: "eq",
        value: "teacher",
      },
    ],
  });

  const subjects = subjectsQuery?.data?.data || [];
  const subjectLoading = subjectsQuery.isLoading;

  const teachers = teachersQuery?.data?.data || [];
  const teacherLoading = teachersQuery.isLoading;

  const chartData = useMemo(() => {
    const groups = subjects.reduce((acc, item) => {
      if (!item.createdAt) return acc;
      const createdAt = dayjs(item.createdAt);
      if (!createdAt.isValid()) return acc;
      const monthKey = createdAt.format("YYYY-MM");
      acc[monthKey] = (acc[monthKey] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([monthKey, count]) => ({
        month: dayjs(`${monthKey}-01`).format("MMM YY"),
        count,
      }));
  }, [subjects]);

  const pieChartData = useMemo(() => {
    const groups = subjects.reduce((acc, item) => {
      const department = item.department as Department;
      acc[department.name] = (acc[department.name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(groups).map(([name, count], index) => ({
      name,
      count,
      fill: `var(--chart-${index + 1})`,
    }));
  }, [subjects]);

  const chartConfig = {
    count: {
      label: "Subjects",
      color: "var(--primary)",
    },
  };

  const pieChartConfig = useMemo(() => {
    const config: Record<string, { label: string }> = {
      count: { label: "Total" },
    };

    pieChartData.forEach((item) => {
      config[item.name] = {
        label: item.name,
      };
    });
    return config as ChartConfig;
  }, [pieChartData]);

  // if (teacherLoading) return <Skeleton className="grid auto-rows-min gap-4 md:grid-cols-3" />;
  if (subjectLoading) return <Skeleton className="h-75 w-full" />;

  return (
    <ShowView>
      <Breadcrumb />
      <div className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <Card className="relative overflow-hidden transition-all hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardDescription className="text-sm font-medium">
                  Total Departments
                </CardDescription>
                <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">
                  {pieChartData.length}
                </CardTitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <BookOpen className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Active academic departments and tracks
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden transition-all hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardDescription className="text-sm font-medium">
                  Total Subjects
                </CardDescription>
                <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">
                  {subjects.length}
                </CardTitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <BookText className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Total courses managed in the system
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden transition-all hover:shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardDescription className="text-sm font-medium">
                  Total Teachers
                </CardDescription>
                <CardTitle className="text-3xl font-bold tracking-tight tabular-nums">
                  {teachers.length}
                </CardTitle>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <UserRoundPen className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Registered and active faculty members
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid md:grid-cols-2 gap-4 items-center">
          <Card className="flex flex-col h-125">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Monthly Growth
              </CardTitle>
              <CardDescription>
                Number of subjects added per month
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex items-center">
              <ChartContainer config={chartConfig} className="min-h-50 w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="flex flex-col h-125">
            <CardHeader className="items-center pb-0">
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Departments Distribution
              </CardTitle>
              <CardDescription>Subjects share per department</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
              <ChartContainer
                config={pieChartConfig}
                className="mx-auto aspect-square max-h-62.5"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieChartData}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={60}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm border-t pt-4">
              <div className="flex items-center gap-2 leading-none font-medium">
                Live data configuration active{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-muted-foreground">
                Showing current distribution across {pieChartData.length}{" "}
                departments
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </ShowView>
  );
}
