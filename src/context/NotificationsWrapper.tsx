"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { raiseOnError } from "@/functions";
import { ComponentChildren, INotification, INotificationResponse, INotificationsContext } from "@/types";

import { useJwtTokenContext } from "./jwt-token.context";
import { NotificationsContext } from "./notifications.context";

interface NotificationsWrapperProps {
  children: ComponentChildren;
}

export const NotificationsWrapper = ({ children }: NotificationsWrapperProps): JSX.Element => {
  const { api, isAuthed } = useJwtTokenContext();
  const [limit, setLimit] = useState<number>(10);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unread, setUnread] = useState<number | undefined>(0);
  const refetchNotificationsRef = useRef<any>(null);

  const handleSetRead = (id: number): void => {
    setNotifications(_ns => [
      ..._ns.map(_n => ({
        ..._n,
        seen: _n.id === id ? (new Date()).toISOString() : _n.seen,
      })),
    ]);
    setUnread(u => Math.max(0, (u ?? 0) - 1));
    markNotification(id, true);
  };

  const handleSetUnread = (id: number): void => {
    setNotifications(_ns => [
      ..._ns.map(_n => ({
        ..._n,
        seen: _n.id === id ? null : _n.seen,
      })),
    ]);
    setUnread(u => (u ?? 0) + 1);
    markNotification(id, false);
  };

  const markNotification = (id: number, seen: boolean): void => {
    api<{ unread: number; }, any>({
      url: "/api/notifications/mark",
      body: { unread: Number(!seen), id },
    })
      .then(raiseOnError)
      .then(r => {
        setUnread(r.unread);
        fetchNotifications();
      })
      .catch(e => {
        console.error(e);
        toast.error(String(e));
      });
  };

  const fetchNotifications = (): void => {
    api<INotificationResponse, any>({
      url: `/api/notifications?limit=${limit}`,
    })
      .then(raiseOnError)
      .then(response => {
        setNotifications(response.notifications);
        setUnread(response.unread);
      });
  };

  const context: INotificationsContext = useMemo(
    () => ({
      notifications,
      markAsUnead: handleSetUnread,
      markAsRead: handleSetRead,
      unread,
      loadMore: () => setLimit(l => l + 10),
      _insideContext_: true,
    }),
    [notifications, unread],
  );

  useEffect(() => {
    if (!isAuthed) {
      return;
    }
    fetchNotifications();
    refetchNotificationsRef.current = setInterval(fetchNotifications, 20_000);

    return () => clearInterval(refetchNotificationsRef.current);
  }, [isAuthed, limit]);

  return (
    <NotificationsContext.Provider value={context} >
      {children}
    </NotificationsContext.Provider>
  );
};
