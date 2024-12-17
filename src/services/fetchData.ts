import {
    ApiResponse,
    CandidateWithJobApplications,
    Meta,
} from "../types/apiResponse";
import {destructureCandidates} from "../utils/destructureCandidates";

export const fetchPage = async (url: string, page: number): Promise<{
    candidates: CandidateWithJobApplications[],
    meta: Meta
}> => {
    try {
        const response = await fetch(url + page, {
            method: "GET",
            headers: {
                "Authorization": `Token token=${process.env.API_KEY}`,
                "X-Api-Version": "20240404"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch page ${page}: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        const candidates = destructureCandidates(data);

        return {
            candidates,
            meta: data.meta
        }

    } catch (error) {
        {
            console.error('Error fetching candidates:', error);
            throw error;
        }
    }
};

export const fetchAllPages = async (url: string): Promise<CandidateWithJobApplications[]> => {
    let allData: CandidateWithJobApplications[] = [];
    let currentPage: number = 1;
    let totalPages: number = 1;

    do {
        const response = await fetchPage(url, currentPage);
        allData = [...allData, ...response.candidates];
        totalPages = response.meta["page-count"];
        currentPage++;
    } while (currentPage <= totalPages);

    return allData;
};
