import AppLayout from '@/components/layouts/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { UserCircle, Briefcase, ClipboardList, CheckCircle } from 'lucide-react';

const data = [
  { week: 'Week 1', todo: 3, ongoing: 6, done: 4 },
  { week: 'Week 2', todo: 8, ongoing: 7, done: 3 },
  { week: 'Week 3', todo: 4, ongoing: 4, done: 3 },
  { week: 'Week 4', todo: 2, ongoing: 3, done: 5 }
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6 grid grid-cols-4 gap-6">
      <div className="col-span-3 space-y-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="grid grid-cols-3 gap-6">
          <Card className="w-[300px] h-32 flex items-center justify-start p-4">
            <CardContent className="p-5 flex items-center space-x-4 w-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <Briefcase className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">Workspace</p>
                <p className="text-2xl font-bold">10</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[300px] h-32 flex items-center justify-start p-4">
            <CardContent className="p-5 flex items-center space-x-4 w-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <ClipboardList className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">My Tasks</p>
                <p className="text-2xl font-bold">22</p>
              </div>
            </CardContent>
          </Card>
          <Card className="w-[300px] h-32 flex items-center justify-start p-4 self-end">
            <CardContent className="p-5 flex items-center space-x-4 w-full">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                <CheckCircle className="h-6 w-6 text-gray-700" />
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-semibold">My Tasks Done</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md w-full text-center h-[380px]">
          <h2 className="text-lg font-semibold mt-8 text-center">Productivity Chart</h2>
          <ResponsiveContainer width="80%" height={250} className="mx-auto">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend wrapperStyle={{ marginTop: "10px" }} />
              <Bar dataKey="todo" fill="#1E3A8A" name="To do" />
              <Bar dataKey="ongoing" fill="#3B82F6" name="Ongoing" />
              <Bar dataKey="done" fill="#93C5FD" name="Done" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="col-span-1 space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <UserCircle className="h-12 w-12 mx-auto" />
          <p className="text-lg font-semibold">Alex Tan</p>
          <p className="text-sm text-gray-500">alextan@gmail.com</p>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-center">Your To Do List</h3>
          <ul className="mt-2 space-y-2">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="flex flex-col p-2 bg-white rounded-md shadow space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">📄</span>
                  <span className="font-semibold">Build Tailwind CSS</span>
                </div>
                <span className="text-sm text-gray-500">9 Maret 2025</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

Dashboard.getLayout = (page) => <AppLayout title="Dashboard">{page}</AppLayout>;
