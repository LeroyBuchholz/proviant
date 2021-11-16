import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonItem,
    IonLabel,
    IonNote
} from '@ionic/react';
import { Stock } from '../data/stock';
import './StockListItem.css';

interface StockListItemProps {
  stockItem: Stock;
}

const StockListItem: React.FC<StockListItemProps> = ({ stockItem }) => {
  return (
    <IonCard routerLink={`/stockitem/${stockItem.id}`}>
      <IonCardHeader>
          <IonCardTitle>{stockItem.name}</IonCardTitle>
          <IonCardSubtitle>{stockItem.location}</IonCardSubtitle>
      </IonCardHeader>
        <IonCardContent>
            {stockItem.amount} {stockItem.unit}
        </IonCardContent>
    </IonCard>
  );
};

export default StockListItem;
