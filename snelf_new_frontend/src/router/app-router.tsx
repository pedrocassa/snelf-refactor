import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { BasePage } from '../pages/base-page';
import { ProductsPage } from '../pages/products-page';
import { TrainningPage } from '../pages/trainning-page';

export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/base" element={<BasePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/training" element={<TrainningPage />} />
            </Routes>
        </Router>
    )
}