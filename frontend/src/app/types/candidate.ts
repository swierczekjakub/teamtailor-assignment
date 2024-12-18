interface JobApplication {
    id: string;
    createdAt: string;
}

interface Candidate {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    jobApplications: JobApplication[];
}
