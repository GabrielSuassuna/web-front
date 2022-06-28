const apiRequest = async (method, url, requestData, okCallback, errorCallback, authToken) => {
  let headers = {
    'Content-Type': 'application/json',
  };
  if(authToken){
    headers['Authorization'] = `Bearer ${authToken}`
  }
  
  const response = await fetch(url, {
      method: method, 
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: headers,
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(requestData) 
    });
    
    const res_data = await response.json();

    if(response.ok){
      okCallback(res_data)
    }
    else{
      errorCallback(res_data)
    }
}

const checkForErrors = (errors) => {
  for(let e of errors){
    if(e)
      console.log(`[ERROR]:${e}`)
  }
}

export { apiRequest, checkForErrors };