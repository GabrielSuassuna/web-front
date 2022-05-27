import styles from "./RadioInput.module.css";

/**
 * Componente que representa um campo de input que pode ser validado.
 *
 * props:
 *  * label (String): Texto que indica sobre o que é o input radio
 *  * name (String): Nome do input
 *  * options (Array): Opções do input. Formato: [ {id: String, value: Object, label: String} ]
 *  * selected (Object): Estado do react que armazena a opção selecionada
 *  * setSelected (Function): Função que modifica a opção selecionada
 */
function RadioInput(props) {
  return (
    <div>
      <h1>{props.label}</h1>
      {props.options.map((o) => (
        <div key={o.id}>
          <input
            className={styles.validationInput}
            type="radio"
            id={o.id}
            name={props.name}
            checked={props.selected === o.value}
            onChange={() => props.setSelected(o.value)}
          />
          <label htmlFor={o.id}>{o.label}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioInput;
