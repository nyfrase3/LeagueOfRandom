import React from "react";
import Item from "./Item";
import Tooltip from "@mui/material/Tooltip";
import RemoveItemMenu from "./ItemBuilder/RemoveItemMenu";

const Build = ({
  items = [
    { id: 0 },
    { id: -1 },
    { id: -2 },
    { id: -3 },
    { id: -4 },
    { id: -5 },
  ],
  handleItemClick,
  showRemove,
  setShowRemove,
  itemToRemove,
  handleRemoveClose,
}) => {
  return (
    <div className="build-cont">
      <h3>Build</h3>
      <div className="build-flex">
        {items?.map((item) => (
          <div
            style={{ flex: "0 1 127px", backgroundColor: "#1a1a1a" }}
            key={item.id}
            onClick={() => handleItemClick(item)}
          >
            <Item item={item} />
          </div>
        ))}
        <RemoveItemMenu
          onClose={handleRemoveClose}
          open={showRemove}
          selectedName={itemToRemove?.name}
        />
      </div>
    </div>
  );
};

export default Build;
