'use client';
import { store } from '@/app/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/app/store/store';
import Loader from './lib/Loader';
import { Toaster } from 'react-hot-toast';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate loading={<Loader/>} persistor={persistor}>
                <Toaster/>
                {children}
            </PersistGate>
        </Provider>
    );
}