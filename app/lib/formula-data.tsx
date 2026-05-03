import {
  IoDocumentTextOutline, IoAnalyticsOutline, IoMapOutline,
  IoShieldCheckmarkOutline, IoBookOutline
} from "react-icons/io5";
import { FaHouseUser } from "react-icons/fa6";
import { MdGavel } from "react-icons/md";

export const FORMULA_DATA = {
  math: [
    {
      group: "State Transfer Taxes",
      icon: <IoDocumentTextOutline size={16} />,
      color: "text-rose-400",
      borderColor: "border-rose-500",
      items: [
        { label: "Deed Stamps", math: "(Price / 100) * $0.70", note: "Round Price **UP** to nearest 100." },
        { label: "Note Stamps", math: "(Debt / 100) * $0.35", note: "Round Debt **UP** to 100." },
        { label: "Intangible Tax", math: "New Debt * 0.002", note: "Only applies to **NEW** mortgages." }
      ]
    },
    {
      group: "Investment & Appraisal",
      icon: <IoAnalyticsOutline size={16} />,
      color: "text-purple-400",
      borderColor: "border-purple-500",
      items: [
        { label: "The IRV Circle", math: "Income = Rate × Value", note: "To find Value: Income / Rate." }
      ]
    }
  ],
  legal: [
    {
      group: "Agency & Fiduciary",
      icon: <IoShieldCheckmarkOutline size={16} />,
      color: "text-blue-400",
      borderColor: "border-blue-500",
      items: [
        { label: "Single Agent", math: "Full Fiduciary Duties", note: "Highest representation (**COLD-AC**)." },
        { label: "Transaction Broker", math: "Limited Confidentiality", note: "The **Default** relationship in Florida." }
      ]
    }
  ]
};