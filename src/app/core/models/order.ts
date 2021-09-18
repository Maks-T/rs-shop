export interface IOrder {
  items: Item[];
  details: Details;
}

export interface Item {
  id: string;
  amount: number;
}

export interface Details {
  name: string;
  address: string;
  phone: string;
  timeToDeliver: string;
  comment: string;
}
