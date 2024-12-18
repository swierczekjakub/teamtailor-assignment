import React from "react";
import {DOWNLOAD_URL} from "@/app/config/constants";

export const DownloadButton = () => {
    const handleDownload = () => {
        window.location.href = DOWNLOAD_URL;
    };


    return (
        <div className="flex justify-center mt-6">
            <button
                onClick={handleDownload}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
                Download
            </button>
        </div>
    )
}
