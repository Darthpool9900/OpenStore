import express from 'express';
import { Op } from 'sequelize';
import bodyParser from 'body-parser';
import cors from 'cors';
import Product from '../models/Product';

// Configuração do body parser
const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

// Rota de teste
router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World'
    });
});

// Adicionar produto
router.post('/add_product', async (req, res) => {
    try {
        const { code, name_product, fornecedor, price, quantity } = req.body;

        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Quantidade ou preço inválido" });
        }

        const existingProduct = await Product.findOne({ 
            where: { 
                code: code 
            }
        });

        if (existingProduct) {
            // Atualiza a quantidade existente
            if(parsedQuantity){
            existingProduct.quantity += parsedQuantity;
            await existingProduct.save();
            }
            return res.status(200).json({ message: "Produto atualizado", product: existingProduct });
        } else {
            // Cria um novo produto
            const product = await Product.create({
                code,
                name_product,
                fornecedor,
                price: parsedPrice,
                quantity: parsedQuantity
            });
            return res.status(200).json({ message: "Produto adicionado", product: product });
        }
    } catch (err) {
        console.error('Erro ao adicionar produto:', err);
        return res.status(500).json({ message: err.message });
    }
});


// Obter todos os produtos
router.get('/all_products', async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (err) {
        console.error('Erro ao buscar todos os produtos:', err);
        return res.status(500).json({ message: err.message });
    }
});

// Obter produto por código
router.get('/products/:code', async (req, res) => {
    try {
        const code: string = req.params.code;
        const product = await Product.findOne({
            where: { code: code }
        });
        if (product) {
            return res.status(200).json(product);
        } else {
            return res.status(404).json({ message: "Produto não encontrado" });
        }
    } catch (err) {
        console.error('Erro ao buscar produto por código:', err);
        return res.status(500).json({ message: err.message });
    }
});

// Buscar produtos
router.get('/search', async (req, res) => {
    const searchTerm = req.query.query as string;
   
    try {
        const result = await Product.findAll({
            where: {
                [Op.or]: [
                    { name_product: { [Op.like]: `%${searchTerm}%` } },
                    { code: { [Op.like]: `%${searchTerm}%` } },
                    { price: { [Op.like]: `%${searchTerm}%` } },
                    { quantity: { [Op.like]: `%${searchTerm}%` } }
                ]
            }
        });
        return res.status(200).json(result);
    } catch (error) {
        console.error('Erro ao realizar a busca:', error);
        return res.status(500).json({ error: 'Erro ao realizar a busca' });
    }
});

// Atualizar produto
router.put('/update_product', async (req, res) => {
    const { code, name_product, fornecedor, price, quantity } = req.body;

    try {
        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(price);
        if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
            return res.status(400).json({ message: "Quantidade ou preço inválido" });
        }

        const [updated] = await Product.update({
            name_product,
            fornecedor,
            price: parsedPrice,
            quantity: parsedQuantity
        }, {
            where: { code }
        });

        if (updated) {
            const updatedProduct = await Product.findOne({ where: { code } });
            return res.status(200).json(updatedProduct);
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

// Vender produto
router.put('/sell_item', async (req, res) => {
    const { code, quantity } = req.body;

    try {
        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedQuantity)) {
            return res.status(400).json({ message: "Quantidade inválida" });
        }

        const product = await Product.findOne({ where: { code } });

        if (product) {
            if (product.quantity >= parsedQuantity) {
                product.quantity -= parsedQuantity;
                await product.save();
                return res.status(200).json({ message: 'Produto vendido com sucesso.' });
            } else {
                return res.status(400).json({ message: 'Quantidade insuficiente em estoque.' });
            }
        } else {
            return res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao realizar a venda:', error);
        return res.status(500).json({ error: 'Erro ao realizar a venda.' });
    }
});

// Deletar produto
router.delete('/delete_product', async (req, res) => {
    const { code } = req.body;

    try {
        const deleted = await Product.destroy({ where: { code } });
        if (deleted) {
            return res.status(204).json({ message: 'Produto removido com sucesso.' });
        }
        throw new Error('Produto não encontrado');
    } catch (error) {
        console.error('Erro ao remover produto:', error);
        return res.status(500).json({ error: 'Erro ao remover produto' });
    }
});

// Obter produtos ordenados por data de atualização
router.get('/product_date', async (req, res) => {
    try {
        const products = await Product.findAll({ 
            limit: 20, 
            order: [['updatedAt', 'DESC']] 
        });
        return res.status(200).json(products);
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return res.status(500).json({ error: "Erro ao buscar produtos" });
    }
});

export default router;
