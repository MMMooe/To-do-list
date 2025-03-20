import styled from "styled-components";
import { Item } from ".";
import { Dispatch, useEffect, useState } from "react";
import { filterVisible } from "./utils";
import { deleteList, updateList } from "./services";

const ListContainer = styled.div`
  padding: 1em 2em;
  display: flex;
  flex-direction: column;
  gap: 2em;
  position: relative;
  width: 100%;
`;
const DisplayItem = styled.div`
  display: flex;
  width: 100%;
  .text {
    flex: 2;

    display: flex;

    .completeCircle {
      display: inline-block;
      background-color: forestgreen;
      border-radius: 50%;
      height: 1em;
      width: 1em;
      margin-right: 1em;
    }
    .uncompleteCircle {
      display: inline-block;
      background-color: red;
      border-radius: 50%;
      height: 1em;
      width: 1em;
      margin-right: 1em;
    }

    div {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }

  .buttons {
    flex: 1;
    display: flex;
    gap: 1em;

    button {
      width: 8em;
      height: 4em;
    }
  }
`;
const EditingItem = styled.div`
  form {
    display: flex;

    .text {
      flex: 2;

      display: flex;

      div {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 1em;

        input {
          max-width: 20em;
        }

        textarea {
          max-width: 20em;
          min-height: 6em;
        }
      }
    }

    .buttons {
      flex: 1;
      display: flex;
      gap: 1em;

      button {
        width: 8em;
        height: 4em;
      }
    }
  }
`;

interface Props {
  items: Item[];
  setItems: Dispatch<React.SetStateAction<Item[]>>;
  setListEditing: Dispatch<React.SetStateAction<boolean>>;
}

function ItemList(props: Props) {
  const { items, setItems } = props;
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    props.setListEditing(editing);
  }, [editing]);

  const handleDelete = (frontendId: string) => {
    setItems((pre) => {
      const result = pre.filter((item) => item.frontendId !== frontendId);
      return result;
    });

    //delete item, the id field is given by the server.
    //const id = items.find((i) => i.frontendId === frontendId)?.id || "";
    //deleteList(id)
  };

  const handleEdit = (frontendId: string) => {
    setEditing(true);

    setItems((prev) => {
      const result = prev.map((item) => {
        if (item.frontendId === frontendId) {
          return { ...item, editing: true };
        }
        return item;
      });

      return result;
    });
  };

  const handleSave = (frontendId: string, formdata: FormData) => {
    const title = (formdata.get("title")?.toString() || "") as string;
    const description = (formdata.get("description")?.toString() ||
      "") as string;

    setItems((prev) => {
      const result = prev.map((item) => {
        if (item.frontendId === frontendId) {
          return { ...item, editing: false, title, description };
        }
        return item;
      });

      return result;
    });

    setEditing(false);

    //update items, the id field is given by the server.
    //const id = formdata.get("id") || "";
    //updateList([{id, title, description}])
  };

  const handleCancel = (frontendId: string) => {
    setItems((prev) => {
      const result = prev.map((item) => {
        if (item.frontendId === frontendId) {
          return { ...item, editing: false };
        }
        return item;
      });

      return result;
    });

    setEditing(false);
  };

  const handleComplete = (frontendId: string) => {
    setItems((prev) => {
      const result = prev.map((item) => {
        if (item.frontendId === frontendId) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });

      return result;
    });
  };

  return (
    <ListContainer>
      {filterVisible(items).map((item) =>
        item.editing ? (
          <EditingItem key={item.frontendId}>
            <form>
              <div className="text">
                <div>
                  <span>title</span>
                  <input name="title" defaultValue={item.title} />
                </div>
                <div>
                  <span>description</span>
                  <textarea
                    name="description"
                    defaultValue={item.description}
                  />
                </div>
              </div>
              <div className="buttons">
                <button
                  formAction={(formdata) =>
                    handleSave(item.frontendId, formdata)
                  }
                >
                  save
                </button>
                <button
                  name="cancel"
                  onClick={() => handleCancel(item.frontendId)}
                >
                  cancel
                </button>
              </div>
            </form>
          </EditingItem>
        ) : (
          <DisplayItem key={item.frontendId}>
            <div className="text">
              {item.completed ? (
                <i className="completeCircle"></i>
              ) : (
                <i className="uncompleteCircle"></i>
              )}
              <div>
                <span>title</span>
                <div>{item.title}</div>
              </div>
              <div>
                <span>description</span>
                <div>{item.description}</div>
              </div>
            </div>
            <div className="buttons">
              <button
                name="delete"
                onClick={() => handleDelete(item.frontendId)}
              >
                Delete
              </button>
              <button
                name="edit"
                disabled={editing}
                onClick={() => handleEdit(item.frontendId)}
              >
                Edit
              </button>
              <button
                name="signComplete"
                onClick={() => handleComplete(item.frontendId)}
              >
                toggle Complete State
              </button>
            </div>
          </DisplayItem>
        )
      )}
    </ListContainer>
  );
}

export default ItemList;
