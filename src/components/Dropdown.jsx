import React from "react";
import { Dropdown } from "flowbite-react";
import PropTypes from "prop-types";
const DropdownComponent = ({ items, direction, label, size }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <Dropdown
          size={size}
          label={``}
          placement={direction}
          renderTrigger={() => <span className="cursor-pointer">{label}</span>}
        >
          {Array.isArray(items) &&
            items?.length > 0 &&
            items.map((item, index) => (
              <Dropdown.Item
                onClick={
                  item?.onClick
                    ? item?.onClick
                    : () => {
                        return;
                      }
                }
                key={index}
              >
                {item?.name}
              </Dropdown.Item>
            ))}
        </Dropdown>
      </div>
    </div>
  );
};
DropdownComponent.propTypes = {
  items: PropTypes.array,
  direction: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
};

export default DropdownComponent;
