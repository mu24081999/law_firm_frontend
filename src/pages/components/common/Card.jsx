import PropTypes from "prop-types";

function Card({ title, children, footer, className = "" }) {
  return (
    <div className={`card ${className}`}>
      {title && (
        <div className="mb-4 pb-2 border-b border-gray-100">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      )}

      <div>{children}</div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  className: PropTypes.string,
};

export default Card;
