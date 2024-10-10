import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { useReactToPrint } from 'react-to-print';

const BarcodeGenerator = () => {
  const [code, setCode] = useState('');
  const barcodeRef = useRef(null);
  const previewRef = useRef(null);

  const generateRandomCode = () => {
    const randomCode = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    setCode(randomCode);
    if (previewRef.current) {
      JsBarcode(previewRef.current, randomCode, { format: 'CODE128' });
    }
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, randomCode, { format: 'CODE128' });
    }
  };

  useEffect(() => {
    generateRandomCode();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current,
    onBeforePrint: () => {
      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, code, { format: 'CODE128' });
      }
    },
  });

  return (
    <div className="flex flex-col items-center mt-8">
      <div className="border p-4 mb-4">
        <svg ref={previewRef} />
      </div>
      <div className="hidden">
        <svg ref={barcodeRef} />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={generateRandomCode}
          className="mt-4 px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-600"
        >
          Gerar Novo Código
        </button>
        <button
          onClick={handlePrint}
          className="mt-4 px-4 py-2 bg-teal-800 text-white rounded hover:bg-teal-600"
        >
          Imprimir Código de Barras
        </button>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
