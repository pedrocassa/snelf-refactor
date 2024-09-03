import { createContext } from "react";
import BaseStore from "./base-store";
import ProductsStore from "./products-store";
import TrainningStore from "./trainning-store";

class RootStore {
    baseStore?: BaseStore;
    productsStore?: ProductsStore;
    trainningStore?: TrainningStore;
    
    constructor() {
        this.baseStore = new BaseStore();
        this.productsStore = new ProductsStore();
        this.trainningStore = new TrainningStore();
    }
}

export const RootStoreContext = createContext<RootStore | null>(null);

export default RootStore;