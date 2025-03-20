import { Item } from ".";

const hostname = "localhost";
const port = ":5500";

async function getList() {
  const url = `${hostname}${port}/getItems`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  const json = await res.json();
  return json;
}

async function deleteList(id: string) {
  const url = `${hostname}${port}/deleteItem/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.ok;
}

async function updateList(item: Item) {
  //simulating the id from server is given
  const { id } = item as any;

  const url = `${hostname}${port}/updateItem/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(item),
  });

  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.ok;
}

async function postList(item: Item) {
  const url = `${hostname}${port}/postItem`;
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    throw new Error(`${res.status}`);
  }

  return res.ok;
}

export { getList, postList, deleteList, updateList };
