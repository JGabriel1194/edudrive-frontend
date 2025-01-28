export interface LicenseInterface {
  id: number;
  documentId: string;
  name: string;
  description: string;
  cost: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  type: string;
  state: boolean;
  image: {
    id: number;
    documentId: string;
    url: string;
  };
}

export interface newLicenseInterface {
    type:string;
    name:string;
    description:string;
    state:boolean;
    cost:number;
    image:number
}