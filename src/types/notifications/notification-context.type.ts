
import { IContext, INotification } from "@/types";

export interface INotificationsContext extends IContext {
  notifications: INotification[];
  markAsRead: (id: number) => any;
  markAsUnead: (id: number) => any;

  loadMore: () => any;
  /**
   * Fetch the notifications again (e.g. after answering a tag request)
   */
  refresh: () => any;

  unread: number | undefined;
}
