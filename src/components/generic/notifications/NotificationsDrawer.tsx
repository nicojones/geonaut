"use client";

import { Button, DialogContent, DialogTitle, Drawer, ModalClose, Sheet } from "@mui/joy";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useNotificationsContext } from "@/context";
import { ComponentChildren } from "@/types";

import { NotificationItem } from "./NotificationItem";

interface NotificationsDrawerProps {
  children: (onToggle: (() => any)) => ComponentChildren;
}

export const NotificationsDrawer = ({ children }: NotificationsDrawerProps): JSX.Element => {
  const { notifications, loadMore } = useNotificationsContext();
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
          <DialogContent>
            <div className="flex flex-col space-y-4">
              {
                notifications.map(n =>
                  <NotificationItem
                    key={n.id}
                    notification={n}
                  />,
                )
              }
            </div>
            {
              notifications.length > 0 &&
              <Button
                variant="plain"
                size="sm"
                color="neutral"
                onClick={loadMore}
                className="mt-4"
              >load older notifications
              </Button>
            }
          </DialogContent>
        </Sheet>
      </Drawer>
      {children(handleNotificationToggle)}
    </>
  );
};
