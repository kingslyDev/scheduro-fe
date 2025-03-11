import { Search, Filter } from "lucide-react"

// Badge Component (simplified version of shadcn/ui Badge)
function Badge({ className, children }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${className}`}>{children}</span>
  )
}

// Button Component (simplified version of shadcn/ui Button)
function Button({ className, variant = "default", children, ...props }) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  const variantStyles = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Input Component (simplified version of shadcn/ui Input)
function Input({ className, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  )
}

// Status Badge Component
function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case "Ongoing":
        return "bg-blue-500 hover:bg-blue-600"
      case "To Do":
        return "bg-[#2D3B55] hover:bg-[#1E2A40]"
      case "Done":
        return "bg-blue-300 hover:bg-blue-400"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  return <Badge className={`${getStatusStyles()} text-white font-medium px-4 py-1`}>{status}</Badge>
}

// Task Table Component
function TaskTable() {
  const tasks = [
    {
      id: 1,
      title: "Fetch and Display API Data",
      status: "Ongoing",
      startDate: "27 February 2025",
      dueDate: "4 March 2025",
    },
    {
      id: 2,
      title: "Integrate API with Frontend",
      status: "Ongoing",
      startDate: "1 March 2025",
      dueDate: "7 March 2025",
    },
    {
      id: 3,
      title: "Set Up a Rest API",
      status: "To Do",
      startDate: "15 March 2025",
      dueDate: "22 March 2025",
    },
    {
      id: 4,
      title: "Build Interactive Prototype",
      status: "Done",
      startDate: "25 February 2025",
      dueDate: "2 March 2025",
    },
    {
      id: 5,
      title: "Make a Login Page",
      status: "To Do",
      startDate: "19 April 2025",
      dueDate: "25 April 2025",
    },
    {
      id: 6,
      title: "User Research & Persona Creation",
      status: "Done",
      startDate: "19 February 2025",
      dueDate: "25 February 2025",
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-100/50">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Start Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-100">
              <td className="py-4 px-4">{task.title}</td>
              <td className="py-4 px-4">
                <StatusBadge status={task.status} />
              </td>
              <td className="py-4 px-4">{task.startDate}</td>
              <td className="py-4 px-4">{task.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Main Dashboard Component
export default function TaskDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Tasks</h1>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          {/* Search and Actions Row */}
          <div className="flex flex-col sm:flex-row items-center gap-2 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input placeholder="Search..." className="pl-9 bg-blue-50/50 border-0 h-10" />
            </div>

            <div className="flex items-center gap-3">
              <select className="h-10 px-3 py-2 bg-blue-50/50 rounded-md border-0 text-sm">
                <option>20</option>
                <option>30</option>
                <option>40</option>
              </select>

              <Button variant="outline" className="flex items-center gap-2 h-10 px-4">
                <Filter className="h-4 w-4" />
                Filter
              </Button>

              <Button className="h-10 px-5">Create Task</Button>
            </div>
          </div>

          {/* Task Table */}
          <TaskTable />
        </div>
      </main>
    </div>
  )
}