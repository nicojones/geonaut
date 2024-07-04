"use client";

import { DialogActions, DialogContent, DialogTitle, Divider, Modal, ModalDialog } from "@mui/joy";
import { useState } from "react";

import { ComponentChildren } from "@/types";

interface AlertDialogModalProps {
  children: (open: () => any) => any;
  content: ComponentChildren;
  title?: ComponentChildren;
  primaryButton: (close: () => any) => JSX.Element;
  secondaryButton?: (close: () => any) => JSX.Element;
}

export const AlertDialogModal = ({
  children,
  title,
  content,
  primaryButton,
  secondaryButton,
}: AlertDialogModalProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {children(() => setOpen(true))}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          {
            title &&
            <DialogTitle>
              {title}
            </DialogTitle>
          }
          <Divider />
          <DialogContent>
            {content}
          </DialogContent>
          <DialogActions>
            {primaryButton(() => setOpen(false))}
            {secondaryButton?.(() => setOpen(false))}
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};
