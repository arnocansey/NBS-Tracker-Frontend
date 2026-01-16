// frontend/src/types/transfer.ts

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Emergency';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export interface TransferRequest {
    request_id?: number;
    patient_name: string;
    from_ward: string;
    required_specialty: string;
    priority: PriorityLevel;
    clinical_notes: string;
    status?: RequestStatus;
    created_at?: string;
}