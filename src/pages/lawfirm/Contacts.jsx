import { useState } from 'react';
import ContactForm from '../../components/ContactForm';

function Contacts() {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+92 300 1234567',
      company: 'ABC Corp',
      position: 'CEO',
      source: 'website',
      status: 'new',
      tags: ['potential', 'tax-filing'],
      notes: 'Interested in tax filing services',
    }
  ]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filterTag, setFilterTag] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleAddContact = (data) => {
    const newContact = {
      id: Date.now(),
      ...data
    };
    setContacts([...contacts, newContact]);
    setShowForm(false);
  };

  const handleUpdateContact = (data) => {
    setContacts(contacts.map(contact => 
      contact.id === selectedContact.id ? { ...contact, ...data } : contact
    ));
    setSelectedContact(null);
    setShowForm(false);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesTag = !filterTag || contact.tags.includes(filterTag);
    const matchesStatus = !filterStatus || contact.status === filterStatus;
    return matchesTag && matchesStatus;
  });

  const allTags = [...new Set(contacts.flatMap(contact => contact.tags))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <button
          onClick={() => {
            setSelectedContact(null);
            setShowForm(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Contact
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal">Proposal</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>

      {showForm ? (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedContact ? 'Edit Contact' : 'New Contact'}
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setSelectedContact(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <ContactForm
            onSubmit={selectedContact ? handleUpdateContact : handleAddContact}
            initialData={selectedContact}
          />
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.email}</div>
                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{contact.company}</div>
                    <div className="text-sm text-gray-500">{contact.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      contact.status === 'won' ? 'bg-green-100 text-green-800' :
                      contact.status === 'lost' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowForm(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setContacts(contacts.filter(c => c.id !== contact.id))}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Contacts;