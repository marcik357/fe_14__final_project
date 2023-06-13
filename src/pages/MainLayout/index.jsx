// import style from './mainLayout.module.scss'
import { Outlet } from 'react-router-dom';
import Footer from "../../components/Footer";
import Header from '../../components/Header';

export function MainLayout() {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}
