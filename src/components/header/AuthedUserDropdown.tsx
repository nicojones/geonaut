import { AdjustmentsHorizontalIcon, ArrowLeftStartOnRectangleIcon, BellIcon, CameraIcon, RectangleGroupIcon, UserCircleIcon, UserIcon } from "@heroicons/react/16/solid";
import { Avatar, Button, DialogContent, DialogTitle, Divider, Drawer, List, ListItem, ListItemButton, ListItemDecorator, Typography } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { NotificationsDrawer } from "@/components/generic";
import { useJwtTokenContext } from "@/context";

export const AuthedUserDropdown = (): JSX.Element => {
  const pathname = usePathname();
  const { isAuthed, user } = useJwtTokenContext();
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  const handleTogglePanel = (): void => {
    setPanelOpen(p => !p);
  };

  useEffect(() => {
    setPanelOpen(false);
  }, [pathname]);

  const avatar = useMemo(
    () =>
      user
        ? (
          <Avatar
            size="lg"
            src={(process.env.NEXT_PUBLIC_RESOURCE_URL as string) + user.avatar}
            onClick={handleTogglePanel}
            className="ml-auto cursor-pointer"
          />
        )
        : null,
    [user],
  );

  return (
    isAuthed
      ? (
        <>
          <Drawer
            anchor="right"
            open={panelOpen}
            onClose={handleTogglePanel}
            size="sm"
            slotProps={{
              content: {
                sx: {
                  minWidth: "max-content",
                },
              },
            }}
          >
            <DialogTitle
              className="fric justify-between"
              sx={{ paddingLeft: 2 }}
            >
              <div className="flex flex-col">
                <Typography level="h3">{user.name}</Typography>
                <Link href={`/u/${user.username}`}>
                  @{user.username}
                </Link>
              </div>
              {avatar}
            </DialogTitle>
            <DialogContent sx={{ paddingLeft: 2 }}>
              <Divider />
              <List>
                {
                  user.bell_position === "menu" &&
                  <>
                    <NotificationsDrawer>
                      {(toggle) =>
                        <ListItem>
                          <ListItemButton className="fric" onClick={toggle}>
                            <ListItemDecorator>
                              <BellIcon className="size-5" />
                            </ListItemDecorator>
                            <span>notifications</span>
                          </ListItemButton>
                        </ListItem>}
                    </NotificationsDrawer>
                  </>
                }
                <Link href="/dashboard">
                  <ListItem>
                    <ListItemButton className="fric">
                      <ListItemDecorator>
                        <RectangleGroupIcon className="size-5" />
                      </ListItemDecorator>
                      <span>dashboard</span>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link href="/new">
                  <ListItem>
                    <ListItemButton className="fric">
                      <ListItemDecorator>
                        <CameraIcon className="size-5" />
                      </ListItemDecorator>
                      <span>upload</span>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link href="/dashboard/profile">
                  <ListItem>
                    <ListItemButton className="fric">
                      <ListItemDecorator>
                        <UserIcon className="size-5" />
                      </ListItemDecorator>
                      <span>profile</span>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link href="/dashboard/settings">
                  <ListItem>
                    <ListItemButton className="fric">
                      <ListItemDecorator>
                        <AdjustmentsHorizontalIcon className="size-5" />
                      </ListItemDecorator>
                      <span>settings</span>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Link href="/auth/logout" className="mt-auto">
                  <ListItem>
                    <ListItemButton className="fric">
                      <ListItemDecorator>
                        <ArrowLeftStartOnRectangleIcon className="size-5" />
                      </ListItemDecorator>
                      <span>log out</span>
                    </ListItemButton>
                  </ListItem>
                </Link>
              </List>
            </DialogContent>
          </Drawer>
          <div className="mt-2 mr-1 fric space-x-4">
            {
              user.bell_position === "top" &&
              <NotificationsDrawer>
                {
                  (toggle) =>
                    <Button variant="plain" onClick={toggle} className="text-black"><BellIcon className="size-6" /></Button>
                }
              </NotificationsDrawer>
            }
            {avatar}
          </div>
        </>
      )
      : (
        <>
          <Link href="/auth/sign-in" className="p-4 group">
            <UserCircleIcon className="size-8 opacity-60 group-hover:opacity-100 transition-opacity" />
          </Link>
          {/* <Link href="/auth/sign-up">
              <Button variant="soft">sign up</Button>
            </Link> */}
        </>
      )
  );
};
