"use client";

import { GlobeAltIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { DialogContent, DialogTitle, Drawer, List, ListItem, ListItemButton, ListItemDecorator, ModalClose } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoImage } from "@/assets";
import { SearchEverywhere } from "@/components/generic";
import { NotificationsWrapper, useJwtTokenContext } from "@/context";

import { AuthedUserDrawer } from "./AuthedUserDrawer";
import { HamburgerMenuButton } from "./HamburgerMenuButton";

export const HeaderAndDrawer = (): JSX.Element => {
  const pathname = usePathname();
  const { isAuthed } = useJwtTokenContext();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleHamburgerToggle = (): void => {
    setMenuOpen(o => !o);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <Drawer
        size="sm"
        anchor="left"
        open={menuOpen}
        onClose={handleHamburgerToggle}
        slotProps={{
          content: {
            sx: {
              minWidth: "max-content",
            },
          },
        }}
      >
        <DialogTitle level="h2" sx={{ paddingX: 2 }}>
          Menu
        </DialogTitle>
        <ModalClose size="lg" />
        <DialogContent>
          <List sx={{ paddingX: 2, minWidth: "max-content" }}>
            <ListItem>
              <div className="fric space-x-4">
                <ListItemDecorator><MagnifyingGlassIcon className="size-6" /></ListItemDecorator>
                <SearchEverywhere />
              </div>
            </ListItem>
            <ListItem>
              <Link href="/" className="w-full">
                <ListItemButton className="fric space-x-2">
                  <ListItemDecorator><HomeIcon className="size-6" /></ListItemDecorator>
                  <span>All selfies</span>
                </ListItemButton>
              </Link>
            </ListItem>
            {
              isAuthed &&
              <>
                <ListItem>
                  <Link href="/discover" className="w-full">
                    <ListItemButton className="fric space-x-2">
                      <ListItemDecorator><GlobeAltIcon className="size-6" /></ListItemDecorator>
                      <span>Discover</span>
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/loves" className="w-full">
                    <ListItemButton className="fric space-x-2">
                      <ListItemDecorator><HeartIcon className="size-6" /></ListItemDecorator>
                      <span>Loved by you</span>
                    </ListItemButton>
                  </Link>
                </ListItem>
              </>
            }
            <ListItem>
              <Link href="/users" className="w-full">
                <ListItemButton className="fric space-x-2">
                  <ListItemDecorator><UserGroupIcon className="size-6" /></ListItemDecorator>
                  <span>Users</span>
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </DialogContent>
      </Drawer>
      <nav className="fric justify-between pl-3 lg:pl-12 pr-2 py-2 fixed top-0 left-0 w-screen h-[var(--header-height)] z-[1]">
        <div className="fric space-x-3 lg:space-x-8">
          <HamburgerMenuButton open={menuOpen} onClick={handleHamburgerToggle} />
          <Link href={isAuthed ? "/dashboard" : "/"}>
            <Image src={logoImage} width={50} height={50} alt="Logo" priority />
          </Link>
        </div>
        <div className="fric space-x-4 -z-[1]">
          <NotificationsWrapper>
            <AuthedUserDrawer />
          </NotificationsWrapper>
        </div>
      </nav>
    </>
  );
};
