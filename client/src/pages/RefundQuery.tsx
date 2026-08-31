import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const RefundQuery = () => {
  const [refundRefId, setRefundRefId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [refundData, setRefundData] = useState<any>(null);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refundRefId) return;
    
    setIsLoading(true);
    setRefundData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/payment/refund-query?refund_ref_id=${refundRefId}`);
      if (response.data.success) {
        setRefundData(response.data.data);
        toast.success("Refund status retrieved!");
      } else {
        toast.error("Could not retrieve refund status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch refund status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="animated-bg" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 glass-card">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Refund Query
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Check the status of your SSLCommerz refund
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleQuery}>
            <div>
              <label htmlFor="refund_ref_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Refund Reference ID
              </label>
              <input
                id="refund_ref_id"
                name="refund_ref_id"
                type="text"
                required
                value={refundRefId}
                onChange={(e) => setRefundRefId(e.target.value)}
                className="input-field"
                placeholder="e.g. SL4561445410"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !refundRefId}
              className="btn-primary"
            >
              {isLoading ? 'Checking...' : 'Check Status'}
            </button>
          </form>

          {refundData && (
            <div className="mt-6 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700 text-left">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-600 pb-2">
                Refund Details
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Status:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {refundData.status || 'Unknown'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Transaction ID:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {refundData.tran_id || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {refundData.refund_amount || 'N/A'} {refundData.currency || ''}
                  </span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Remarks:</span>
                  <span className="font-medium text-gray-900 dark:text-white truncate max-w-[150px]" title={refundData.errorReason || refundData.remarks || 'None'}>
                    {refundData.errorReason || refundData.remarks || 'None'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 text-center">
             <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundQuery;
