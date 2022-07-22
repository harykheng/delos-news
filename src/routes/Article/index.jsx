import React, { useEffect, useState, } from "react";
import moment from "moment";
import { Container, Row, Col, Modal, Pagination, Toast, ToastContainer } from 'react-bootstrap';

import { useListMostView, useListAllArticle } from '../hooks';

import { getPrice } from '../../helpers/getPrice';
import { formatCurrency } from '../../helpers/currency';

import loading from '../../assets/loading.gif';
import closeIcon from '../../assets/close.png';
import noPhoto from '../../assets/no-photo-available.png';

import DropdownPeriod from '../../components/DropdownPeriod'

import './styles.scss';

const Article = () => {
    const [showModal, setShowModal] = useState(false)
    const [toast, setToast] = useState({show: false, label: ''})
    const [modalData, setModalData] = useState({});
    const [choicePeriod, setChoicePeriod] = useState({label: '1', value: 1});

    const [listArticle, setListArticle] = useState({ label: 'All Article', data: []});

    const myOrder = localStorage.getItem('myOrder', []);
    const userCoins = localStorage.getItem('userCoins');

    const { mostViewData } = useListMostView(choicePeriod.value);
    const { allArticleData } = useListAllArticle();

    useEffect(() => {
        if(listArticle.label === 'Most Viewed'){
            setListArticle({
                label: 'Most Viewed',
                data: mostViewData
            });
        }
    }, [choicePeriod.value])

    useEffect(() => {
        setListArticle({ 
            label: 'All Article', 
            data: allArticleData
        })
    }, [allArticleData.length > 0])

    const handleClickMostViewed = () => {
        setListArticle({
            label: 'Most Viewed',
            data: mostViewData
        });
    }

    const handleClickAllArticle = () => {
        setListArticle({
            label: 'All Article', 
            data: allArticleData
        });
    }


    const handleClickPurchase = (data) => {
        const parseMyOrder = JSON.parse(myOrder);
        let myOrderList = !parseMyOrder ? [] : parseMyOrder; 

        const checkingSameArticle = myOrderList.filter(item => item.uri === data.uri)

        const bookPrice = getPrice(data?.publishDate);
        const balance = parseInt(userCoins) - parseInt(bookPrice);

        if(checkingSameArticle.length > 0){
            console.log('masuk sini')
            setToast({ show: true, label: 'You have this article'})
            return;
        }
        if(balance >= 0 && myOrderList.length <= 5) {
            let myOrderList = !parseMyOrder ? [] : parseMyOrder; 
            myOrderList.push(data);
            
            localStorage.setItem('myOrder', JSON.stringify(myOrderList));
            localStorage.setItem('userCoins', balance);

            setShowModal(false);

            return;
        }
        
        setToast({ show: true, label: 'Not enough money'})
    }

    console.log(mostViewData)

    return(
        <>
            <div className="delos-article">
                <div className="header">
                    <h2 className="header-title">List Article</h2>
                </div>
                <div className="body">
                    <Container >
                        <Row>
                            <Col className="article-section emailed">
                                <button className="btn-article" onClick={handleClickAllArticle}>All Articles</button>
                            </Col>
                            <Col className="article-section emailed">
                                <button className="btn-article">Most Emailed</button>
                            </Col>
                            <Col className="article-section shared">
                                <button className="btn-article">Most Shared</button>
                            </Col>
                            <Col className="article-section viewed">
                                <button className="btn-article" onClick={handleClickMostViewed}>Most Viewed</button>
                            </Col>
                        </Row>
                    </Container>
                    {allArticleData.length === 0 ? <img src={loading} alt=""/> :
                    <div className="list-article">
                        <h2>{listArticle?.label}</h2>
                        <DropdownPeriod data={choicePeriod} onChange={setChoicePeriod}/>
                        <Container >
                            {listArticle?.data?.map((item, index) => {
                                return(
                                    <Row key={`article-row-${index}`} className="row-section" data-hover="View Detail" onClick={() => {setShowModal(true); setModalData(item)}}>
                                        <Col className="content-article" md="auto">
                                            <i>{moment(item?.publishDate).format('DD MMMM YYYY')}</i>
                                        </Col>
                                        <Col className="content-article">
                                            <span>{item?.title}</span>
                                        </Col>
                                        <Col className="content-article" md="auto">
                                            <p className="price-article">{formatCurrency(getPrice(item?.publishDate))}</p>
                                        </Col>
                                    </Row>
                                )
                            })}
                        </Container>
                    </div>
                    }
                </div>
                <Modal show={showModal} centered size="xl">
                    <div className="detail-article">
                        <img src={closeIcon} alt="" className="btn-close" onClick={() => {setShowModal(false);}}/>
                        <h2 className="detail-content">{modalData?.title}</h2>
                        <p className="detail-content">{modalData?.abstract}</p>
                        <hr />
                        <img src={!modalData?.imgUrl ? noPhoto : modalData?.imgUrl} alt="" className="detail-img"/>
                        <div className="detail-content author">
                            <i>{modalData?.byLine}</i> / <span>{moment(modalData?.publishDate).format('DD MMMM YYYY')}</span>
                        </div>
                        <p className="coins-content">Coins : {formatCurrency(getPrice(modalData?.publishDate))}</p>
                        <button className="btn-purchase" onClick={() => { handleClickPurchase(modalData)}}>Purchase</button>
                    </div>
                    <ToastContainer position="middle-center">
                        <Toast show={toast.show} onClose={() => { setToast({ show: false, label: ''})}} animation bg='danger' delay={1000} autohide>
                            <Toast.Body className="text-white">{toast.label}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Modal>                
            </div>
        </>
    )
}

export default Article;