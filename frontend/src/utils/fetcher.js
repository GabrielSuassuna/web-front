const fetcher = url => fetch(url).then(res => res.json()).then(res => res);

export default fetcher;