import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import StatusBadge from '../components/common/StatusBadge';
import EmptyState from '../components/common/EmptyState';
import { 
  PlusIcon, 
  FolderIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

function CaseManagement() {
  const [selectedTab, setSelectedTab] = useState('active');
  
  // Mock case data
  const cases = [
    { 
      id: 1, 
      title: 'Smith vs. Anderson', 
      caseNumber: 'CA-2023-001', 
      type: 'Divorce', 
      client: 'John Smith', 
      status: 'Active', 
      lastUpdate: '2023-10-15',
      notes: 'Initial consultation completed. Preparing documents.',
    },
    { 
      id: 2, 
      title: 'Wilkinson Estate', 
      caseNumber: 'CA-2023-002', 
      type: 'Estate Planning', 
      client: 'Mary Wilkinson', 
      status: 'Active', 
      lastUpdate: '2023-10-12',
      notes: 'Will draft in progress. Need to follow up on asset list.',
    },
    { 
      id: 3, 
      title: 'Johnson Corporation', 
      caseNumber: 'CA-2023-003', 
      type: 'Corporate', 
      client: 'Johnson Corp', 
      status: 'On Hold', 
      lastUpdate: '2023-09-28',
      notes: 'Waiting for financial documents from client.',
    },
    { 
      id: 4, 
      title: 'Martin Injury Claim', 
      caseNumber: 'CA-2023-004', 
      type: 'Personal Injury', 
      client: 'Robert Martin', 
      status: 'Active', 
      lastUpdate: '2023-10-14',
      notes: 'Medical records received. Preparing demand letter.',
    },
    { 
      id: 5, 
      title: 'Thompson Custody', 
      caseNumber: 'CA-2023-005', 
      type: 'Family Law', 
      client: 'Sarah Thompson', 
      status: 'Completed', 
      lastUpdate: '2023-08-20',
      notes: 'Final hearing completed. Custody agreement approved.',
    },
  ];
  
  // Filter cases based on selected tab
  const filteredCases = cases.filter(caseItem => {
    if (selectedTab === 'active') return caseItem.status === 'Active';
    if (selectedTab === 'onhold') return caseItem.status === 'On Hold';
    if (selectedTab === 'completed') return caseItem.status === 'Completed';
    return true; // 'all' tab
  });

  return (
    <div>
      <PageHeader 
        title="Case Management" 
        subtitle="Manage your legal cases and track their progress"
        actions={
          <button className="btn btn-primary inline-flex items-center">
            <PlusIcon className="w-5 h-5 mr-1" />
            New Case
          </button>
        }
      />
      
      {/* Filters and search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search cases..."
            className="ml-2 flex-1 bg-transparent border-none focus:outline-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button className="btn btn-outline inline-flex items-center">
            <FunnelIcon className="w-5 h-5 mr-1" />
            Filter
            <ChevronDownIcon className="w-4 h-4 ml-1" />
          </button>
          
          <select className="form-input px-3 py-2 pr-8 bg-white">
            <option>All Types</option>
            <option>Family Law</option>
            <option>Corporate</option>
            <option>Estate Planning</option>
            <option>Personal Injury</option>
          </select>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setSelectedTab('all')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300'
            }`}
          >
            All Cases
          </button>
          <button
            onClick={() => setSelectedTab('active')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === 'active'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedTab('onhold')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === 'onhold'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300'
            }`}
          >
            On Hold
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`py-3 px-4 text-sm font-medium border-b-2 ${
              selectedTab === 'completed'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:border-gray-300'
            }`}
          >
            Completed
          </button>
        </nav>
      </div>
      
      {/* Cases list */}
      {filteredCases.length > 0 ? (
        <div className="space-y-4">
          {filteredCases.map((caseItem) => (
            <Card key={caseItem.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-lg font-medium text-gray-900">
                        {caseItem.title}
                      </h3>
                      <span className="ml-3 text-sm text-gray-500">
                        ({caseItem.caseNumber})
                      </span>
                    </div>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="mr-4">Type: {caseItem.type}</span>
                      <span>Client: {caseItem.client}</span>
                    </div>
                  </div>
                  <StatusBadge status={caseItem.status} />
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-800">Notes:</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {caseItem.notes}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 px-5 py-3 flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Last updated: {new Date(caseItem.lastUpdate).toLocaleDateString()}
                </div>
                
                <div className="flex space-x-2">
                  <button className="btn btn-outline text-sm py-1">View Details</button>
                  <button className="btn btn-primary text-sm py-1">Add Note</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No cases found"
          description="Get started by creating your first case"
          icon={<FolderIcon className="w-8 h-8 text-gray-400" />}
          action={
            <button className="btn btn-primary inline-flex items-center">
              <PlusIcon className="w-5 h-5 mr-1" />
              New Case
            </button>
          }
        />
      )}
    </div>
  );
}

export default CaseManagement;