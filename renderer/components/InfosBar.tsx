'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

export default function InfosBar({ ProductName, ProductOwner, Code, Price, Quantity, CreatedAt, UpdatedAt, onDelete }) {
  const [productName, setProductName] = useState(Code);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteProduct = async () => {
    try {
      await axios.delete('http://localhost:2000/delete_product', { data: { code: productName } });
      onDelete();
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProductQuantity = async (quantity) => {
    try {
      await axios.put('http://localhost:2000/sell_item', { code: productName, quantity });
      onDelete();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setProductName(Code);
  }, [Code]);

  return (
    <div className="flex gap-16 h-auto justify-center w-full p-4 bg-slate-50 my-5 items-center rounded-xl drop-shadow-md text-sm xl:text-rs xl:h-auto">
      <p>Nome do Produto: {ProductName}</p>
      <p>Fornecedor: {ProductOwner}</p>
      <p>Código: {Code}</p>
      <p>Preço: {Price}</p>
      <p>Quantidade: {Quantity}</p>
      <p>Criado em: {CreatedAt}</p>
      <p>Atualizado em: {UpdatedAt}</p>
      <input
        type="button"
        className="bg-red-400 p-1 w-10 rounded-xl text-white hover:bg-red-600 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
        value="X"
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeleteAll={deleteProduct}
        onDeleteQuantity={deleteProductQuantity}
      />
    </div>
  );
}
