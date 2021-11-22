import {useState} from 'react';
import {StockItem, getStockItem} from '../data/Stock';
import {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    useIonViewWillEnter,
} from '@ionic/react';
import {useParams} from 'react-router';
import './ViewStock.css';

function ViewStockItemDetails() {
    const [stockItem, setStockItem] = useState<StockItem>();
    const params = useParams<{ id: string }>();

    useIonViewWillEnter(() => {
        getStockItem(params.id).then((item => setStockItem(item)));
    });

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Zurück" defaultHref="/home">Zurück</IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {stockItem ? (
                    <div>
                        <h1>{stockItem.name}</h1>
                        <h2>{stockItem.location}</h2>
                        <span>{stockItem.amount} {stockItem.unit}</span>
                    </div>
                ) : (
                    <div>Lebensmittel kann leider nicht angezeigt werden</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default ViewStockItemDetails;
