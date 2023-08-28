
export default function  fetchData(url) {
  const promise = fetch(url)
    .then(response => response.json())
    .then(data => data);

    return promise;
}
