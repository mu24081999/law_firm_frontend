import { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Card from '../components/common/Card';
import { 
  PlusIcon, 
  FolderIcon,
  DocumentIcon,
  DocumentTextIcon,
  PhotoIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  FolderPlusIcon,
  TrashIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

function DocumentManagement() {
  const [currentFolder, setCurrentFolder] = useState('root');
  const [selectedItems, setSelectedItems] = useState([]);
  const [view, setView] = useState('grid');
  
  // Mock folders data
  const folders = [
    { id: 'cases', name: 'Cases', items: 15, parent: 'root' },
    { id: 'templates', name: 'Templates', items: 8, parent: 'root' },
    { id: 'contracts', name: 'Contracts', items: 12, parent: 'root' },
    { id: 'client_docs', name: 'Client Documents', items: 20, parent: 'root' },
    { id: 'corporate', name: 'Corporate', items: 5, parent: 'cases' },
    { id: 'family', name: 'Family Law', items: 7, parent: 'cases' },
    { id: 'estate', name: 'Estate Planning', items: 3, parent: 'cases' },
  ];
  
  // Mock files data
  const files = [
    { 
      id: 1, 
      name: 'Contract Template.docx', 
      type: 'docx', 
      size: '245 KB', 
      modified: '2023-10-12', 
      parent: 'templates',
      user: 'John Doe'
    },
    { 
      id: 2, 
      name: 'Client Intake Form.pdf', 
      type: 'pdf', 
      size: '180 KB', 
      modified: '2023-10-10', 
      parent: 'templates',
      user: 'Jane Smith'
    },
    { 
      id: 3, 
      name: 'Smith Case Summary.docx', 
      type: 'docx', 
      size: '320 KB', 
      modified: '2023-10-15', 
      parent: 'client_docs',
      user: 'Mike Brown'
    },
    { 
      id: 4, 
      name: 'Financial Statement.xlsx', 
      type: 'xlsx', 
      size: '450 KB', 
      modified: '2023-10-08', 
      parent: 'client_docs',
      user: 'Jane Smith'
    },
    { 
      id: 5, 
      name: 'Court Filing.pdf', 
      type: 'pdf', 
      size: '1.2 MB', 
      modified: '2023-10-14', 
      parent: 'corporate',
      user: 'John Doe'
    },
    { 
      id: 6, 
      name: 'Evidence Photos.jpg', 
      type: 'jpg', 
      size: '3.4 MB', 
      modified: '2023-10-05', 
      parent: 'family',
      user: 'John Doe'
    },
    { 
      id: 7, 
      name: 'Service Agreement.pdf', 
      type: 'pdf', 
      size: '290 KB', 
      modified: '2023-10-01', 
      parent: 'contracts',
      user: 'Mike Brown'
    },
  ];
  
  // Get current path elements
  const getBreadcrumbs = () => {
    const path = [];
    let current = currentFolder;
    
    while (current !== 'root') {
      const folder = folders.find(f => f.id === current);
      if (folder) {
        path.unshift(folder);
        current = folder.parent;
      } else {
        break;
      }
    }
    
    return path;
  };
  
  // Get items in current folder
  const getCurrentFolderItems = () => {
    const folderItems = folders.filter(folder => folder.parent === currentFolder);
    const fileItems = files.filter(file => file.parent === currentFolder);
    
    return { folders: folderItems, files: fileItems };
  };
  
  const currentItems = getCurrentFolderItems();
  
  // File icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <DocumentTextIcon className="w-10 h-10 text-red-500" />;
      case 'docx':
        return <DocumentTextIcon className="w-10 h-10 text-blue-500" />;
      case 'xlsx':
        return <DocumentTextIcon className="w-10 h-10 text-green-500" />;
      case 'jpg':
      case 'png':
        return <PhotoIcon className="w-10 h-10 text-purple-500" />;
      default:
        return <DocumentIcon className="w-10 h-10 text-gray-500" />;
    }
  };
  
  // Toggle item selection
  const toggleItemSelection = (id, isFolder) => {
    if (selectedItems.some(item => item.id === id && item.isFolder === isFolder)) {
      setSelectedItems(selectedItems.filter(item => !(item.id === id && item.isFolder === isFolder)));
    } else {
      setSelectedItems([...selectedItems, { id, isFolder }]);
    }
  };
  
  // Check if an item is selected
  const isItemSelected = (id, isFolder) => {
    return selectedItems.some(item => item.id === id && item.isFolder === isFolder);
  };

  return (
    <div>
      <PageHeader 
        title="Document Management" 
        subtitle="Manage, organize, and share your documents securely"
        actions={
          <div className="flex space-x-2">
            <button className="btn btn-outline inline-flex items-center">
              <ArrowUpTrayIcon className="w-5 h-5 mr-1" />
              Upload
            </button>
            <button className="btn btn-primary inline-flex items-center">
              <PlusIcon className="w-5 h-5 mr-1" />
              New Document
            </button>
          </div>
        }
      />
      
      {/* Search and view controls */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            className="ml-2 flex-1 bg-transparent border-none focus:outline-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setView('grid')} 
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === 'grid' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Grid
          </button>
          <button 
            onClick={() => setView('list')} 
            className={`px-3 py-1 rounded text-sm font-medium ${
              view === 'list' 
                ? 'bg-primary-100 text-primary-700' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            List
          </button>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="mb-4 flex items-center space-x-2 text-sm">
        <button 
          onClick={() => setCurrentFolder('root')}
          className="text-primary-600 hover:text-primary-800 font-medium"
        >
          Home
        </button>
        
        {getBreadcrumbs().map((folder, index) => (
          <div key={folder.id} className="flex items-center">
            <span className="text-gray-500 mx-2">/</span>
            <button 
              onClick={() => setCurrentFolder(folder.id)}
              className={`hover:text-primary-800 ${
                index === getBreadcrumbs().length - 1 
                  ? 'font-medium text-gray-800' 
                  : 'text-primary-600'
              }`}
            >
              {folder.name}
            </button>
          </div>
        ))}
      </div>
      
      {/* Action bar */}
      <div className="mb-4 flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center space-x-3">
          <button className="text-sm flex items-center text-gray-600 hover:text-gray-900">
            <FolderPlusIcon className="w-4 h-4 mr-1" />
            New Folder
          </button>
          
          {selectedItems.length > 0 && (
            <>
              <span className="text-gray-300">|</span>
              <button className="text-sm flex items-center text-gray-600 hover:text-gray-900">
                <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                Download
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm flex items-center text-red-600 hover:text-red-800">
                <TrashIcon className="w-4 h-4 mr-1" />
                Delete
              </button>
            </>
          )}
        </div>
        
        <div className="text-sm text-gray-500">
          {selectedItems.length > 0 ? (
            <span>{selectedItems.length} item(s) selected</span>
          ) : (
            <span>{currentItems.folders.length + currentItems.files.length} item(s)</span>
          )}
        </div>
      </div>
      
      {/* Grid View */}
      {view === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {/* Folders */}
          {currentItems.folders.map((folder) => (
            <div 
              key={folder.id}
              onClick={() => toggleItemSelection(folder.id, true)}
              className={`relative bg-white rounded-lg border ${isItemSelected(folder.id, true) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'} p-4 cursor-pointer hover:shadow-md`}
            >
              <div 
                className="absolute inset-0 cursor-pointer z-10"
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  setCurrentFolder(folder.id);
                }}
              ></div>
              
              <div className="flex flex-col items-center text-center">
                <FolderIcon className="w-12 h-12 text-accent-500" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 truncate max-w-full">
                  {folder.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {folder.items} item(s)
                </p>
              </div>
            </div>
          ))}
          
          {/* Files */}
          {currentItems.files.map((file) => (
            <div 
              key={file.id}
              onClick={() => toggleItemSelection(file.id, false)}
              className={`relative bg-white rounded-lg border ${isItemSelected(file.id, false) ? 'border-primary-500 ring-2 ring-primary-200' : 'border-gray-200'} p-4 cursor-pointer hover:shadow-md`}
            >
              <div className="flex flex-col items-center text-center">
                {getFileIcon(file.type)}
                <h3 className="mt-2 text-sm font-medium text-gray-900 truncate max-w-full">
                  {file.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {file.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* List View */}
      {view === 'list' && (
        <Card className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Modified
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Owner
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Folders */}
                {currentItems.folders.map((folder) => (
                  <tr 
                    key={folder.id} 
                    className={`hover:bg-gray-50 ${isItemSelected(folder.id, true) ? 'bg-primary-50' : ''}`}
                    onClick={() => toggleItemSelection(folder.id, true)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={isItemSelected(folder.id, true)}
                        readOnly
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td 
                      className="px-4 py-3 whitespace-nowrap cursor-pointer"
                      onDoubleClick={() => setCurrentFolder(folder.id)}
                    >
                      <div className="flex items-center">
                        <FolderIcon className="w-6 h-6 text-accent-500 mr-3" />
                        <span className="text-sm font-medium text-gray-900">
                          {folder.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {folder.items} items
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      -
                    </td>
                  </tr>
                ))}
                
                {/* Files */}
                {currentItems.files.map((file) => (
                  <tr 
                    key={file.id} 
                    className={`hover:bg-gray-50 ${isItemSelected(file.id, false) ? 'bg-primary-50' : ''}`}
                    onClick={() => toggleItemSelection(file.id, false)}
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input 
                        type="checkbox" 
                        checked={isItemSelected(file.id, false)}
                        readOnly
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFileIcon(file.type)}
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(file.modified).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {file.size}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {file.user}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

export default DocumentManagement;