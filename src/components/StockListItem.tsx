import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, useIonViewWillEnter
} from '@ionic/react';
import {StockItem} from '../data/Stock';

interface StockListItemProps {
  stockItem: StockItem;
}

const StockListItem: React.FC<StockListItemProps> = ({ stockItem }) => {

    useIonViewWillEnter(() => {
        console.log(stockItem);
    });

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
