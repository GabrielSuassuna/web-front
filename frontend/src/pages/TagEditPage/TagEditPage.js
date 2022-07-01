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

function TagEditPage() {
  const navigate = useNavigate();

  const [selectedTag, setSelectedTag] = useState('');
  const tagNameRef = useRef(null);
  const tagDescriptionRef = useRef(null);

  let [tagOptions, setTagOptions] = useState([]);
  let [tagOptionsLoaded, setTagOptionsLoaded] = useState(false);

  const { data: tags, error: tagsError } = useSWR(
    `${url}/tag/`,
    fetcher
  );
  checkForErrors([tagsError]);

  useEffect(() => {
    if (!tags || !tags.data || tagOptionsLoaded) {
      return;
    }

    let optionsRawData = tags.data.map((f) => {
      return {
        value: f.id,
        label: f.name,
      };
    });

    setTagOptions([
      {
        value: null,
        label: "Selecione uma tag",
      },
      ...optionsRawData,
    ]);
    setTagOptionsLoaded(true);
  }, [tagOptions, tags, tagOptionsLoaded, navigate]);

  const selectTagHandler = (newTag) => {
    apiRequest(
      "GET",
      `${url}/tag/${newTag}`,
      null,
      (res) => {
        let tagData = res.data[0];
        tagNameRef.current.value = tagData.name;
        tagDescriptionRef.current.value = tagData.description;
        setSelectedTag(`${tagData.id}`);
      },
      (res) => {
        console.log(res);
      }
    );
    if (!selectedTag)
      setTagOptions([
        {
          value: null,
          label: "Selecione uma tag",
          disabled: true,
        },
        ...tagOptions.slice(1),
      ]);
    setSelectedTag(newTag);
  };

  const editTag = async () => {
    if (
      !validationStringChecker(tagNameRef).isValid ||
      !validationStringChecker(tagDescriptionRef).isValid
    )
      return alert("Dados inválidos!");

    let requestData = {
      name: tagNameRef.current.value,
      description: tagDescriptionRef.current.value,
    };

    let token = getAuthToken(navigate);

    if (!token) return;

    apiRequest(
      "PUT",
      `${url}/tag/${selectedTag}`,
      requestData,
      (res) => {
        alert("Edição de tag realizada!");
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
      <h1 className="text-4xl font-bold mb-6">Edição de Tag</h1>

      <div className="flex flex-col w-6/12">
        <ValidationSelect
          name="disc"
          label="Tag"
          hint="Selecione uma tag para editar"
          value={selectedTag}
          valueHandler={selectTagHandler}
          options={tagOptions}
        />

        {selectedTag && (
          <>
            <ValidationInput
              label="Nome"
              hint="ex: Visão de Mercado"
              type="text"
              name="name"
              inputRef={tagNameRef}
              validation={validationStringChecker}
            />
            <div className="w-full mt-2">
              <ValidationInput
                label="Descrição"
                hint="ex: O professor apresenta aspectos na aula..."
                type="text"
                name="description"
                inputRef={tagDescriptionRef}
                validation={validationStringChecker}
                inputClasses={[]}
                isTextArea
              />
            </div>
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
              content="Editar Tag"
              onClick={editTag}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TagEditPage;
