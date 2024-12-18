"use client";

import React, { useState, useEffect } from "react";
import {Pagination} from "@/app/components/pagination";
import {Dropdown} from "@/app/components/dropdown";
import {DownloadButton} from "@/app/components/downloadButton";
import {Header} from "@/app/components/header";
import {Loader} from "@/app/components/loader";
import {CandidateTable} from "@/app/components/candidateTable";
import {getCandidates} from "@/app/services/backend";

export default function Page() {
    const [data, setData] = useState<Candidate[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await getCandidates();
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result: Candidate[] = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data from API
    useEffect(() => {
         fetchData();
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1);
    };

    return (
            <div className="w-screen bg-white p-6 rounded-lg shadow-lg">
                <Header />

                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Dropdown
                            itemsPerPage={itemsPerPage}
                            handleItemsPerPageChange={handleItemsPerPageChange}
                        />
                        <CandidateTable
                            candidatesData={currentData}
                        />
                        <Pagination
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            currentPage={currentPage}
                        />
                        <DownloadButton />
                    </>
                )}
            </div>
    );
}
