// renderer/components/Modal.js
import { useState } from 'react';

const Modal = ({ isOpen, onClose, onDeleteAll, onDeleteQuantity }) => {
  const [quantity, setQuantity] = useState('');

  if (!isOpen) return null;

  const handleDeleteAll = () => {
    onDeleteAll();
    onClose();
  };

  const handleDeleteQuantity = () => {
    onDeleteQuantity(quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">Excluir Produto</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantidade a excluir</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between">
          <button onClick={handleDeleteAll} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
            Excluir Tudo
          </button>
          <button onClick={handleDeleteQuantity} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Excluir Quantidade
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
