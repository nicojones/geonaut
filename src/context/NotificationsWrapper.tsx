"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { raiseOnError } from "@/functions";
import { ComponentChildren, INotification, INotificationResponse, INotificationsContext } from "@/types";

import { useJwtTokenContext } from "./jwt-token.context";
import { NotificationsContext } from "./notifications.context";

interface NotificationsWrapperProps {
  children: ComponentChildren;
}

export const NotificationsWrapper = ({ children }: NotificationsWrapperProps): JSX.Element => {
  const { api, jwt } = useJwtTokenContext();
  const [limit, setLimit] = useState<number>(10);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unread, setUnread] = useState<number | undefined>(0);

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

  const fetchNotifications = (signal?: AbortSignal): void => {
    api<INotificationResponse, any>({
      url: `/api/notifications?limit=${limit}`,
      signal,
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
    if (!jwt) {
      return;
    }
    const abort = new AbortController();
    const notificationsTimeout = setTimeout(() => fetchNotifications(abort.signal), 1000);
    const notificationsInterval = setInterval(() => fetchNotifications(abort.signal), 20_000);

    return () => {
      abort.abort();
      clearTimeout(notificationsTimeout);
      clearInterval(notificationsInterval);
    };
  }, [jwt, limit]);

  return (
    <NotificationsContext.Provider value={context} >
      {children}
    </NotificationsContext.Provider>
  );
};
