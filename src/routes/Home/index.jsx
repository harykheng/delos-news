import React, { useEffect, useState } from "react";
import Modal from 'react-bootstrap/Modal';

import { useListMostViewed } from '../hooks';
import { oddOrEven } from '../../helpers/oddOrEven';
import { formatCurrency } from '../../helpers/currency';

import logoDelos from '../../assets/logo-delos-horizontal-white.png';
import noPhoto from '../../assets/no-photo-available.png';
import moneyBag from '../../assets/money-bag.png'

import './styles.scss';

const Home = () => {
    const { mostViewedData } = useListMostViewed(1);

    const checkingLoad = localStorage.getItem('firstLoad');
    const userCoins = localStorage.getItem('userCoins');

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(!checkingLoad) {
            setShowModal(true);
            localStorage.setItem('userCoins', 100000);
            localStorage.setItem('firstLoad', true);
            localStorage.setItem('freeItem', 0);
            localStorage.setItem('luckyTicket', 0);
        }
    }, [checkingLoad])

    const renderTitle = (item) => {
        return(
            <section className="content-body">
                <h1>{item?.title}</h1>
                <p className="content-abstract">{item?.abstract}</p>
                <div className="content-author">
                    <span className="separator"/> 
                    <i>{item?.byLine}</i>
                </div>
                <button className="btn-read-more" onClick={() => { window.open(item?.articleUrl, '_blank')}}>Read More</button>
            </section>
        )
    }

    return (
        <>
            <div className="delos-home">
                <div className="header">
                    <img src={logoDelos} alt="" />
                    <h2 className="header-title">Delos News</h2>
                    <div className="typewriter">
                        <h3>Premium Article Shopping</h3>
                    </div>
                </div>
                <div className="body">
                    {mostViewedData.map((item,index) => {
                        if(index < 5) {
                            const isImgNotFound = item?.imgUrl ? item?.imgUrl : noPhoto;
                            const checkingEven = oddOrEven(index) === 'even';

                            return (
                                <div className="trending-list" key={`article-${index}`}>
                                    <div className="content">
                                        {checkingEven ? <img src={isImgNotFound} alt=""/> : renderTitle(item)}
                                    </div>
                                    <div className="content">
                                        {checkingEven ? renderTitle(item) : <img src={isImgNotFound} alt=""/>}
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <Modal show={showModal} onHide={()=>{setShowModal(!showModal)}} centered>
                <div className="delos-modal">
                    <h3>Your coins :</h3>
                    <div>
                        <img className="modal-img" src={moneyBag} alt=""/><h1>{formatCurrency(userCoins)}</h1>
                    </div>
                    <h3>Buy anything do you want !</h3>
                    <button className="modal-btn" onClick={() => { setShowModal(!showModal); }}>Got It!</button>
                </div>
            </Modal>
        </>
    );
};

export default Home;