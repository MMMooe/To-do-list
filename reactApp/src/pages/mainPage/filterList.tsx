import { Dispatch, useEffect } from "react";
import { Item } from ".";
import { changeVisilbe } from "./utils";
import useLocalstorage from "./useLocalstorage";
import styled from "styled-components";

function organizeOptions(options: string[]) {
  return options.map((option) => (
    <option value={option} key={option}>
      {option}
    </option>
  ));
}

const Cantainer = styled.div`
  padding: 3em 2em;

  span {
    margin-right: 1em;
  }

  select {
    width: 12em;
    height: 2em;
  }
`;

const options: optionsType[] = ["all", "completed", "uncompleted"];

export type optionsType = "all" | "completed" | "uncompleted";

interface Props {
  setItems: Dispatch<React.SetStateAction<Item[]>>;
  setAddingItemVisible: Dispatch<React.SetStateAction<boolean>>;
  editing: boolean;
}

const FilterListKey = "FILTERLISTKEY";

function FilterList(props: Props) {
  const { value: selectedVal, setValue: setSelectedVal } =
    useLocalstorage<optionsType>(FilterListKey, options[0]);

  const handleSelectedValChange = (e: any) => {
    const val = (e?.target?.value || "all") as optionsType;
    setSelectedVal(val);
  };

  useEffect(() => {
    if (selectedVal) {
      changeVisilbe(props.setItems, selectedVal);
      if (selectedVal === "completed") {
        props.setAddingItemVisible(false);
      } else {
        props.setAddingItemVisible(true);
      }
    }
  }, [selectedVal]);

  return (
    <Cantainer>
      <span>status filter: </span>
      <select
        disabled={props.editing}
        value={selectedVal}
        onChange={handleSelectedValChange}
      >
        {organizeOptions(options)}
      </select>
    </Cantainer>
  );
}

export default FilterList;
