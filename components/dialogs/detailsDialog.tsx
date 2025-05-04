import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LogEntry } from "@/types/log";
import { formatDate } from "@/utils/formatDate";
import { LevelBadge } from "../logs/levelBadge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export const DetailsDialog = ({
  log,
  onClose,
}: {
  log: LogEntry;
  onClose: () => void;
}) => {
  const handleCopy = () => {
    const details = `Time: ${formatDate(log.timestamp)}
Level: ${log.level}
Message: ${log.message}
Trace: ${log.trace}
Author: ${log.authorId}`;

    navigator.clipboard.writeText(details);
    toast.success("Log details copied to clipboard");
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Log Details
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Time:</strong> {formatDate(log.timestamp)}
          </p>
          <p>
            <strong>Level:</strong> <LevelBadge level={log.level} />
          </p>
          <p>
            <strong>Message:</strong> {log.message}
          </p>
          <p>
            <strong>Trace:</strong> {log.trace}
          </p>
          <p>
            <strong>Author:</strong> {log.authorId}
          </p>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            tabIndex={0}
            onClick={handleCopy}
          >
            Copy
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>

    </Dialog>
  );
};
