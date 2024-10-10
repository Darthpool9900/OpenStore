import Link from 'next/link';

export default function Header() {
    return (
        <main className='drop-shadow-lg w-full'>
            <header className="h-16 bg-teal-800 w-full drop-shadow-lg"></header>
            <div className="flex space-betwen h-14 w-full drop-shadow-lg bg-slate-50 justify-center">
                <div className="w-1/2 flex space-x-8 justify-center items-center">
                    <Link href="/home" className='hover:text-emerald-300 text-sm'>Página inicial</Link>
                    <Link href="/search_products" className='hover:text-emerald-300 text-sm'>Pesquisar produto</Link>
                    <Link href="/add_product" className='hover:text-emerald-300 text-sm'>Adicionar produto</Link>
                    <Link href="/att_products" className='hover:text-emerald-300 text-sm'>Atualizar produto</Link>
                    <Link href="/all_products" className='hover:text-emerald-300 text-sm'>Todos os meus produtos</Link>
                    <Link href="/generate_barcode" className="hover:text-emerald-300 text-sm">Gerar Código de Barras</Link>
                </div>
            </div>
        </main>
    );
}

