import React from "react";

const ToggleButton = React.forwardRef(
  ({ children, onClick, className }, ref) => {
    return (
      <div
        className={className}
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </div>
    );
  }
);

export default ToggleButton;
