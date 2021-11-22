import {Storage} from '@capacitor/storage';
import {Unit} from "./Unit";
import {v4 as uuid} from 'uuid';

export interface StockItem {
    name: string;
    location: string;
    amount?: number;
    unit?: Unit;
    id: string;
}

const initialStock: StockItem[] = [
    {
        name: 'Kartoffeln',
        location: 'Keller',
        amount: 2.5,
        unit: Unit.kg,
        id: '0'
    },
    {
        name: 'Jogurt',
        location: 'Kühlschrank',
        amount: 5,
        unit: Unit.stk,
        id: '1'
    },
    {
        name: 'Wassermelone',
        location: 'Kühlschrank',
        amount: .5,
        unit: Unit.stk,
        id: '2'
    },
    {
        name: 'Kidney Bohnen',
        location: 'Küchenschrank',
        amount: 1,
        unit: Unit.stk,
        id: '3'
    },
    {
        name: 'Spaghetti',
        location: 'Küchenschrank',
        amount: 3,
        unit: Unit.stk,
        id: '4'
    }
];

export async function getStockItem(id: string): Promise<StockItem> {
    const {value} = await Storage.get({key: id});
    return typeof value === "string" ? JSON.parse(value) : [];
}

export async function getStock(): Promise<StockItem[]> {
    const stock: StockItem[] = [];
    await Storage.keys().then(keys => {
        keys.keys.forEach(key => {
            getStockItem(key).then((stockItem: StockItem) => stock.push(stockItem));
        });
    });
    return stock;
}

export function generateStockItem(name: string, location: string, amount: number, unit: Unit | undefined): StockItem {
    return {
        name: name,
        location: location,
        amount: amount,
        unit: unit,
        id: uuid()
    }
}

export async function addStockItem(name: string, location: string, amount: number, unit: Unit | undefined): Promise<void> {
   const stockItem = generateStockItem(name, location, amount, unit);

    await Storage.set({
        key: stockItem.id,
        value: JSON.stringify(stockItem)
    });
}

export async function initiateStorage(): Promise<void> {
    await initialStock.forEach(stockItem => {
        Storage.set({
            key: stockItem.id,
            value: JSON.stringify(stockItem),
        });
    });
}




