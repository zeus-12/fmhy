import MarkdownRenderer from "@/components/markdown-renderer";
import { Alert } from "@mantine/core";
import { AlertCircle, Siren } from "lucide-react";
import { ReactNode } from "react";

export const NoteAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <AlertComponent
      title="Note"
      color="cyan"
      message={message}
      icon={<AlertCircle size="1rem" />}
    />
  );
};

export const AlertComponent: React.FC<{
  message: string;
  title: string;
  color: string;
  icon: ReactNode;
}> = ({ title, color, message, icon }) => {
  return (
    <Alert
      classNames={{
        label: "text-xl",
        title: "m-0",
        wrapper: "flex items-center",
      }}
      className="my-2"
      icon={icon}
      radius="md"
      title={title}
      color={color}
    >
      <MarkdownRenderer>{message}</MarkdownRenderer>
    </Alert>
  );
};

export const WarningAlert: React.FC<{ message: string }> = ({ message }) => {
  return (
    <AlertComponent
      title="Warning"
      color="red"
      message={message}
      icon={<Siren size="1rem" className="fill-red-400" />}
    />
  );
};
