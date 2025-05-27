import React from "react";

const CaseDetails = ({ data }) => {
  if (!data)
    return <p className="text-center text-gray-500">No case selected.</p>;

  const {
    title,
    category,
    client_name,
    opponent_name,
    court_name,
    case_type,
    description,
    status,
    assigned_to,
    filing_date,
    hearing_date,
    next_action,
    notes,
    documents,
    priority,
  } = data;

  return (
    <div className="bg-white rounded-2xl p-6 mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <Detail label="Category" value={category} />
        <Detail label="Client Name" value={client_name} />
        <Detail label="Opponent Name" value={opponent_name} />
        <Detail label="Court Name" value={court_name} />
        <Detail label="Case Type" value={case_type} />
        <Detail label="Status" value={status} />
        <Detail label="Assigned To" value={assigned_to} />
        <Detail label="Filing Date" value={filing_date} />
        <Detail label="Hearing Date" value={hearing_date} />
        <Detail label="Next Action" value={next_action} />
        <Detail label="Priority" value={priority} />
      </div>

      {description && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-1">Description</h3>
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {Array.isArray(notes) && notes.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-1">Notes</h3>
          <ul className="list-disc pl-6 text-sm text-gray-600 space-y-1">
            {notes.map((note, index) => (
              <li key={index}>
                {typeof note === "string" ? note : JSON.stringify(note)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {Array.isArray(documents) && documents.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-1">Documents</h3>
          <ul className="list-disc pl-6 text-sm text-blue-600 space-y-1">
            {documents.map((doc, index) => (
              <li key={index}>
                <a
                  href={typeof doc === "string" ? doc : doc.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {typeof doc === "string"
                    ? `Document ${index + 1}`
                    : doc.name || `Document ${index + 1}`}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs text-gray-500">{label}</span>
    <span className="font-medium">{value || "—"}</span>
  </div>
);

export default CaseDetails;
