export type LocalCertificate = { issuedAt: string; certificateId: string; displayName: string };
export const formatCertificateDate = (value: string) => { const date = new Date(value); return Number.isNaN(date.getTime()) ? 'Date unavailable' : date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); };
