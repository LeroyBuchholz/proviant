import StockListItem from '../components/StockListItem';
import React, {useState} from 'react';
import {StockItem, getStock, addStockItem} from '../data/Stock';
import {
    IonPage, IonContent, IonHeader, IonIcon, IonRefresher, IonRefresherContent,
    IonButton, IonButtons,
    IonFab, IonFabButton, IonModal, IonItem, IonSelectOption, IonLabel, IonSelect,
    IonList,
    IonToolbar, IonTitle,
    useIonViewWillEnter, IonInput, IonItemGroup, IonItemDivider
} from '@ionic/react';
import './Home.css';
import {add} from "ionicons/icons";
import {Unit} from "../data/Unit";

const Home: React.FC = () => {

    const [stock, setStock] = useState<StockItem[]>([]);

    const [showModal, setShowModal] = useState(false);

    const [foodName, setFoodName] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [unit, setUnit] = useState<Unit>();
    const [location, setLocation] = useState<string>('');

    const refresh = (e: CustomEvent) => {
        setTimeout(() => {
            e.detail.complete();
        }, 3000);
    };

    function logStock() {
        console.log(stock);
    }

    function loadStock() {
        getStock().then(newStock => {
            setStock(newStock);
        });
    }

    function clearAddingForm() {
        setFoodName('');
        setAmount(0);
        setUnit(undefined);
        setLocation('');
    }

    //useIonViewWillEnter (loadStock);

    useIonViewWillEnter(() => {
        console.log('entered');
        loadStock();
    });

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
                    {stock.map(item => {
                        return <StockListItem key={item.id} stockItem={item}/>
                    })}
                </IonList>

                <IonModal isOpen={showModal}>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Hinzufügen</IonTitle>
                            <IonButtons slot="end">
                                <IonButton onClick={() => setShowModal(false)}>Schließen</IonButton>
                            </IonButtons>
                        </IonToolbar>
                    </IonHeader>
                    <IonItemDivider></IonItemDivider>
                    <IonContent>
                        <IonItemGroup>
                            <IonItem>
                                <IonLabel position="stacked">Lebensmittel</IonLabel>
                                <IonInput value={foodName}
                                          autofocus={true}
                                          placeholder="z.B. Tomate, Reis, ..."
                                          onIonChange={e => setFoodName(e.detail.value!)}>
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Menge</IonLabel>
                                <IonInput type="number"
                                          min="1"
                                          value={amount}
                                          placeholder="0"
                                          onIonChange={e => setAmount(parseInt(e.detail.value!))}>
                                </IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Maßeinheit</IonLabel>
                                <IonSelect interface="popover"
                                           value={unit}
                                           placeholder="Maßeinheit"
                                           onIonChange={e => setUnit(e.detail.value)}>
                                    <IonSelectOption value={Unit.stk}>{Unit.stk}</IonSelectOption>
                                    <IonSelectOption value={Unit.kg}>{Unit.kg}</IonSelectOption>
                                    <IonSelectOption value={Unit.g}>{Unit.g}</IonSelectOption>
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel position="stacked">Aufbewahrungsort</IonLabel>
                                <IonInput value={location}
                                          placeholder="z.B. Kühlschrank, Keller, ..."
                                          onIonChange={e => setLocation(e.detail.value!)}>
                                </IonInput>
                            </IonItem>
                        </IonItemGroup>
                        <IonItemDivider></IonItemDivider>
                        <IonButton expand="full"
                                   onClick={() => {
                                       addStockItem(foodName, location, amount, unit).then(() => {
                                           loadStock();
                                           setShowModal(false);
                                           clearAddingForm();
                                       });
                                   }}>
                            Hinzufügen
                        </IonButton>
                    </IonContent>
                </IonModal>

                <IonFab vertical="bottom" horizontal="center" slot="fixed">
                    <IonFabButton onClick={() => setStock([...stock])/*setShowModal(true)*/}><IonIcon icon={add}/></IonFabButton>
                </IonFab>

            </IonContent>
        </IonPage>
    );
};

export default Home;