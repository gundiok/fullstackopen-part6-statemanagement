import { useAnecdoteNotification } from "../store";

const Notification = () => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  };

  const notificationMessage = useAnecdoteNotification();

  if (!notificationMessage) return null;
  return (
    <div style={style} data-testid="notification">
      {notificationMessage}
    </div>
  );
};

export default Notification;
