export interface IUserInfo {
  firstName: string;
  lastName: string;
  cart: string[];
  favorites: string[];
  orders: Order[];
}

export interface Order {
  items: Item[];
  details: Details;
  id: string;
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
