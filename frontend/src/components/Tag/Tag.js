/**
 * Componente que representa uma pergunta frequente. Pode ou não estar expandida
 *
 * props:
 *  * id (String): Identificador universal da Tag
 *  * title (String): Título da Tag
 *  * onRemove (Function): Opcional. Idica que essa tag representa um resultado de input e pode ser removida.
 */
function Tag(props) {
  return (
    <div className="bg-green-200 text-green-700 p-1 rounded mb-4">
      <h4>
        {props.title}{" "}
        {props.onRemove && <button onClick={props.onRemove}>x</button>}
      </h4>
    </div>
  );
}

export default Tag;
