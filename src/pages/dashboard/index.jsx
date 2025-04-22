"use client";

import { useState, useEffect } from "react";
import AppLayout from "@/components/layouts/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton"; // Impor Skeleton dari Shadcn
import { STATUS } from "@/lib/utils";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [tasksDone, setTasksDone] = useState(0);
  const [toDoTasks, setToDoTasks] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading

  const loadDataFromLocalStorage = () => {
    try {
      const storedWorkspaces =
        JSON.parse(localStorage.getItem("workspaces")) || [];
      setWorkspaces(storedWorkspaces);

      const allTasks = storedWorkspaces.flatMap((ws) => ws.tasks || []);
      setTotalTasks(allTasks.length);
      const doneTasks = allTasks.filter(
        (task) => task.status === STATUS.DONE
      ).length;
      setTasksDone(doneTasks);

      const toDoList = allTasks
        .filter((task) => task.status === STATUS.TODO)
        .slice(0, 6);
      setToDoTasks(toDoList);

      const weeksData = calculateWeeklyData(allTasks);
      setChartData(weeksData);
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
      setWorkspaces([]);
      setTotalTasks(0);
      setTasksDone(0);
      setToDoTasks([]);
      setChartData([]);
    } finally {
      setIsLoading(false); // Selesai memuat data
    }
  };

  const getLastFourWeeks = () => {
    const now = new Date();
    const fourWeeksAgo = new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000);
    const weeks = [];
    let currentWeekStart = new Date(fourWeeksAgo);

    while (currentWeekStart.getDay() !== 1) {
      currentWeekStart.setDate(currentWeekStart.getDate() + 1);
    }

    let weekIndex = 1;
    while (currentWeekStart < now && weekIndex <= 4) {
      const weekEnd = new Date(
        currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000
      );
      if (weekEnd > now) {
        weekEnd.setTime(now.getTime());
      }
      weeks.push({
        start: new Date(currentWeekStart),
        end: new Date(weekEnd),
        label: `Week ${weekIndex}`,
      });
      currentWeekStart.setDate(currentWeekStart.getDate() + 7);
      weekIndex++;
    }

    return weeks;
  };

  const calculateWeeklyData = (tasks) => {
    const weeks = getLastFourWeeks();
    const data = weeks.map((week) => ({
      week: week.label,
      todo: 0,
      ongoing: 0,
      done: 0,
    }));

    tasks.forEach((task) => {
      const taskDate = task.deadline ? new Date(task.deadline) : null;
      if (!taskDate) {
        if (data.length > 0) {
          data[data.length - 1].todo += 1;
        }
        return;
      }

      weeks.forEach((week, index) => {
        if (taskDate >= week.start && taskDate <= week.end) {
          if (task.status === STATUS.TODO) {
            data[index].todo += 1;
          } else if (task.status === STATUS.INPROGRESS) {
            data[index].ongoing += 1;
          } else if (task.status === STATUS.DONE) {
            data[index].done += 1;
          }
        }
      });
    });

    return data;
  };

  const getMaxValue = (data) => {
    let max = 0;
    data.forEach((week) => {
      const weekMax = Math.max(week.todo, week.ongoing, week.done);
      if (weekMax > max) {
        max = weekMax;
      }
    });
    return Math.ceil(max);
  };

  useEffect(() => {
    loadDataFromLocalStorage();
  }, []);

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "workspaces") {
        loadDataFromLocalStorage();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const maxValue = getMaxValue(chartData);
  const yAxisTicks = Array.from({ length: maxValue + 1 }, (_, i) => i);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-3 py-4">
          {/* Profile - mobile only */}
          <div className="py-4 col-span-1 space-y-6 md:hidden block">
            {isLoading ? (
              <>
                <div className="absolute top-4 right-4 w-16 h-16 mt-16 mr-6 flex items-center justify-center rounded-full border border-[#6387CE] shadow-accent">
                  <Skeleton className="w-14 h-14 rounded-full" />
                </div>
                <div className="absolute top-6 mt-16 flex flex-col text-left">
                  <Skeleton className="h-5 w-24 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </>
            ) : (
              <>
                <div
                  className="absolute top-4 right-4 w-16 h-16 mt-16 mr-6 flex items-center justify-center rounded-full border border-[#6387CE] shadow-accent cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <img
                    src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238102/user_profile_grka1i.svg"
                    className="w-14 h-14 mx-auto"
                    alt="User Profile"
                  />
                </div>
                <div className="absolute top-6 mt-16 flex flex-col text-left">
                  <p className="text-l font-medium text-gray-800">Alex Tan</p>
                  <p className="text-sm text-gray-500">alextan@gmail.com</p>
                </div>
              </>
            )}

            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 h-auto">
                  {isLoading ? (
                    <>
                      <div className="text-center border-b pb-4">
                        <Skeleton className="w-14 h-14 mx-auto rounded-full" />
                        <Skeleton className="h-5 w-24 mt-2 mx-auto" />
                        <Skeleton className="h-4 w-32 mt-1 mx-auto" />
                      </div>
                      <div className="mt-4">
                        <Skeleton className="h-6 w-32 mx-auto mb-4" />
                        <ul className="mt-2 space-y-2">
                          {Array(3)
                            .fill(0)
                            .map((_, index) => (
                              <li
                                key={index}
                                className="flex items-center p-2 bg-gray-100 rounded-md shadow space-x-3"
                              >
                                <Skeleton className="w-8 h-8 rounded-full" />
                                <div className="flex flex-col space-y-2">
                                  <Skeleton className="h-4 w-40" />
                                  <Skeleton className="h-3 w-24" />
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center border-b pb-4">
                        <button
                          className="absolute top-10 right-8 text-gray-500 hover:text-gray-700"
                          onClick={() => setIsOpen(false)}
                        >
                          ✖
                        </button>
                        <img
                          src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238102/user_profile_grka1i.svg"
                          className="w-14 h-14 mx-auto"
                          alt="User Profile"
                        />
                        <p className="text-l font-medium">Alex Tan</p>
                        <p className="text-sm text-gray-500">
                          alextan@gmail.com
                        </p>
                      </div>
                      <div className="mt-4">
                        <h3 className="py-3 text-l font-medium text-center">
                          Your To Do List
                        </h3>
                        <ul className="mt-2 space-y-2">
                          {toDoTasks.length > 0 ? (
                            toDoTasks.map((task) => (
                              <li
                                key={task.id}
                                className="flex items-center p-2 bg-gray-100 rounded-md shadow space-x-3"
                              >
                                <img
                                  src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238508/your-todo-list_rgg7ab.svg"
                                  alt="To Do Icon"
                                  className="w-8 h-8"
                                />
                                <div className="py-0.5 flex flex-col">
                                  <span className="text-sm font-medium">
                                    {task.title}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {task.deadline
                                      ? new Date(
                                          task.deadline
                                        ).toLocaleDateString("id-ID", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })
                                      : "No Deadline"}
                                  </span>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="text-center text-sm text-gray-500">
                              No tasks to do
                            </li>
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Stats tasks */}
          <div className="grid gap-2 grid-cols-[repeat(auto-fit,_minmax(180px,_1fr))]">
  {(isLoading
    ? Array(3).fill(0)
    : [
        {
          title: "Workspace",
          value: workspaces.length,
          icon: "https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146070/workspaces_shxqcw.svg",
        },
        {
          title: "My Tasks",
          value: totalTasks,
          icon: "https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146054/my-tasks_aoabbt.svg",
        },
        {
          title: "Tasks Done",
          value: tasksDone,
          icon: "https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146010/my-tasks-done_cdnmvn.svg",
        },
      ]
  ).map((stat, index) => (
    <Card
      key={index}
      className="min-w-[180px] h-[88px] border-[#6387CE] flex items-center justify-start p-3"
    >
      <CardContent className="px-4 py-2 flex items-center gap-3 w-full">
  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
    <img
      src={stat.icon}
      alt={stat.title}
      className="max-w-full max-h-full object-contain"
    />
  </div>
  <div className="flex flex-col justify-center text-left leading-tight">
    <p className="text-sm font-medium truncate">{stat.title}</p>
    <p className="text-base font-bold">{stat.value}</p>
  </div>
</CardContent>


    </Card>
  ))}
</div>


          {/* Desktop chart */}
          <div className="bg-white p-6 rounded-lg w-full text-center h-[480px] mt-8 shadow-xl md:block hidden">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-48 mx-auto my-4" />
                <Skeleton className="w-full h-[350px] mx-auto" />
              </>
            ) : (
              <>
                <h2 className="text-l font-medium my-4 mt-8 text-center">
                  Productivity Chart (Last 4 Weeks)
                </h2>
                {chartData.length > 0 &&
                chartData.some(
                  (week) => week.todo > 0 || week.ongoing > 0 || week.done > 0
                ) ? (
                  <ResponsiveContainer
                    width="100%"
                    height={350}
                    className="mx-auto"
                  >
                    <BarChart
                      data={chartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="week" />
                      <YAxis
                        domain={[0, maxValue]}
                        ticks={yAxisTicks}
                        tickFormatter={(value) => Math.round(value)}
                      />
                      <Tooltip
                        content={({ payload }) => {
                          if (payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white p-2 border rounded shadow">
                                <p className="font-medium">{data.week}</p>
                                <p>To Do: {data.todo}</p>
                                <p>Ongoing: {data.ongoing}</p>
                                <p>Done: {data.done}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend wrapperStyle={{ marginTop: "10px" }} />
                      <Bar dataKey="todo" fill="#879ADA" name="To Do" />
                      <Bar dataKey="ongoing" fill="#455CB0" name="Ongoing" />
                      <Bar dataKey="done" fill="#354273" name="Done" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-center text-gray-500 mt-16">
                    No data available for the last 4 weeks
                  </p>
                )}
              </>
            )}
          </div>

          {/* Mobile chart */}
          <div className="bg-white p-4 rounded-lg shadow-lg md:hidden block mt-8">
            {isLoading ? (
              <>
                <Skeleton className="h-6 w-48 mx-auto my-4 mb-6" />
                <Skeleton className="w-full h-[300px]" />
              </>
            ) : (
              <>
                <h2 className="text-l font-medium my-4 mb-6 text-center">
                  Productivity Chart (Last 4 Weeks)
                </h2>
                {chartData.length > 0 &&
                chartData.some(
                  (week) => week.todo > 0 || week.ongoing > 0 || week.done > 0
                ) ? (
                  <div className="h-[300px] mt-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -15, bottom: 20 }}
                        barGap={2}
                        barSize={12}
                      >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis
                          dataKey="week"
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          fontSize={12}
                          tickLine={false}
                          axisLine={false}
                          domain={[0, maxValue]}
                          ticks={yAxisTicks}
                          tickFormatter={(value) => Math.round(value)}
                        />
                        <Tooltip
                          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                            padding: "8px",
                          }}
                          content={({ payload }) => {
                            if (payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-2 border rounded shadow">
                                  <p className="font-medium">{data.week}</p>
                                  <p>To Do: {data.todo}</p>
                                  <p>Ongoing: {data.ongoing}</p>
                                  <p>Done: {data.done}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          iconType="circle"
                          iconSize={8}
                          wrapperStyle={{
                            fontSize: "12px",
                            paddingTop: "10px",
                            textAlign: "center",
                          }}
                        />
                        <Bar
                          dataKey="todo"
                          fill="#354273"
                          name="To Do"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="ongoing"
                          fill="#455CB0"
                          name="Ongoing"
                          radius={[4, 4, 0, 0]}
                        />
                        <Bar
                          dataKey="done"
                          fill="#879ADA"
                          name="Done"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-center text-gray-500 mt-16">
                    No data available for the last 4 weeks
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar - desktop */}
        <div className="py-4 col-span-1 space-y-6 md:block hidden">
          {isLoading ? (
            <>
              <div className="p-4 rounded-lg text-center border border-[#6387CE]">
                <Skeleton className="w-14 h-14 mx-auto rounded-full" />
                <Skeleton className="h-5 w-24 mt-2 mx-auto" />
                <Skeleton className="h-4 w-32 mt-1 mx-auto" />
              </div>
              <div className="border border-[#6387CE] p-4 rounded-lg">
                <Skeleton className="h-6 w-32 mx-auto mb-4" />
                <ul className="mt-2 space-y-2">
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <li
                        key={index}
                        className="flex items-center p-2 bg-white rounded-md shadow space-x-3"
                      >
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="flex flex-col space-y-2">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 rounded-lg text-center border border-[#6387CE]">
                <img
                  src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238102/user_profile_grka1i.svg"
                  className="w-14 h-14 mx-auto"
                  alt="User Profile"
                />
                <p className="text-l font-medium">Alex Tan</p>
                <p className="text-sm text-gray-500">alextan@gmail.com</p>
              </div>
              <div className="border border-[#6387CE] p-4 rounded-lg">
                <h3 className="py-3 text-l font-medium text-center">
                  Your To Do List
                </h3>
                <ul className="mt-2 space-y-2">
                  {toDoTasks.length > 0 ? (
                    toDoTasks.map((task) => (
                      <li
                        key={task.id}
                        className="flex items-center p-2 bg-white rounded-md shadow space-x-3"
                      >
                        <img
                          src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238508/your-todo-list_rgg7ab.svg"
                          alt="To Do Icon"
                          className="w-8 h-8"
                        />
                        <div className="py-0.5 flex flex-col">
                          <span className="text-sm font-medium">
                            {task.title}
                          </span>
                          <span className="text-xs text-gray-500">
                            {task.deadline
                              ? new Date(task.deadline).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )
                              : "No Deadline"}
                          </span>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-sm text-gray-500">
                      No tasks to do
                    </li>
                  )}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

Dashboard.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>;

export default Dashboard;
