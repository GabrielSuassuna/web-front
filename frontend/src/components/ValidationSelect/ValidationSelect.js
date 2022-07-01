import styles from "./ValidationSelect.module.css";

/**
 * Componente que representa um campo de select.
 *
 * props:
 *  * name (String): Nome do select
 *  * label (String): Texto que indica sobre o que é o campo
 *  * hint (String): Dica que aparece quando o campo está vazio
 *  * disabled (Boolean): Indica se o seletor está desabilidado.
 *  * value (Object): Estado do React que armazena o valor selecionado
 *  * valueHandler (Function): Função para modificar o estado do valor selecionado
 *  * options (Array): Lista de opções onde cada elemento é do formato Object { value: Object, label: String, disabled: Boolean }
 */
function ValidationSelect(props) {
  return (
    <div className="flex flex-col">
      <label
        className="font-bold text-blue-700 mb-2"
        htmlFor="validationSelect"
      >
        {props.label}:
      </label>
      <select
        className={"rounded border w-full border-gray-400 px-2 py-1 my-1"}
        name={props.name}
        id="validationSelect"
        ref={props.selectRef}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => props.valueHandler(e.target.value)}
      >
        {props.options.map((o) => (
          <option
            key={`${o.value}_${o.label}`}
            value={o.value}
            disabled={!!o.disabled}
          >
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ValidationSelect;
