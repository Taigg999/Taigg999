import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles/GlobalStyles.js';
import { AuthProvider } from './context/auth.js';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './context/search';
import { CartProvider } from './context/cart';

import 'antd/dist/reset.css';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <SearchProvider>
            <CartProvider>
                <GlobalStyles>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GlobalStyles>
            </CartProvider>
        </SearchProvider>
    </AuthProvider>,
);

reportWebVitals();
