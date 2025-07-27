import { ColumnDef } from "@tanstack/react-table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export type Tip = {
  id: string;
  tip: string;
  symbol: string;
  compared?: string;
  strategy?: string;
  sector?: string;
  sentiment?: string;
  holding?: string;
  risk?: string;
  conviction?: string;
  target_duration?: string;
  catalyst?: string;
  valuation?: string;
  technical?: string;
  confidence?: string;
  diversification?: string;
  liquidity?: string;
  expected_return?: string;
  performance?: string;
  created_at?: string;
  name?: string;
};

export const columns: ColumnDef<Tip>[] = [
  {
    accessorKey: "created_at",
    header: "Time",
    cell: ({ row }) => {
      const date = row.original.created_at ? new Date(row.original.created_at) : null;
      return date ? (
        <span title={date.toLocaleString()} style={{ color: "#222", fontSize: 13 }}>
          {(() => {
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const min = 60 * 1000, hour = 60 * min, day = 24 * hour;
            if (diff < min) return "Just now";
            if (diff < hour) return `${Math.floor(diff / min)} min ago`;
            if (diff < day) return `${Math.floor(diff / hour)} hr ago`;
            return `${Math.floor(diff / day)}d ago`;
          })()}
        </span>
      ) : null;
    },
    size: 90,
    minSize: 80,
    maxSize: 100,
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <span style={{ fontWeight: 600, color: "#222", fontSize: 13 }}>{row.original.symbol}</span>,
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "compared",
    header: "Compared",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.compared}</span>,
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "tip",
    header: "Tip",
    cell: ({ row }) => {
      const tip = row.original.tip || "";
      const words = tip.split(" ");
      const truncated = words.length > 45 ? words.slice(0, 45).join(" ") + "..." : tip;
      return words.length > 45 ? (
        <HoverCard>
          <HoverCardTrigger asChild>
            <span
              style={{ color: "#222", cursor: "pointer", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 300, display: "inline-block", verticalAlign: "middle", fontSize: 13 }}
            >
              {truncated}
            </span>
          </HoverCardTrigger>
          <HoverCardContent style={{ maxWidth: 400, fontSize: 14, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
            {tip}
          </HoverCardContent>
        </HoverCard>
      ) : (
        <span style={{ color: "#222", fontSize: 13 }}>{tip}</span>
      );
    },
    size: 300,
    minSize: 180,
    maxSize: 400,
  },
  {
    accessorKey: "strategy",
    header: "Strategy",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.strategy}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "sector",
    header: "Sector",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.sector}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "sentiment",
    header: "Sentiment",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.sentiment}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "holding",
    header: "Holding",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.holding}</span>,
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "risk",
    header: "Risk",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.risk}</span>,
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
  {
    accessorKey: "conviction",
    header: "Conviction",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.conviction}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "target_duration",
    header: "Target Duration",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.target_duration}</span>,
    size: 110,
    minSize: 90,
    maxSize: 140,
  },
  {
    accessorKey: "catalyst",
    header: "Catalyst",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.catalyst}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "valuation",
    header: "Valuation",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.valuation}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "technical",
    header: "Technical",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.technical}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.confidence}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "diversification",
    header: "Diversification",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.diversification}</span>,
    size: 110,
    minSize: 90,
    maxSize: 140,
  },
  {
    accessorKey: "liquidity",
    header: "Liquidity",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.liquidity}</span>,
    size: 90,
    minSize: 70,
    maxSize: 120,
  },
  {
    accessorKey: "expected_return",
    header: "Expected Return",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.expected_return}</span>,
    size: 110,
    minSize: 90,
    maxSize: 140,
  },
  {
    accessorKey: "performance",
    header: "Performance",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.performance}</span>,
    size: 100,
    minSize: 80,
    maxSize: 120,
  },
  {
    accessorKey: "name",
    header: "By",
    cell: ({ row }) => <span style={{ color: "#222", fontSize: 13 }}>{row.original.name}</span>,
    size: 80,
    minSize: 60,
    maxSize: 100,
  },
];
