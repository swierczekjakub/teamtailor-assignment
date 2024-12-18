import React from "react";

interface DropdownProps {
    handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    itemsPerPage: number;
}

export const Dropdown = ({itemsPerPage, handleItemsPerPageChange}: DropdownProps) => {

    return (
        <div className="mb-6 flex justify-center">
            <label className="mr-4 text-lg">Show:</label>
            <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-300 px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value={10}>10</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </select>
        </div>
    )
}
