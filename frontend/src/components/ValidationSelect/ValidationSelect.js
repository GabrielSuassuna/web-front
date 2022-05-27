import styles from "./ValidationSelect.module.css";

/**
 * Componente que representa um campo de input que pode ser validado.
 *
 * props:
 *  * name (String): Nome do select
 *  * label (String): Texto que indica sobre o que é o campo
 *  * hint (String): Dica que aparece quando o campo está vazio
 *  * value (Object): Estado do React que armazena o valor selecionado
 *  * valueHandler (Function): Função para modificar o estado do valor selecionado
 *  * options (Array): Lista de opções onde cada elemento é do formato Object { value: Object, label: String }
 */
function ValidationSelect(props) {
  return (
    <div>
      <label htmlFor="validationSelect">{props.label}:</label>
      <select
        className={styles.validationSelect}
        name={props.name}
        id="validationSelect"
        ref={props.selectRef}
        onChange={(e) => props.valueHandler(e.target.value)}
      >
        {props.options.map((o) => (
          <option key={`${o.value}_${o.label}`} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ValidationSelect;
