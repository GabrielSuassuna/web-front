import Tag from "../../components/Tag/Tag";

function FeedbackCreationPage() {

  const removeTagHandler = (tagId) => {
    alert(`Removendo tag de id ${tagId}`)
  } 

  return (
    <div>
      <h1>FeedbackCreationPage</h1>
      <h2>Tags:</h2>
      <Tag id='ID_tag_aulasObjetivas' title='Aulas Objetivas' onRemove={() => removeTagHandler('ID_tag_aulasObjetivas')}/>
      <Tag id='ID_tag_visaoEstrategica' title='Visao Estratégica' onRemove={() => removeTagHandler('ID_tag_visaoEstrategica')}/>
    </div>
  );
}

export default FeedbackCreationPage;
 