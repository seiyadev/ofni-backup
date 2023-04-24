import { MenuItem, Menu } from "@mui/material";
import React from "react";

const MenuGeneral = React.forwardRef(function MenuGeneral(props, ref) {
  const { children, anchorOrigin, menuItems, menuId } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useImperativeHandle(ref, () => ({
    handleClose: () => {
      handleClose();
    },
  }));

  React.useEffect(() => {
    setItems([menuItems]);
  }, [menuItems]);

  return (
    <>
      <div ref={ref} onClick={handleClick}>
        {children}
      </div>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={anchorOrigin}
      >
        {items.map((item, index) => (
          <div key={index}>
            {item}
          </div>
        ))}
      </Menu>
    </>
  );
});

export default MenuGeneral;
