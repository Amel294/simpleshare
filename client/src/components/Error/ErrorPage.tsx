import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation
import './ErrorPage.css'; // Import the custom CSS for extra styling

const ErrorPage = () => {
  return (
    <div className=" errorPage relative min-h-screen bg-green-950 bg-opacity-95 text-[#80ff80] font-mono">
      <div className="absolute inset-0 bg-cover bg-no-repeat z-[-1] opacity-2" style={{ backgroundImage: 'url("https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif")' }} />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-40 z-1" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-transparent via-[#20ff20] to-transparent opacity-20 animate-scan" />
      
      <div className="absolute top-[20%] left-0 right-0 bottom-0 px-10 py-20 z-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            Error <span className="text-white">404</span>
          </h1>
          <p className="mb-2">
            <div>
              The page you are looking for might have been removed,
            </div>
            <div>
              had its name changed, or is temporarily unavailable.
            </div>
          </p>
          <p className="mb-2 flex items-center justify-center">
            Please  <Link to="/" className="text-white hover:text-[#20ff20]">
              <span className='text-2xl p-2 ms-4 bg-black rounded-lg'> return home</span>
            </Link>
          </p>
          <p className="mb-4">Good luck.</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
