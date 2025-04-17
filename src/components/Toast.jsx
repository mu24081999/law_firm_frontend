"use client";

import { Button, Toast } from "flowbite-react";
import { MdLoop } from "react-icons/md";
import PropTypes from "prop-types";

export function ToastComponent({ message, title, actions }) {
  return (
    <Toast>
      <div className="flex items-start">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
          <MdLoop className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-center text-gray-900 dark:text-white">
            {title}
          </span>
          <div className="mb-2 text-sm font-normal py-2">{message}</div>
          <div className="flex gap-2">
            {Array.isArray(actions) &&
              actions?.map((action, index) => (
                <div className="w-auto" key={index}>
                  <Button
                    className={`rounded-none bg-${
                      action?.backgroundColor ? action?.backgroundColor : "blue"
                    }-500`}
                    onClick={action?.onClick}
                    size="xs"
                  >
                    {action?.label}
                  </Button>
                </div>
              ))}
          </div>
        </div>
        {/* <Toast.Toggle /> */}
      </div>
    </Toast>
  );
}
ToastComponent.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.array,
};
