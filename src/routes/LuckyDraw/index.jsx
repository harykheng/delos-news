import React, { useState } from "react";

import LuckyDrawWheel from "../../components/LuckyDrawWheel";

import { Modal } from 'react-bootstrap';

import wonGif from '../../assets/won.gif';
import loseGif from '../../assets/lose.gif';

import './styles.scss';

const LuckyDraw = () => {

    const luckyTicket = localStorage.getItem('luckyTicket');
    const userCoins = localStorage.getItem('userCoins');

    const [showModal, setShowModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const [prizes, setPrize] = useState([
        { id: 1, background: '#00D7FF', fonts: [{ text: '50.000 coins', top: "45px" }], value: 50000 },
        { id: 2, background: '#b8c5f2', fonts: [{ text: '20.000 coins', top: "45px" }], value: 20000 },
        { id: 3, background: '#e9e8fe', fonts: [{ text: '10.000 coinss', top: "45px" }], value: 10000 },
        { id: 4, background: '#b8c5f2', fonts: [{ text: 'Roll Again', top: "45px" }], value: 0 },
        { id: 5, background: '#e9e8fe', fonts: [{ text: 'Try Again', top: "45px" }], value: 0 },
        { id: 6, background: '#b8c5f2', fonts: [{ text: '10.000 coins', top: "45px" }], value: 10000 },
        { id: 7, background: '#e9e8fe', fonts: [{ text: '20.000 coins', top: "45px" }], value: 20000 },
    ])

    const handleResultPrize = (value) => {
        const dataResult = value.fonts[0].text;
        const resultPrize = prizes.filter(item => item.fonts[0].text === dataResult)[0];

        if(dataResult === 'Try Again'){
            localStorage.setItem('luckyTicket', parseInt(luckyTicket)-1)
            setModalData({label : <p>{dataResult}</p>, img: loseGif})
            setShowModal(true);
            return;
        }

        if(dataResult === 'Roll Again'){
            setModalData({label : <p>{dataResult}</p>, img: loseGif})
            setShowModal(true);
            return;
        }

        if(resultPrize.value === 50000){
            setPrize(prizes.filter((item) => item.id !== 1))
        }

        localStorage.setItem('luckyTicket', parseInt(luckyTicket)-1)
        localStorage.setItem('userCoins', parseInt(userCoins) + resultPrize.value)
        setModalData({label : <p>You Won <span>{dataResult}</span> !</p>, img: wonGif})
        setShowModal(true);
    }

    return(
        <>
            <div className="delos-lucky-draw">
                <div className="header">
                    <h2 className="header-title">Lucky Draw</h2>
                </div>
                <div className="body">
                    <h2>You have {luckyTicket} tickets !</h2>
                    <div className="lucky-wheel">
                        <LuckyDrawWheel onHandleResult={handleResultPrize} prizes={prizes}/>
                    </div>
                </div>
            </div>
            <Modal show={showModal} centered className="modal-lucky-draw">
                <p className="modal-text">{modalData.label}</p>
                <img src={modalData.img} alt=""/>
                <button className="modal-btn" onClick={() => { setShowModal(!showModal)}}>Got it</button>
            </Modal>
        </>
    )
}
 
export default LuckyDraw;