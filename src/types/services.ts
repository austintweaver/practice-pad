
export interface Service {
  id: number;
  title: string;
  description: string;
  details: string[];
  price: string;
  popular: boolean;
}

export type ServiceCategory = 'litigation' | 'family' | 'business' | 'estate';

export interface ServiceData {
  [key: string]: Service[];
}
