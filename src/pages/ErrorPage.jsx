import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 px-4 text-center">
            <h1 className="text-7xl font-extrabold text-primary mb-4 tracking-tight">
                404
            </h1>

            <h2 className="text-3xl font-semibold mb-3">
                Page Not Found
            </h2>

            <p className="max-w-md mb-6 opacity-80 text-lg leading-relaxed">
                Oops! The page you're looking for doesn’t exist. It may have been moved, deleted, or the link might be incorrect.
            </p>

            <Link to="/" className="btn btn-primary btn-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;