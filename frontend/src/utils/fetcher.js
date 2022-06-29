const fetcher = url => fetch(url).then(res => res.json()).then(res => res);

const auth_fetcher = (token) => {
  let req = {
    method: 'get',
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow",
    referrerPolicy: "no-referrer",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Authorization": `Bearer ${token}`
    },
  }
  return url => fetch(url, req).then(res => res.json()).then(res => res);
}

export default fetcher;

export {fetcher, auth_fetcher};