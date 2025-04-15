
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ListTodo } from "lucide-react";
import TaskList from "@/components/tasks/TaskList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  clientName?: string;
}

// Using the clients data from your existing Clients page
const clients = [
  { id: 1, name: "John Smith" },
  { id: 2, name: "Sarah Johnson" },
  { id: 3, name: "Michael Davis" },
  { id: 4, name: "Emma Wilson" },
  { id: 5, name: "Robert Brown" },
  { id: 6, name: "Jennifer Lee" },
  { id: 7, name: "William Thompson" },
  { id: 8, name: "Linda Martinez" },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [selectedClient, setSelectedClient] = useState<string>("");

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.trim(),
      completed: false,
      clientName: selectedClient || undefined,
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
    setSelectedClient("");
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-6 w-6" />
            Task Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addTask} className="flex gap-2 mb-6">
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Select
                value={selectedClient}
                onValueChange={setSelectedClient}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No client</SelectItem>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.name}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </form>
          
          <TaskList 
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Tasks;
