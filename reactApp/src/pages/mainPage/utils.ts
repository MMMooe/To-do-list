import { Dispatch } from "react";
import { Item } from ".";
import { optionsType } from "./filterList";

function generateID(): string {
  const random1 = (Math.random() * 100).toString();
  const random2 = Date.now().toString();

  const result = (random1 + random2).substring(8);

  return result;
}

function filterVisible(items: Item[]) {
  const filteredItems = items.filter((item) => item.visible === true);

  return filteredItems;
}

function changeVisilbe(
  setItems: Dispatch<React.SetStateAction<Item[]>>,
  val: optionsType
) {
  setItems((prev) => {
    const result = prev.map((item) => {
      if (val === "all") {
        return { ...item, visible: true };
      } else if (val === "completed") {
        if (item.completed === true) {
          return { ...item, visible: true };
        } else {
          return { ...item, visible: false };
        }
      } else if (val === "uncompleted") {
        if (item.completed === true) {
          return { ...item, visible: false };
        } else {
          return { ...item, visible: true };
        }
      } else {
        return item;
      }
    });

    return result;
  });
}

export { generateID, filterVisible, changeVisilbe };
