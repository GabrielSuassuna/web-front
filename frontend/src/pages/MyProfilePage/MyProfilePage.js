import Notification from "../../components/Notification/Notification";

function MyProfilePage() {

  const removeNotificationHandler = () => {
    alert("Notificação removida!");
  }

  return (
    <div>
      <h1>MyProfilePage</h1>
      <Notification description="Um dos deus feedbacks foi considerado impróprio e foi removido." onClose={removeNotificationHandler}/>
      <Notification description="Você ganhou uma estrela!" onClose={removeNotificationHandler} link="/faq"/>
    </div>
  );
}

export default MyProfilePage;
 