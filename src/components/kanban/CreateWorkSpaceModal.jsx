import React, { useState } from "react";

const CreateWorkspaceModal = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({
      id: Date.now(),
      name,
      logoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Workspace</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Workspace Name"
            className="w-full p-2 mb-4 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Logo URL (Optional)"
            className="w-full p-2 mb-4 border rounded"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceModal;