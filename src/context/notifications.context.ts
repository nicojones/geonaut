"use client";

import { createContext, useContext } from "react";

import { INotificationsContext } from "@/types";

export const NotificationsContext = createContext<INotificationsContext>({
  notifications: [],
  markAsRead: () => null,
  markAsUnead: () => null,

  loadMore: () => null,
  unread: undefined,

  _insideContext_: false,
});

export const useNotificationsContext = (): INotificationsContext => {
  const context = useContext<INotificationsContext>(NotificationsContext);

  if (!context._insideContext_) {
    throw new Error("`useNotificationsContext` must be used inside of `NotificationsContext`.");
  }

  return context;
};
