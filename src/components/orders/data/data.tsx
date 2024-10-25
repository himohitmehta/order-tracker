import { FulfilmentStatus } from "@prisma/client";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircle,
  CircleIcon,
} from "lucide-react";
import { FaStopwatch, FaQuestionCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    // value: "backlog",
    // label: "Backlog",
    value: FulfilmentStatus.CANCELLED,
    label: "Cancelled",

    icon: FaQuestionCircle,
  },
  {
    // value: "todo",
    // label: "Todo",
    value: FulfilmentStatus.PENDING,
    label: "Pending",
    icon: CircleIcon,
  },
  {
    // value: "in progress",
    // label: "In Progress",

    value: FulfilmentStatus.PROCESSING,
    label: "Processing",
    icon: FaStopwatch,
  },
  {
    // value: "done",
    // label: "Done",
    value: FulfilmentStatus.DELIVERED,
    label: "Delivered",
    icon: CheckCircle,
  },
  {
    // value: "canceled",
    // label: "Canceled",
    value: FulfilmentStatus.OUT_FOR_DELIVERY,
    label: "Out for Delivery",
    icon: MdClose,
  },
  {
    // value: "canceled",
    // label: "Canceled",
    value: FulfilmentStatus.RETURNED,
    label: "Returned",
    icon: MdClose,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
