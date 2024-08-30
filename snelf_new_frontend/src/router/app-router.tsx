import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from '../pages/home-page';
import { BasePage } from '../pages/base-page';
import { ProductsPage } from '../pages/products-page';
import { TrainingPage } from '../pages/training-page';

export const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/base" element={<BasePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/training" element={<TrainingPage />} />
            </Routes>
        </Router>
    )
}