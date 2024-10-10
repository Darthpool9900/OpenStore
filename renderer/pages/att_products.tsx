'use client'

import axios from 'axios';
import { useState } from 'react';

export default function AttProducts(){
    const [productNew, setProductNew] = useState({
        name_product: "",
        fornecedor: "",
        code: "",
        price: 0,
        quantity: 0
    });
    
    const addProductRequest = async () => {
        try {
            const response = await axios.put("http://localhost:2000/update_product", productNew);
            console.log(response.data); // Assuming you want to log the response data
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
    
    return (
        <div className="flex flex-col w-full justify-center items-center h-full">
            <form className="flex flex-col w-full justify-center items-center h-screen">
                <div className=" w-8/12">
                    <input type="text" className="w-full drop-shadow-lg p-2" placeholder="Código de barras" onChange={(e) => handleChange(e, 'code')}></input>
                </div>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Nome do produto" onChange={(e) => handleChange(e, 'name_product')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Nome do fornecedor" onChange={(e) => handleChange(e, 'fornecedor')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Preço" onChange={(e) => handleChange(e, 'price')}></input>
                <input type="text" className="w-8/12 drop-shadow-lg p-2 m-4" placeholder="Quantia" onChange={(e) => handleChange(e, 'quantity')}></input>
                <input type="button" onClick={addProductRequest} className="w-2/12 m-4 p-2 text-white bg-teal-800 hover:bg-teal-700 drop-shadow-lg cursor-pointer" value="Atualizar produto"></input>
            </form>
        </div>
    );
}
