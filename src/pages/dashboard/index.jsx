import AppLayout from '@/components/layouts/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";

const data = [
  { week: 'Week 1', todo: 3, ongoing: 6, done: 4 },
  { week: 'Week 2', todo: 8, ongoing: 7, done: 3 },
  { week: 'Week 3', todo: 4, ongoing: 4, done: 3 },
  { week: 'Week 4', todo: 2, ongoing: 3, done: 5 }
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-3 py-4">
          {/* profile - mobile only */}
          <div className="py-4 col-span-1 space-y-6 md:hidden block">
            {/* Profile - Klik untuk buka popup */}
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

            {/* Popup Modal */}
            {isOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-100/80 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 h-auto">
                  {/* Profile Detail */}
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
                    <p className="text-sm text-gray-500">alextan@gmail.com</p>
                  </div>

                  {/* To Do List */}
                  <div className="mt-4">
                    <h3 className="py-3 text-l font-medium text-center">Your To Do List</h3>
                    <ul className="mt-2 space-y-2">
                      {[...Array(6)].map((_, i) => (
                        <li
                          key={i}
                          className="flex items-center p-2 bg-gray-100 rounded-md shadow space-x-3"
                        >
                          <img
                            src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238508/your-todo-list_rgg7ab.svg"
                            alt="To Do Icon"
                            className="w-8 h-8"
                          />
                          <div className="py-0.5 flex flex-col">
                            <span className="text-sm font-medium">Build Tailwind CSS</span>
                            <span className="text-xs text-gray-500">9 Maret 2025</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-[#6387CE] w-full h-[88px] flex items-center justify-start p-3">
              <CardContent className="px-4 py-2 flex items-center space-x-3 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                  <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146070/workspaces_shxqcw.svg" alt="Workspace" className="w-14 h-14" />
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-medium">Workspace</p>
                  <p className="text-l font-bold">10</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#6387CE] w-full h-[88px] flex items-center justify-start p-3">
              <CardContent className="px-4 py-2 flex items-center space-x-3 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                  <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146054/my-tasks_aoabbt.svg" alt="My Tasks" className="w-14 h-14" />
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-medium">My Tasks</p>
                  <p className="text-l font-bold">22</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-[#6387CE] w-full h-[88px] flex items-center justify-start p-3 self-end">
              <CardContent className="px-4 py-2 flex items-center space-x-3 w-full">
                <div className="w-10 h-10 flex items-center justify-center rounded-full">
                  <img src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742146010/my-tasks-done_cdnmvn.svg" alt="My Tasks Done" className="w-14 h-14" />
                </div>
                <div className="flex flex-col">
                  <p className="text-base font-medium">My Tasks Done</p>
                  <p className="text-l font-bold">8</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop chart */}
          <div className="bg-white p-6 rounded-lg w-full text-center h-[480px] mt-8 shadow-xl md:block hidden">
            <h2 className="text-l font-medium my-4 mt-8 text-center">Productivity Chart</h2>
            <ResponsiveContainer width="100%" height={350} className="mx-auto">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend wrapperStyle={{ marginTop: "10px" }} />
                <Bar dataKey="todo" fill="#354273" name="To do" />
                <Bar dataKey="ongoing" fill="#455CB0" name="Ongoing" />
                <Bar dataKey="done" fill="#879ADA" name="Done" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Mobile chart */}
          <div className="bg-white p-4 rounded-lg shadow-lg md:hidden block mt-8">
            <h2 className="text-l font-medium my-4 mb-6 text-center">Productivity Chart</h2>

            <div className="h-[300px] mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
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
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      padding: '8px'
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: '12px', paddingTop: '10px', textAlign: 'center' }}
                  />

                  <Bar
                    dataKey="todo"
                    fill="#354273"
                    name="To do"
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
          </div>
        </div>

        {/* Sidebar - desktop */}
        <div className="py-4 col-span-1 space-y-6 md:block hidden">
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
            <h3 className="py-3 text-l font-medium text-center">Your To Do List</h3>
            <ul className="mt-2 space-y-2">
              {[...Array(6)].map((_, i) => (
                <li key={i} className="flex items-center p-2 bg-white rounded-md shadow space-x-3">
                  <img
                    src="https://res.cloudinary.com/dy8fe8tbe/image/upload/v1742238508/your-todo-list_rgg7ab.svg"
                    alt="To Do Icon"
                    className="w-8 h-8"
                  />
                  <div className="py-0.5 flex flex-col">
                    <span className="text-sm font-medium">Build Tailwind CSS</span>
                    <span className="text-xs text-gray-500">9 Maret 2025</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>;