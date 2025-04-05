import { $Enums } from "@prisma/client";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  Timer,
} from "lucide-react";

export const statuses = [
  {
    value: $Enums?.Status?.PENDING,
    label: "Pendente",
    icon: Circle,
  },
  {
    value: $Enums?.Status?.IN_PROGRESS,
    label: "Em progresso",
    icon: Timer,
  },
  {
    value: $Enums?.Status?.COMPLETED,
    label: "Concluido",
    icon: CheckCircle,
  },
];

export const priorities = [
  {
    value: $Enums?.Priority?.LOW,
    label: "Baixa",
    icon: ArrowDown,
  },
  {
    value: $Enums?.Priority?.MEDIUM,
    label: "Média",
    icon: ArrowRight,
  },
  {
    value: $Enums?.Priority?.HIGH,
    label: "Alta",
    icon: ArrowUp,
  },
];
