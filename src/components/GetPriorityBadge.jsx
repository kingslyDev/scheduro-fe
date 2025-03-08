import { Badge } from '@/Components/ui/badge';
import { PRIORITY } from '@/lib/utils';

export default function GetPriorityBadge({ priority }) {
  const { URGENT, HIGH, MEDIUM, LOW, UNKNOWN } = PRIORITY;
  let badge, text;

  switch (priority) {
    case URGENT:
      badge = 'bg-orange-500 hover:bg-orange-600 text-white';
      text = URGENT;
      break;
    case HIGH:
      badge = 'bg-blue-900 hover:bg-blue-800 text-white';
      text = HIGH;
      break;
    case MEDIUM:
      badge = 'bg-blue-500 hover:bg-blue-600 text-white';
      text = MEDIUM;
      break;
    case LOW:
      badge = 'bg-blue-300 hover:bg-blue-400 text-white';
      text = LOW;
      break;
    default:
      badge = 'bg-gray-400 hover:bg-gray-500 text-white';
      text = UNKNOWN;
  }

  return <Badge className={badge}>{text}</Badge>;
}
