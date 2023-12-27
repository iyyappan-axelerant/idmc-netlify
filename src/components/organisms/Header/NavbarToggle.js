import React, { useState } from "react";

const NavbarToggle = React.forwardRef(
  ({ children, onClick, className }, ref) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    return (
      <div className="d-flex align-items-baseline">
        {children}
        <div
          className={className}
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
            setIsNavOpen(!isNavOpen);
          }}
        >
          {isNavOpen ? (
            <i class="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-justify"></i>
          )}
        </div>
      </div>
    );
  }
);

export default NavbarToggle;
