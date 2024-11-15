export interface Cita {
  id: number;
  customerId: number;
  serviceId: number;
  date: string;
  time: string;
  status: string;
  fullName: string;
  email: string;
  service: string;
  availability: string;
  message?: string;
  requirements?: string;
}
