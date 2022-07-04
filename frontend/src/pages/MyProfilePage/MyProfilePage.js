import Notification from "../../components/Notification/Notification";
import useSWR from "swr";
import { auth_fetcher } from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import url from "../../config/api";
import { getAuthData } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { AUTH_LEVELS } from "../../utils/consts";
import { useEffect, useState } from "react";

function MyProfilePage() {
  let navigate = useNavigate();

  const [notificationsFront, setNotificationsFront] = useState(null);

  const { id: userId, userType, token } = getAuthData(navigate);

  const { data: profile, error: profileError } = useSWR(
    `${url}/${
      userType === AUTH_LEVELS.STUDENT ? "student" : "professor"
    }/${userId}`,
    auth_fetcher(token)
  );

  const { data: notifications, error: notificationsError } = useSWR(
    `${url}/notification/${
      userType === AUTH_LEVELS.STUDENT ? "student" : "professor"
    }/${userId}`,
    auth_fetcher(token)
  );

  checkForErrors([profileError]);

  useEffect(() => {
    if (!notificationsFront && notifications)
      setNotificationsFront(notifications.data);
  }, [notifications, notificationsFront]);

  const removeNotificationHandler = (id) => {
    setNotificationsFront(notificationsFront.filter( n => n.id !== id ))
    apiRequest(
      "DELETE",
      `${url}/notification/${
        userType === AUTH_LEVELS.STUDENT ? "student" : "professor"
      }/${id}`,
      {},
      (res) => {
        console.log(res);
      },
      (res) => {
        console.log(res);
      },
      token
    );
  };

  if (!profile) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Meu Perfil</h1>
      <h2>Bem vindo {profile.data[0].name}</h2>
      {notificationsFront &&
        notificationsFront.map((n) => (
          <Notification
            key={n.id}
            description={n.message}
            onClose={() => removeNotificationHandler(n.id)}
          />
        ))}
    </div>
  );
}

export default MyProfilePage;
