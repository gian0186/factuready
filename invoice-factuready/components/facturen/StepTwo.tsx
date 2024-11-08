import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

interface StepTwoProps {
  nextStep: () => void;
  prevStep: () => void;
  title: string;
  products: { productName: string; quantity: number; price: number; vat: number; discount: number }[];
  setProducts: React.Dispatch<React.SetStateAction<{ productName: string; quantity: number; price: number; vat: number; discount: number }[]>>;
  clientName: string;
}

const StepTwo: React.FC<StepTwoProps> = ({ nextStep, prevStep, title, products, setProducts, clientName }) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [totalExcl, setTotalExcl] = useState<number>(0);
  const [totalIncl, setTotalIncl] = useState<number>(0);

  useEffect(() => {
    let totalExclSum = 0;
    let totalInclSum = 0;

    products.forEach((product) => {
      const discountMultiplier = (100 - product.discount) / 100;
      const priceAfterDiscount = product.price * discountMultiplier;
      const totalProductExcl = priceAfterDiscount * product.quantity;
      const totalProductIncl = totalProductExcl * (1 + product.vat / 100);

      totalExclSum += totalProductExcl;
      totalInclSum += totalProductIncl;
    });

    setTotalExcl(totalExclSum);
    setTotalIncl(totalInclSum);
  }, [products]);

  const handleAddProduct = () => {
    const newProduct = {
      productName: '',
      quantity: 1,
      price: 0,
      vat: 21,
      discount: 0,
    };
    setProducts([...products, newProduct]);
    setEditIndex(products.length);
  };

  const handleSaveEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleEditProduct = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveProducts = () => {
    if (products.length > 0) {
      nextStep();
    }
  };

  return (
    <div className="p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <h3 className="text-lg font-semibold mb-4">Klantnaam: {clientName}</h3>

      {/* Productinformatie toevoegen */}
      {products.map((product, index) => (
        <div key={index} className="flex flex-wrap gap-2 mb-4 items-start">
          <div className="flex flex-col w-1/4 min-w-[100px]">
            <label className="font-bold mb-1">Product/Dienst</label>
            <input
              type="text"
              value={product.productName}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) => (i === index ? { ...p, productName: e.target.value } : p))
                )
              }
              placeholder="Product/Dienst"
              className="p-2 border rounded"
              disabled={editIndex !== index && editIndex !== null}
            />
          </div>

          <div className="flex flex-col w-1/12 min-w-[70px]">
            <label className="font-bold mb-1">Aantal</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) => (i === index ? { ...p, quantity: parseInt(e.target.value) } : p))
                )
              }
              placeholder="Aantal"
              className="p-2 border rounded"
              disabled={editIndex !== index && editIndex !== null}
            />
          </div>

          <div className="flex flex-col w-1/6 min-w-[90px]">
            <label className="font-bold mb-1">Prijs</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) => (i === index ? { ...p, price: parseFloat(e.target.value) } : p))
                )
              }
              placeholder="Prijs"
              className="p-2 border rounded"
              disabled={editIndex !== index && editIndex !== null}
            />
          </div>

          <div className="flex flex-col w-1/8 min-w-[80px]">
            <label className="font-bold mb-1">BTW (%)</label>
            <select
              value={product.vat}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) => (i === index ? { ...p, vat: parseInt(e.target.value) } : p))
                )
              }
              className="p-2 border rounded"
              disabled={editIndex !== index && editIndex !== null}
            >
              <option value={21}>21%</option>
              <option value={9}>9%</option>
              <option value={4}>4%</option>
              <option value={0}>0%</option>
            </select>
          </div>

          <div className="flex flex-col w-1/8 min-w-[80px]">
            <label className="font-bold mb-1">Kortingspercentage (%)</label>
            <input
              type="number"
              value={product.discount}
              onChange={(e) =>
                setProducts(
                  products.map((p, i) => (i === index ? { ...p, discount: parseFloat(e.target.value) } : p))
                )
              }
              placeholder="Kortingspercentage (%)"
              className="p-2 border rounded"
              disabled={editIndex !== index && editIndex !== null}
            />
          </div>

          <div className="flex items-center gap-1 mt-7">
            {editIndex === index ? (
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white p-2 rounded"
              >
                Opslaan
              </button>
            ) : (
              <button
                onClick={() => handleEditProduct(index)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                <FaEdit />
              </button>
            )}
            <button
              onClick={() => handleDeleteProduct(index)}
              className="bg-red-500 text-white p-2 rounded"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* Totaalbedrag weergave */}
      <div className="mt-6 mb-4 p-4 bg-gray-100 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="font-bold">Totaal Excl. BTW:</span>
          <span>€ {totalExcl.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Totaal Incl. BTW:</span>
          <span>€ {totalIncl.toFixed(2)}</span>
        </div>
      </div>

      <button onClick={handleAddProduct} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        Voeg Product Toe
      </button>
      <div className="flex justify-between">
        <button onClick={prevStep} className="bg-gray-500 text-white py-2 px-4 rounded">
          Vorige
        </button>
        <button
          onClick={handleSaveProducts}
          disabled={products.length === 0}
          className={`${
            products.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'
          } text-white py-2 px-4 rounded`}
        >
          Volgende
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
