import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { AutoComplete } from "./autoComplete";

const SimpleComplete = () => {
  // const lakersWithNumber = [
  //   { value: "bradley", number: 11 },
  //   { value: "pope", number: 1 },
  //   { value: "caruso", number: 4 },
  //   { value: "cook", number: 2 },
  //   { value: "cousins", number: 15 },
  //   { value: "james", number: 23 },
  //   { value: "AD", number: 3 },
  //   { value: "green", number: 14 },
  //   { value: "howard", number: 39 },
  //   { value: "kuzma", number: 0 },
  // ];
  // const handleFetch = (queries: string) => {
  //   action(queries);
  //   return lakersWithNumber.filter((player) => player.value.includes(queries));
  // };
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
    />
  );
};
storiesOf("AutoComplete 组件", module)
  .addParameters({ jest: ["autoComplete.test.tsx"] })
  .add("AutoComplete", SimpleComplete);
