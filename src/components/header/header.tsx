"use client";

import { GlobeAltIcon, HeartIcon, HomeIcon, MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/16/solid";
import { DialogContent, DialogTitle, Drawer, Input, List, ListItem, ListItemButton, ListItemDecorator, ModalClose } from "@mui/joy";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoImage } from "@/assets";
import { useJwtTokenContext } from "@/context";

import { AuthedUserDropdown } from "./authed-user-dropdown";
import { HamburgerMenuButton } from "./hamburger";

export const Header = (): JSX.Element => {
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
        anchor="left"
        size="md"
        open={menuOpen}
        onClose={handleHamburgerToggle}
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
        {/* <Sheet
          sx={{
            borderRadius: "md",
            p: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            height: "100%",
            overflow: "auto",
          }}
        > */}
        <DialogTitle level="h2">
          Menu
        </DialogTitle>
        <ModalClose size="lg" sx={{ marginRight: "auto" }} />
        <DialogContent>
          <List className="pl-2">
            <ListItem>
              <div className="fric space-x-4">
                <ListItemDecorator><MagnifyingGlassIcon className="size-6" /></ListItemDecorator>
                <Input placeholder="search everywhere" />
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
        {/* </Sheet> */}
      </Drawer>
      <nav className="fric justify-between pl-12 pr-2 py-2 fixed top-0 left-0 w-screen h-[var(--header-height)] z-[1]">
        <div className="fric space-x-8">
          <HamburgerMenuButton open={menuOpen} onClick={handleHamburgerToggle} />
          <Link href="/">
            <Image src={logoImage} width={50} height={50} alt="Logo" priority />
          </Link>
        </div>
        <div className="fric space-x-4 -z-[1]">
          <AuthedUserDropdown />
        </div>
      </nav>
    </>
  );
};
