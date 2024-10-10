'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import InfosBar from "../components/InfosBar";

export default function AllProducts() {
  const [recently, setRecently] = useState([]);

  const GetRecently = async () => {
    try {
      const response = await axios.get("http://localhost:2000/all_products");
      if (Array.isArray(response.data) && response.data.length > 0) {
        setRecently(response.data);
      } else {
        setRecently([{ message: "Nenhum item adicionado recentemente" }]);
      }
    } catch (error) {
      setRecently([{ message: "Nenhum item adicionado recentemente: " + error.message }]);
      console.error("Erro ao fazer a requisição:", error);
    }
  }

  useEffect(() => {
    GetRecently();
  }, []);

  const handleProductDelete = async () => {
    await GetRecently(); // Atualiza a lista de produtos recentemente adicionados
};

  return (
    <div className="flex justify-center w-full items-center content-center">
      {recently.length > 0 ? (
        <ul className="w-11/12">
          {recently.map((item, index) => (
            <li key={index} className="w-full">
                {item.code!=undefined?
                  <InfosBar
                    ProductName={item.name_product}
                    ProductOwner={item.fornecedor}
                    Code={item.code}
                    Price={item.price}
                    Quantity={item.quantity}
                    CreatedAt={item.createdAt}
                    UpdatedAt={item.updatedAt}
                    onDelete={handleProductDelete} // Passa a função de callback
                  />
                  :
                  <div className="w-full h-full flex justify-center items-center text-center">
                    <h1>Nenhum produto adicionado</h1>
                  </div>
                }
            </li>
          ))}
        </ul>
      ) : (
        <div className="w-full h-full flex justify-center items-center text-center">
          <p>Nenhum produto adicionado</p>
        </div>
      )}
    </div>
  );
}
