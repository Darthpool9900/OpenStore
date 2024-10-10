import axios from 'axios';
import { useState } from 'react';

export default function AddProducts() {
    const [productNew, setProductNew] = useState({
        name_product: "",
        fornecedor: "",
        code: "",
        price: 0.0,
        quantity: 1
    });
    const [productAdded, setProductAdded] = useState(false); // Estado para controlar se o produto foi adicionado com sucesso
    
    const addProductRequest = async () => {
        try {
            const response = await axios.post("http://localhost:2000/add_product", productNew);
            console.log(response.data); // Assuming you want to log the response data
            setProductAdded(true); // Define o estado do produto adicionado como verdadeiro
        } catch(err) {
            console.log(err.message);
            return Promise.reject(err);
        }
    };

    const handleChange = (e, field) => {
        setProductNew({
            ...productNew,
            [field]: e.target.value
        });
    };

    // Função para fechar o aviso após algum tempo
    const closeAlert = () => {
        setProductAdded(false);
    };
    
    return (
        <div className="flex flex-col w-full justify-center items-center h-full">
            <form className="flex flex-col w-full justify-center items-center h-screen">
                <div className=" w-8/12 ">
                    <input type="text" className="w-full drop-shadow-lg p-2" placeholder="Código de barras" onChange={(e) => handleChange(e, 'code')}></input>
                </div>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Nome do produto" onChange={(e) => handleChange(e, 'name_product')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Nome do fornecedor" onChange={(e) => handleChange(e, 'fornecedor')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Preço" onChange={(e) => handleChange(e, 'price')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Quantia" onChange={(e) => handleChange(e, 'quantity')}></input>
                <input type="button" onClick={addProductRequest} className="w-2/12 m-4 p-2 text-white bg-teal-800 hover:bg-teal-700 drop-shadow-lg cursor-pointer" value="Adicionar"></input>
            </form>
            {productAdded && ( // Renderiza o aviso apenas se o produto foi adicionado
                <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow">
                    Produto adicionado com sucesso!
                    <button className="ml-4" onClick={closeAlert}>Fechar</button> {/* Botão para fechar o aviso */}
                </div>
            )}
        </div>
    );
}
