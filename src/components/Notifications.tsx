import { showNotification } from "@mantine/notifications";
import { CheckCircle, XCircle } from "lucide-react";

export const errorNotificationProps = {
  icon: <XCircle size={18} />,
  color: "red",
};

export const notSignedInNotification = (message: string) => {
  showNotification({
    title: "Please Sign In",
    message,
    ...errorNotificationProps,
  });
};

export const errorNotification = (message: string) => {
  showNotification({
    title: "Error",
    message,
    ...errorNotificationProps,
  });
};

export const successNotification = (message: string) => {
  showNotification({
    title: "Success",
    message,
    color: "green",
    icon: <CheckCircle size={18} />,
  });
};
