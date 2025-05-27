import { Link } from 'react-router-dom'
import Card from '../ui/Card'

const recentPayments = [
  {
    id: 1,
    period: 'October 1-15, 2025',
    date: 'October 20, 2025',
    amount: '$138,492.25',
    status: 'completed',
  },
  {
    id: 2,
    period: 'September 16-30, 2025',
    date: 'October 5, 2025',
    amount: '$140,675.80',
    status: 'completed',
  },
  {
    id: 3,
    period: 'September 1-15, 2025',
    date: 'September 20, 2025',
    amount: '$135,290.40',
    status: 'completed',
  },
]

function RecentPayments() {
  return (
    <Card 
      title="Recent Payrolls" 
      className="h-full"
      footer={
        <Link 
          to="/payroll/history" 
          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View all payrolls
        </Link>
      }
    >
      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Period
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pay Date
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.period}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.date}
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {payment.amount}
                </td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-50 text-success-900">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RecentPayments