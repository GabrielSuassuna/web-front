import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "../../components/IconButton/IconButton";
import ValidationInput from "../../components/ValidationInput/ValidationInput";
import ValidationSelect from "../../components/ValidationSelect/ValidationSelect";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { apiRequest, checkForErrors } from "../../utils/apiReq";
import { validationStringChecker } from "../../utils/validation";
import url from "../../config/api";
import { getAuthToken } from "../../utils/auth";

function DisciplineEditPage() {
  const navigate = useNavigate();

  const [selectedDiscipline, setSelectedDiscipline] = useState('');
  const disciplineCodeRef = useRef(null);
  const disciplineNameRef = useRef(null);
  const disciplineDescriptionRef = useRef(null);
  const disciplineHoursRef = useRef(null);

  let [discOptions, setDiscOptionsLoaded] = useState([]);
  let [discOptionsLoaded, setDiscOptionsLoadedLoaded] = useState(false);

  const { data: disciplines, error: disciplinesError } = useSWR(
    `${url}/discipline/`,
    fetcher
  );
  checkForErrors([disciplinesError]);

  useEffect(() => {
    if (!disciplines || !disciplines.data || discOptionsLoaded) {
      return;
    }

    let optionsRawData = disciplines.data.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });

    setDiscOptionsLoaded([
      {
        value: null,
        label: "Selecione uma disciplina",
      },
      ...optionsRawData,
    ]);
    setDiscOptionsLoadedLoaded(true);
  }, [discOptions, disciplines, discOptionsLoaded, navigate]);

  const selectDisciplineHandler = (newDiscipline) => {
    apiRequest(
      "GET",
      `${url}/discipline/${newDiscipline}`,
      null,
      (res) => {
        let discData = res.data[0];
        disciplineCodeRef.current.value = discData.code;
        disciplineNameRef.current.value = discData.name;
        disciplineDescriptionRef.current.value = discData.description;
        disciplineHoursRef.current.value = discData.hours;
        setSelectedDiscipline(`${discData.id}`);
      },
      (res) => {
        console.log(res);
      }
    );
    if (!selectedDiscipline)
      setDiscOptionsLoaded([
        {
          value: null,
          label: "Selecione uma disciplina",
          disabled: true,
        },
        ...discOptions.slice(1),
      ]);
    setSelectedDiscipline(newDiscipline);
  };

  const editDiscipline = async () => {
    if (
      !validationStringChecker(disciplineCodeRef).isValid ||
      !validationStringChecker(disciplineNameRef).isValid ||
      !validationStringChecker(disciplineDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      code: disciplineCodeRef.current.value,
      name: disciplineNameRef.current.value,
      description: disciplineDescriptionRef.current.value,
      hours: disciplineHoursRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/discipline/${selectedDiscipline}`,
      requestData,
      (res) => {
        alert("Edição de disciplina realizada!");
        console.log(res);
        navigate("/");
      },
      (res) => {
        alert(res.message);
        console.log(res.message);
        console.log(res.errorStack);
      },
      token
    );
  };

  return (
    <div className="mt-6 ml-6">
      <h1 className="text-4xl font-bold mb-6">Edição de Disciplina</h1>

      <div className="flex flex-col w-6/12">
        <ValidationSelect
          name="disc"
          label="Disciplina"
          hint="Selecione uma disciplina para editar"
          value={selectedDiscipline}
          valueHandler={selectDisciplineHandler}
          options={discOptions}
        />

        {selectedDiscipline && (
          <>
            <ValidationInput
              label="Código"
              hint="ex: CC0101"
              type="text"
              name="code"
              inputRef={disciplineCodeRef}
              validation={validationStringChecker}
            />
            <ValidationInput
              label="Nome"
              hint="ex: Algoritmos Aproximativos"
              type="text"
              name="name"
              inputRef={disciplineNameRef}
              validation={validationStringChecker}
            />
            <div className="w-full mt-2">
              <ValidationInput
                label="Descrição"
                hint="ex: A disciplina tem foco em..."
                type="text"
                name="description"
                inputRef={disciplineDescriptionRef}
                validation={validationStringChecker}
                inputClasses={[]}
                isTextArea
              />
            </div>
            <ValidationInput
              label="Carga Horária"
              hint="ex: 96"
              type="number"
              min={0}
              name="hours"
              inputRef={disciplineHoursRef}
            />
            <IconButton
              classes={[
                "w-full",
                "bg-green-700",
                "text-white",
                "py-2",
                "text-xs",
                "rounded",
                "mt-2",
              ]}
              content="Editar Disciplina"
              onClick={editDiscipline}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default DisciplineEditPage;
