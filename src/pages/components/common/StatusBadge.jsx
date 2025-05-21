import PropTypes from 'prop-types';

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'completed':
      case 'paid':
      case 'approved':
        return 'badge-green';
      case 'pending':
      case 'in progress':
        return 'badge-blue';
      case 'on hold':
      case 'waiting':
        return 'badge-yellow';
      case 'cancelled':
      case 'overdue':
      case 'rejected':
        return 'badge-red';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`badge ${getStatusStyles()}`}>
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;