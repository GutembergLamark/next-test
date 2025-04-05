import { Label, Task } from "@prisma/client";

export interface ChartBarProps {
  data: Array<Task & { label: Label }>;
}
