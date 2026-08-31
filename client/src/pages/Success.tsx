import { useParams, Link } from 'react-router-dom';

const Success = () => {
  const { tranId } = useParams();

  return (
    <>
      <div className="animated-bg" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 glass-card text-center transform transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-8">
            <svg className="h-16 w-16 text-emerald-500 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Thank you for your purchase. Your transaction has been completed successfully.
          </p>

          <div className="mt-8 bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 border-dashed">
              <span className="text-sm text-gray-500 dark:text-gray-400">Transaction ID</span>
              <span className="text-sm font-mono font-medium text-gray-900 dark:text-white">{tranId || 'N/A'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-600 border-dashed">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
              <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Verified
              </span>
            </div>
          </div>

          <div className="mt-8 pt-4">
            <Link to="/" className="btn-primary bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-500 shadow-lg shadow-emerald-500/30">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;