import { FulfilmentStatus } from "@prisma/client";
import { MdOutlineCancel } from "react-icons/md";
import { GoPackageDependents } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FcProcess } from "react-icons/fc";
import { FaRoute } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { RiMailSendLine } from "react-icons/ri";

export const statuses = [
  {
    value: FulfilmentStatus.CANCELLED,
    label: "Cancelled",

    icon: MdOutlineCancel,
  },
  {
    value: FulfilmentStatus.PENDING,
    label: "Pending",
    icon: GoPackageDependents,
  },
  {
    value: FulfilmentStatus.PROCESSING,
    label: "Processing",
    icon: FcProcess,
  },
  {
    value: FulfilmentStatus.DELIVERED,
    label: "Delivered",
    icon: IoMdCheckmarkCircleOutline,
  },
  {
    value: FulfilmentStatus.OUT_FOR_DELIVERY,
    label: "Out for Delivery",
    icon: FaRoute,
  },
  {
    value: FulfilmentStatus.RETURNED,
    label: "Returned",
    icon: TbTruckReturn,
  },
  {
    value: FulfilmentStatus.DISPATCHED,
    label: "Dispatched",
    icon: RiMailSendLine,
  },
];
