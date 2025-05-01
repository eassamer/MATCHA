"use client";

import { useState } from "react";
import { MoreVertical, UserX, Shield, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function ActionMenu() {
  const [unmatchDialogOpen, setUnmatchDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="p-2 border-[#E8E6EA] border-2 rounded-[11px]"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setUnmatchDialogOpen(true)}>
            <UserX className="mr-2 h-4 w-4" />
            Unmatch
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setBlockDialogOpen(true)}>
            <Shield className="mr-2 h-4 w-4" />
            Block
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setReportDialogOpen(true)}>
            <Flag className="mr-2 h-4 w-4" />
            Report
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Unmatch Dialog */}
      <Dialog open={unmatchDialogOpen} onOpenChange={setUnmatchDialogOpen}>
        <DialogContent className="rounded-lg max-w-[300px] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Unmatch User</DialogTitle>
            <DialogDescription>
              Are you sure you want to unmatch this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              onClick={() => setUnmatchDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setUnmatchDialogOpen(false)}
              style={{ backgroundColor: "#C13D88" }}
            >
              Unmatch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Dialog */}
      <Dialog open={blockDialogOpen} onOpenChange={setBlockDialogOpen}>
        <DialogContent className="rounded-lg max-w-[300px] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Block User</DialogTitle>
            <DialogDescription>
              Are you sure you want to block this user? They won't be able to
              contact you again.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              onClick={() => setBlockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => setBlockDialogOpen(false)}
              style={{ backgroundColor: "#C13D88" }}
            >
              Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="rounded-lg max-w-[300px] sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report User</DialogTitle>
            <DialogDescription>
              Please provide a reason for reporting this user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Enter your reason here..."
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="min-h-[100px] max-h-[200px]"
          />
          <DialogFooter>
            <Button
              className="mt-2 sm:mt-0"
              variant="outline"
              onClick={() => setReportDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Handle report submission
                setReportDialogOpen(false);
                setReportReason("");
              }}
              style={{ backgroundColor: "#C13D88" }}
            >
              Submit Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
