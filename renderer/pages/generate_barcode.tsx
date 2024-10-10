// renderer/pages/generate_barcode.js
import BarcodeGenerator from '../components/BarCodeGenerator';


export default function GenerateBarcodePage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Gerador de Código de Barras</h1>
        <BarcodeGenerator />
      </div>
    </div>
  );
}
