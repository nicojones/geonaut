"use client";

import { DialogContent, DialogTitle, Drawer, ModalClose, Sheet } from "@mui/joy";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ComponentChildren } from "@/types";

interface NotificationsDrawerProps {
  children: (onToggle: (() => any)) => ComponentChildren;
}

export const NotificationsDrawer = ({ children }: NotificationsDrawerProps): JSX.Element => {
  const pathname = usePathname();
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);

  const handleNotificationToggle = (): void => {
    setNotificationsOpen(o => !o);
  };

  useEffect(() => {
    setNotificationsOpen(false);
  }, [pathname]);

  return (
    <>
      <Drawer
        anchor="right"
        size="lg"
        open={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        slotProps={{
          content: {
            // sx: {
            //   bgcolor: "transparent",
            //   p: { md: 3, sm: 0 },
            //   boxShadow: "none",
            // },
          },
        }}
      >
        <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <DialogTitle level="h2">
            Notifications
          </DialogTitle>
          <ModalClose size="lg" sx={{ marginRight: "auto" }} />
          <DialogContent >
            Coming soon!
          </DialogContent>
        </Sheet>
      </Drawer>
      {children(handleNotificationToggle)}
    </>
  );
};
