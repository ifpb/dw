const domain = "";

async function create(resource, data) {
  return makeRequest(`${domain}/${resource}`, {
    method: "post",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

async function read(resource) {
  return makeRequest(`${domain}/${resource}`);
}

async function makeRequest(resource, data) {
  const res = await fetch(resource, data);

  const content = await res.json();

  if (content.error) {
    throw new Error(content.error);
  }

  return content;
}

export default { create, read };
