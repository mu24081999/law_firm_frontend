import PropTypes from 'prop-types';

function EmptyState({ 
  title = "No data available", 
  description = "Get started by creating your first item", 
  icon,
  action
}) {
  return (
    <div className="text-center py-12">
      {icon && (
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>
      )}
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  action: PropTypes.node,
};

export default EmptyState;