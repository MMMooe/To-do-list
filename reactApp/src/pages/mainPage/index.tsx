import { useState } from "react";
import { generateID } from "./utils";
import styled from "styled-components";
import ItemList from "./itemList";
import FilterList from "./filterList";
import useLocalstorage from "./useLocalstorage";

export interface Item {
  title: string;
  description: string;
  id: string;
  editing: boolean;
  completed: boolean;
  visible: boolean;
}

const MainPageList = "MAINPAGELIST";

const MainPageContainer = styled.div`
  header {
    font-size: 1.5em;
    padding: 5px 1em;
  }
`;

const FormContainer = styled.div`
  padding: 3em 2em;
  .form {
    display: flex;
    gap: 5em;

    .item {
      display: flex;
      input {
        height: 2em;
      }

      textarea {
        height: 4em;
      }

      label {
        margin-right: 1em;
      }
    }

    button {
      width: 6em;
      height: 4em;
    }
  }
`;

function MainPage() {
  const { value: items, setValue: setItems } = useLocalstorage<Item[]>(
    MainPageList,
    []
  );

  //responding to the filter with the new adding item.
  const [addingItemVisible, setAddingItemVisible] = useState<boolean>(true);

  const [listEditing, setListEditing] = useState<boolean>(false);

  const handleAddItem = (formData: FormData) => {
    const id = generateID();
    const title = (formData.get("title") || "") as string;
    const description = (formData.get("description") || "") as string;
    const addingItem = {
      id,
      title,
      description,
      completed: false,
      editing: false,
      visible: addingItemVisible,
    };
    setItems((pre) => {
      return pre.concat([addingItem]);
    });
  };

  return (
    <MainPageContainer>
      <header> To-do List </header>
      <hr />
      <FormContainer>
        <form className="form" action={handleAddItem}>
          <div className="item">
            <label>title</label>
            <input name="title" required />
          </div>
          <div className="item">
            <label>description</label>
            <textarea name="description" required />
          </div>
          <button>Add</button>
        </form>
      </FormContainer>
      <hr />
      <FilterList
        setItems={setItems}
        setAddingItemVisible={setAddingItemVisible}
        editing={listEditing}
      />
      <ItemList
        items={items}
        setItems={setItems}
        setListEditing={setListEditing}
      />
    </MainPageContainer>
  );
}

export default MainPage;
