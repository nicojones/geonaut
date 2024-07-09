
import { IContext, INotification } from "@/types";

export interface INotificationsContext extends IContext {
  notifications: INotification[];
  markAsRead: (id: number) => any;
  markAsUnead: (id: number) => any;

  loadMore: () => any;

  unread: number | undefined;
}
