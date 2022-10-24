import Select from "react-select";
import React, { useState } from "react";

export default ({ data, callback }) => {
  const [options, setOptions] = useState([]);

  const createObject = () => {
    const arr = [];
    data.forEach((item) => {
      arr.push({ value: item, label: item, color: "red" });
    });
    return arr;
  };

  return options[0] ? (
    <span style={{ backgroundColor: "black", color: "black" }}>
      <Select
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            text: "orangered",
            primary25: "hotpink",
            primary: "black",
            // primary75:"black"
            primary50: "#B2D4FF",
          },
        })}
        onChange={callback}
        options={options}
      />
    </span>
  ) : (
    <>{setOptions(createObject())}</>
  );
};
