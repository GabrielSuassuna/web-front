import useQuery from "../../hooks/useQuery";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import url from "../../config/api";

import { checkForErrors } from "../../utils/apiReq";

function DepartmentDescriptionPage() {
  let query = useQuery();

  const { data: department, error: departmentError } = useSWR(
    `${url}/department/${query.get("id")}`,
    fetcher
  );

  checkForErrors([departmentError]);

  return (
    <div>
      <h1>{`${url}/department/${query.get("id")}`}</h1>
      <h1>DepartmentDescriptionPage</h1>
      <p>{JSON.stringify(department)}</p>
    </div>
  );
}

export default DepartmentDescriptionPage;
