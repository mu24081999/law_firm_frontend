import { useState } from 'react'
import Card from '../ui/Card'
import { Link } from 'react-router-dom'

function PayrollSummary() {
  const [payPeriod] = useState('October 16-31, 2025')
  const [payDate] = useState('November 5, 2025')
  const [totalAmount] = useState('$142,875.50')
  const [employeeCount] = useState(23)

  return (
    <Card 
      title="Next Payroll" 
      className="h-full"
      footer={
        <div className="flex justify-between items-center">
          <Link to="/payroll/run" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View details
          </Link>
          <button className="btn btn-primary">
            Run Payroll
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">Pay Period</div>
          <div className="text-sm font-medium">{payPeriod}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">Pay Date</div>
          <div className="text-sm font-medium">{payDate}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-500">Employees</div>
          <div className="text-sm font-medium">{employeeCount}</div>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-100">
          <div className="text-sm font-medium text-gray-700">Total Amount</div>
          <div className="text-lg font-semibold text-primary-900">{totalAmount}</div>
        </div>
      </div>
    </Card>
  )
}

export default PayrollSummary