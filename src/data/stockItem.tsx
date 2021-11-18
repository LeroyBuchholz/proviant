import {unit} from "./unit";
import { Storage } from '@capacitor/storage';

export interface StockItem {
  name: string;
  location: string;
  amount?: number;
  unit?: unit;
  id: number;
}

const initialStock: StockItem[] = [
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

export async function initiateStorage() {
  await Storage.set({
    key: 'food',
    value: JSON.stringify(initialStock),
  });
}

export async function getStock() {
  const { value } = await Storage.get({key: 'food'});
  return typeof value === "string" ? JSON.parse(value) : [];
}

export async function getStockItem(id: number) {
  const stock = await getStock();
  return stock.find((item: StockItem) => item.id === id);
}
