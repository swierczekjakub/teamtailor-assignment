interface ApiResponse {
    data: Candidate[];
    included: JobApplication[];
    meta: Meta;
    links: PaginationLinks;
}

interface Candidate {
    id: string;
    type: string;
    links: {
        self: string;
    };
    attributes: {
        "first-name": string;
        "last-name": string;
        email: string;
    };
    relationships: {
        "job-applications": {
            links: {
                self: string;
                related: string;
            };
            data: RelationshipData[];
        };
    };
}

interface JobApplication {
    id: string;
    type: string;
    links: {
        self: string;
    };
    attributes: {
        "created-at": string;
    };
}

interface RelationshipData {
    type: string;
    id: string;
}

interface Meta {
    "record-count": number;
    "page-count": number;
}

interface PaginationLinks {
    first: string;
    prev?: string;
    next?: string;
    last: string;
}

interface CandidateWithJobApplications {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobApplications: {
        id: string;
        createdAt: string;
    }[],
}

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

        const candidates: CandidateWithJobApplications[] = data.data.map((candidate: Candidate): CandidateWithJobApplications => {
            const {id, attributes: {'first-name': firstName, 'last-name': lastName, email}, relationships} = candidate;
            const candidateJobRelationshipData: RelationshipData[] = relationships['job-applications'].data;

            const jobApplications = candidateJobRelationshipData.map((jobApp: RelationshipData) => {
                const jobAppDetails: JobApplication = data.included.find(((item: JobApplication) => item.id === jobApp.id && item.type === 'job-applications')) as JobApplication;

                return {
                    id: jobApp.id,
                    createdAt: jobAppDetails?.attributes['created-at']
                };
            })

            return {
                id,
                firstName,
                lastName,
                email,
                jobApplications
            };
        });

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
    let currentPage = 1;
    let totalPages = 1;

    do {
        const response = await fetchPage(url, currentPage);
        allData = [...allData, ...response.candidates];
        totalPages = response.meta["page-count"];
        currentPage++;
    } while (currentPage <= totalPages);

    return allData;
};
