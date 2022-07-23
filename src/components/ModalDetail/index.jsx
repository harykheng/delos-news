import React from "react";
import moment from "moment";
import { Modal, Toast, ToastContainer } from 'react-bootstrap';

import { getPrice } from '../../helpers/getPrice';
import { formatCurrency } from '../../helpers/currency';

import noPhoto from '../../assets/no-photo-available.png';
import closeIcon from '../../assets/close.png';

import './styles.scss'

const ModalDetail = ({ show, onClose, data, onHandleClickPurchase, toast, setToast, userCoins }) => {

    return(
        <Modal show={show} centered size="xl">
            <div className="detail-article">
                <img src={closeIcon} alt="" className="btn-close" onClick={onClose}/>
                <h2 className="detail-content">{data?.title}</h2>
                <p className="detail-content">{data?.abstract}</p>
                <hr />
                <img src={!data?.imgUrl ? noPhoto : data?.imgUrl} alt="" className="detail-img"/>
                <div className="detail-content author">
                    <i>{data?.byLine}</i> / <span>{moment(data?.publishDate).format('DD MMMM YYYY')}</span>
                </div>
                <div className="detail-coins">
                    <p className="my-coins">My Coins : <span>{formatCurrency(userCoins)}</span></p>
                    <div>
                        <p className="coins-content">Coins : {formatCurrency(getPrice(data?.publishDate))}</p>
                        <button className="btn-purchase" onClick={() => { onHandleClickPurchase(data)}}>Purchase</button>
                    </div>
                </div>
            </div>
            <ToastContainer className="detail-toast">
                <Toast show={toast.show} onClose={() => { setToast({ show: false, label: ''})}} animation bg='danger' delay={1000} autohide>
                    <Toast.Body className="text-white">{toast.label}</Toast.Body>
                </Toast>
            </ToastContainer>
        </Modal>     
    )
}

export default ModalDetail;