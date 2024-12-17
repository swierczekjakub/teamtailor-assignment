export interface ApiResponse {
    data: Candidate[];
    included: JobApplication[];
    meta: Meta;
    links: PaginationLinks;
}

export interface Candidate {
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

export interface JobApplication {
    id: string;
    type: string;
    links: {
        self: string;
    };
    attributes: {
        "created-at": string;
    };
}

export interface RelationshipData {
    type: string;
    id: string;
}

export interface Meta {
    "record-count": number;
    "page-count": number;
}

export interface PaginationLinks {
    first: string;
    prev?: string;
    next?: string;
    last: string;
}

export interface CandidateWithJobApplications {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobApplications: {
        id: string;
        createdAt: string;
    }[],
}
