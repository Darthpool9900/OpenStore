'use client'
import { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import InfosBar from "../components/InfosBar";

export default function SearchPage() {
    const [queryParam, setQuery] = useState(""); // Inicialize com uma string vazia
    const [resultsParam, setResults] = useState([]);
    const router = useRouter();

    const GetResults = async () => {
        try {
            const response = await axios.get(`http://localhost:2000/search?query=${queryParam}`);
            console.log(response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setResults(response.data);
            }else{
                setResults([{ message: "Nenhum item encontrado" }]);
            }
        } catch (error) {
            setResults([{ message: "Nenhum item encontrado: " + error.message }]);
            console.error("Erro ao fazer a requisição:", error);
        }
    };

    const handleProductDelete = async () => {
        await GetResults(); // Atualiza a lista de produtos recentemente adicionados
    };

    return (
        <div className="flex justify-center w-full items-center content-center h-full flex-col">
            <div className="w-full flex items-center content-center justify-center">
                <input
                    type="text"
                    className="w-8/12 drop-shadow-lg p-2 m-4"
                    placeholder="Código, nome...."
                    onChange={(e) => setQuery(e.target.value)} // Corrigido para e.target.value
                />
                <input
                    type="button"
                    className="w-2/12 m-4 p-2 text-white bg-teal-800 hover:bg-teal-700 drop-shadow-lg cursor-pointer"
                    value="Pesquisar"
                    onClick={GetResults}
                />
            </div>
            {resultsParam.length > 0 ? (
                <ul className="w-11/12">
                    {resultsParam.map((item, index) => (
                        <li key={index} className="w-full">
                            {item.code != undefined ? (
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
                            ) : (
                                <div className="w-full h-full flex justify-center items-center text-center">
                                    <h1>{resultsParam[0].message}</h1>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="w-full h-full flex justify-center items-center text-center">
                    <p>Nenhum produto encontrado</p>
                </div>
            )}
        </div>
    );
}