import React from "react";

interface PaginationProps {
    setCurrentPage: (currentPage: number) => void;
    currentPage: number;
    totalPages: number;
}

export const Pagination = ({setCurrentPage, currentPage, totalPages}: PaginationProps) => {
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-4/5 flex content-center justify-center">
                <button
                    onClick={() => handlePageChange(1)}
                    className="mr-1 px-1.5 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    disabled={currentPage === 1}
                >
                    &laquo; First
                </button>

                {Array.from({length: totalPages}, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-1.5 py-1 rounded ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-blue-500"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(totalPages)}
                    className="ml-1 px-1.5 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                    disabled={currentPage === totalPages}
                >
                    Last &raquo;
                </button>
            </div>
        </div>
    )
}
