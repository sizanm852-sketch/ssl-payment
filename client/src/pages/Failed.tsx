import { Link } from 'react-router-dom';

const Failed = () => {
  return (
    <>
      <div className="animated-bg" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 glass-card text-center transform transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 mb-8 relative">
            <div className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-20"></div>
            <svg className="h-12 w-12 text-red-500 drop-shadow-md relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Payment Failed
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            We couldn't process your payment. This might be due to insufficient funds, a network error, or an invalid card.
          </p>

          <div className="mt-8 pt-4">
            <Link to="/" className="btn-primary bg-red-500 hover:bg-red-600 focus:ring-red-500 shadow-lg shadow-red-500/30">
              Try Again
            </Link>
          </div>
          
          <div className="mt-4">
             <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline underline-offset-2">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Failed;