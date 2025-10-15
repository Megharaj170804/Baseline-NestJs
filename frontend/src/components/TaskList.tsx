'use client';

import { Task, UpdateTaskData } from '@/lib/api';
import { PencilIcon, TrashIcon, CheckIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, data: UpdateTaskData) => void;
}

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
  'in-progress': { color: 'bg-blue-100 text-blue-800', icon: PlayIcon, label: 'In Progress' },
  completed: { color: 'bg-green-100 text-green-800', icon: CheckIcon, label: 'Completed' },
};

export default function TaskList({ tasks, loading, onEdit, onDelete, onStatusChange }: TaskListProps) {
  const handleStatusChange = async (task: Task, newStatus: Task['status']) => {
    await onStatusChange(task._id, { status: newStatus });
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-gray-500">
          <ClockIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-500">Get started by creating your first task.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {tasks.map((task) => {
        const config = statusConfig[task.status];
        const StatusIcon = config.icon;
        
        return (
          <div key={task._id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {task.title}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {config.label}
                  </span>
                  {task.category && (
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {task.category}
                    </span>
                  )}
                </div>
                
                {task.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span>Created: {new Date(task.createdAt).toLocaleDateString()}</span>
                  {task.updatedAt !== task.createdAt && (
                    <span>Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {/* Status Change Buttons */}
                <div className="flex space-x-1">
                  {Object.entries(statusConfig).map(([status, config]) => {
                    if (status === task.status) return null;
                    const Icon = config.icon;
                    return (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(task, status as Task['status'])}
                        className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                        title={`Mark as ${config.label}`}
                      >
                        <Icon className="h-4 w-4 text-gray-500" />
                      </button>
                    );
                  })}
                </div>
                
                {/* Edit Button */}
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 rounded-full hover:bg-blue-100 transition-colors"
                  title="Edit task"
                >
                  <PencilIcon className="h-4 w-4 text-blue-600" />
                </button>
                
                {/* Delete Button */}
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-2 rounded-full hover:bg-red-100 transition-colors"
                  title="Delete task"
                >
                  <TrashIcon className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}