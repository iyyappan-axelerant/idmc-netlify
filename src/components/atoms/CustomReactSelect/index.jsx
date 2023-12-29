import React from "react";
import Select, { components } from "react-select";

const InputOption = (props) => {
  return (
    <components.Option {...props}>
      <input type="checkbox" className="me-2" checked={props?.isSelected} />
      {props?.children}
    </components.Option>
  );
};

const CustomMultiValue = (props) => {
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        hideSelectedOptions={false}
        options={props?.options}
        components={{
          MultiValue,
          Option: InputOption,
        }}
        {...props}
      />
    </div>
  );
};

export default CustomMultiValue;

const MoreSelectedBadge = ({ items }) => {
  const style = {
    background: "#eef4f8",
    color: "#018eca",
    fontWeight: "900",
    borderRadius: "50%",
    fontSize: "12px",
    padding: "6px 8px",
    order: 99,
  };

  const title = items.join(", ");
  const length = items.length;
  const label = `+ ${length}`;

  return (
    <div style={style} title={title}>
      {label}
    </div>
  );
};

const MultiValue = ({ index, getValue, ...props }) => {
  const maxToShow = 1;
  const overflow = getValue()
    .slice(maxToShow)
    .map((x) => x.label);

  return index < maxToShow ? (
    <components.MultiValue {...props} />
  ) : index === maxToShow ? (
    <MoreSelectedBadge items={overflow} />
  ) : null;
};
