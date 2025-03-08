import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const getPriorityColor = (priority) => {
  switch (priority) {
    case PRIORITY.URGENT:
      return 'bg-orange-500 text-white';
    case PRIORITY.HIGH:
      return 'bg-blue-900 text-white'; // Biru tua
    case PRIORITY.MEDIUM:
      return 'bg-blue-500 text-white'; // Biru sedang
    case PRIORITY.LOW:
      return 'bg-blue-300 text-white'; // Biru muda
    case PRIORITY.UNSORTED:
      return 'bg-gray-400 text-white'; // Abu-abu
    default:
      return 'bg-gray-200 text-gray-800'; // Fallback
  }
};

export const STATUS = {
  TODO: 'To Do',
  INPROGRESS: 'In Progress',
  DONE: 'Done',
};

export const PRIORITY = {
  URGENT: 'Urgent',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
  Unsorted: 'Unsorted',
};

export function flashMessage(params) {
  return params.props.flash_message;
}
