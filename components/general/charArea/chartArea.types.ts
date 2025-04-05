import { Label, Task } from "@prisma/client";

export interface ChartAreaProps {
  data: Array<Task & { label: Label }>;
}
