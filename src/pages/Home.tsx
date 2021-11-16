import StockListItem from '../components/StockListItem';
import { useState } from 'react';
import { Stock, getStock } from '../data/stock';
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {

  const [stock, setStock] = useState<Stock[]>([]);

  useIonViewWillEnter(() => {
    const stock = getStock();
    setStock(stock);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Proviant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Proviant
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {stock.map(item => <StockListItem key={item.id} stockItem={item} />)}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
