import { Link } from 'react-router-dom';

const Refund = () => {
  return (
    <>
      <div className="animated-bg" />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md w-full space-y-8 glass-card text-center transform transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-8">
            <svg className="h-12 w-12 text-amber-500 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            You have cancelled the payment process. No charges were made to your account.
          </p>

          <div className="mt-8 pt-4">
            <Link to="/" className="btn-primary bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 shadow-lg shadow-amber-500/30">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Refund;
