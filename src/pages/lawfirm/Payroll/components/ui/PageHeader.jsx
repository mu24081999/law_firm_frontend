import { Link } from 'react-router-dom'

function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 pb-4 border-b border-gray-200">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
        {action && (
          <div className="mt-4 md:mt-0">
            {typeof action === 'string' ? (
              <Link
                to={action}
                className="btn btn-primary"
              >
                Add {title.slice(0, -1)}
              </Link>
            ) : (
              action
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PageHeader