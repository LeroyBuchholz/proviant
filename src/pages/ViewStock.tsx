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

function ViewStock() {
    const [stock, setStock] = useState<StockItem>();
    const params = useParams<{ id: string }>();

    useIonViewWillEnter(async () => {
        const stockItem = await getStockItem(params.id);
        console.log(stockItem);
        setStock(stockItem);
    });

    return (
        <IonPage id="view-message-page">
            <IonHeader translucent>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text="Zurück" defaultHref="/home"></IonBackButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                {stock ? (
                    <div>
                        <h1>{stock.name}</h1>
                        <h2>{stock.location}</h2>
                        <span>{stock.amount} {stock.unit}</span>
                    </div>
                ) : (
                    <div>Lebensmittel kann leider nicht angezeigt werden</div>
                )}
            </IonContent>
        </IonPage>
    );
}

export default ViewStock;
