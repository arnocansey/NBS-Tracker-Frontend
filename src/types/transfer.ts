// frontend/src/types/transfer.ts

export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Emergency';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'IN_TRANSIT' | 'REJECTED' | 'COMPLETED';

export interface TransferRequest {
    request_id?: number;
    patient_name: string;
    from_ward: string;
    required_specialty: string;
    priority: PriorityLevel;
    clinical_notes: string;
    status?: RequestStatus;
    assigned_bed_id?: number;
    requested_by?: string;
    decided_by?: string;
    decision_notes?: string;
    reject_reason?: string;
    decided_at?: string;
    completed_at?: string;
    updated_at?: string;
    created_at?: string;
}
