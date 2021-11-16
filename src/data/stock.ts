import {unit} from "./unit";

export interface Stock {
  name: string;
  location: string;
  amount?: number;
  unit?: unit;
  id: number;
}

const stock: Stock[] = [
  {
    name: 'Kartoffeln',
    location: 'Keller',
    amount: 2.5,
    unit: unit.kg,
    id: 0
  },
  {
    name: 'Jogurt',
    location: 'Kühlschrank',
    amount: 5,
    unit: unit.stk,
    id: 1
  },
  {
    name: 'Wassermelone',
    location: 'Kühlschrank',
    amount: .5,
    unit: unit.stk,
    id: 2
  },
  {
    name: 'Kidney Bohnen',
    location: 'Küchenschrank',
    amount: 1,
    unit: unit.stk,
    id: 3
  },
  {
    name: 'Spaghetti',
    location: 'Küchenschrank',
    amount: 3,
    unit: unit.stk,
    id: 4
  }
];

export const getStock = () => stock;

export const getStockItem = (id: number) => stock.find(item => item.id === id);
