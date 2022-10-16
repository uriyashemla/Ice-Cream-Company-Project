import Select from "react-select";
import React, { useState } from "react";
export default ({ data, callback }) => {
  const [options, setOptions] = useState([]);

  const createObject = () => {
    const arr = [];
    data.forEach((item) => {
      arr.push({ value: item, label: item });
    });
    return arr;
  };

  
  return options[0] ? (
    <Select
    theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          text: 'orangered',
          primary25: 'hotpink',
          primary: 'black',
        }})} onChange={callback} options={options} />
  ) : (
    <>{setOptions(createObject())}</>
  );
};
