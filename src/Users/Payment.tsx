import React, { useState } from 'react';
import AxiosApi from '../AxiosApi';
import { toast } from 'react-toastify';

interface BankDetails {
  CardHolder: string;
  CardNumber: string;
  Expiredate: string;
  cvv: string;
}

const Payment = ({ product }: { product: any }) => {
  const [data, setData] = useState<BankDetails>({
    CardHolder: '',
    CardNumber: '',
    Expiredate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const paymentComplete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('CardHolder', data.CardHolder);
      formData.append('CardNumber', data.CardNumber);
      formData.append('Expiredate', data.Expiredate);
      formData.append('cvv', data.cvv);

      const response = await AxiosApi.post(`/customer/payments/${product._id}`, formData);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <div className="w-[500px] h-96 shadow-lg p-6">
      <form onSubmit={paymentComplete}>
        <h4 className="text-center text-2xl uppercase underline mb-4">Payment Page</h4>

        <label className="block text-sm font-medium">Card Holder</label>
        <input type="text" name="CardHolder" className="input" value={data.CardHolder} onChange={handleChange} required />

        <label className="block text-sm font-medium">Card Number</label>
        <input type="text" name="CardNumber" className="input" value={data.CardNumber} onChange={handleChange} required />

        <div className="flex space-x-4 mt-2">
          <div className="w-1/2">
            <label className="block text-sm font-medium">Expiry Date</label>
            <input type="text" name="Expiredate" className="input" value={data.Expiredate} onChange={handleChange} required />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium">CVV</label>
            <input type="text" name="cvv" className="input" value={data.cvv} onChange={handleChange} required />
          </div>
        </div>

        <button className="w-full mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700" type="submit">
          Pay {product.totalamount}
        </button>
        
      </form>
    </div>
  );
};

export default Payment;
