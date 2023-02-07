import { Fragment, useContext } from "react";
import Notification from "../ui/notification";
import NotificationContext from "../../store/notification-context";
import MainHeader from "./main-header";

function Layout(props) {
  const context = useContext(NotificationContext);

  const activeNotification = context.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
