import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../utilities/socket.config.js";

const WaiterNotifications = () => {
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit("waiter_connected", id);

    // `get_notification` hodisasini faqat bir marta qo'shish
    const handleNotification = (notification) => {
      console.log("Yangi bildirishnoma:", notification);
      setNotifications((prev) => [...prev, notification]);
    };

    socket.on("get_notification", handleNotification);

    // Komponent to'xtatilganda socketni uzish va hodisani olib tashlash
    return () => {
      socket.off("get_notification", handleNotification);
      // socket.disconnect();
    };
  }, [id]);

  return (
    <div>
      <h1>Bildirishnomalar</h1>
      {notifications.length === 0 ? (
        <p>Bildirishnoma yo'q</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <strong>Stol:</strong> {notification.table.number} <br />
              {notification.meals.map((item, i) => (
                <strong key={i}>{item.foodName} ,</strong>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WaiterNotifications;
