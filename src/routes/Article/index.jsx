import React, { useEffect, useState, } from "react";
import moment from "moment";
import { Container, Row, Col } from 'react-bootstrap';

import { useListMostViewed, useListAllArticle, useListMostEmailed, useListMostShared } from '../hooks';

import { getPrice } from '../../helpers/getPrice';
import { formatCurrency } from '../../helpers/currency';

import loading from '../../assets/loading.gif';
import DropdownPeriod from '../../components/DropdownPeriod'
import ModalDetail from "../../components/ModalDetail";
import PaginationArticle from "../../components/PaginationArticle";

import './styles.scss';

const Article = () => {
    const [showModal, setShowModal] = useState(false)
    const [toast, setToast] = useState({show: false, label: ''})
    const [modalData, setModalData] = useState({});
    const [choicePeriod, setChoicePeriod] = useState({label: '1', value: 1});
    const [page, setPage] = useState(0);

    const [listArticle, setListArticle] = useState({ label: 'All Article', data: []});

    const myOrder = localStorage.getItem('myOrder', []);
    const userCoins = localStorage.getItem('userCoins');
    const freeItem = localStorage.getItem('freeItem', 0)
    const luckyTicket = localStorage.getItem('luckyTicket', 0)

    const { mostViewedData, isValidating: loadingMostViewed } = useListMostViewed(choicePeriod.value);
    const { mostEmailedData, isValidating: loadingMostEmailed } = useListMostEmailed(choicePeriod.value);
    const { mostSharedData, isValidating: loadingMostShared } = useListMostShared(choicePeriod.value);
    const { allArticleData, isValidating: loadingAllArticle, pagination } = useListAllArticle(choicePeriod.value, page);

    useEffect(() => {
        if(listArticle.label === 'Most Viewed'){
            setListArticle({
                label: 'Most Viewed',
                data: mostViewedData
            });
            return;
        }
        if(listArticle.label === 'All Article'){
            setListArticle({
                label: 'All Article', 
                data: allArticleData
            });
            return;
        }
        if(listArticle.label === 'Most Emailed'){
            setListArticle({
                label: 'Most Emailed', 
                data: mostEmailedData
            });
            return;
        }
        if(listArticle.label === 'Most Shared'){
            setListArticle({
                label: 'All Article', 
                data: mostSharedData
            });
            return;
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!loadingMostViewed && !loadingAllArticle && !loadingMostEmailed && !loadingMostShared])

    const handleClickCategory = (label, data) => () => {
        setListArticle({ label, data });
    }

    const handleClickPurchase = (data) => {
        const parseMyOrder = JSON.parse(myOrder);
        let myOrderList = !parseMyOrder ? [] : parseMyOrder; 

        const checkingSameArticle = myOrderList.filter(item => item.uri === data.uri)

        const bookPrice = getPrice(data?.publishDate);
        const balance = parseInt(userCoins) - parseInt(bookPrice);

        if(balance === parseInt(userCoins)){
            if(freeItem === '5'){
                setToast({ show: true, label: 'You can only purchase 5 free articles'})
                return;
            }

            localStorage.setItem('freeItem', parseInt(freeItem)+1)
        }

        if(checkingSameArticle.length > 0){
            setToast({ show: true, label: 'You have this article'})
            return;
        }

        if(balance >= 0) {
            if(parseInt(bookPrice) === 50000){
                localStorage.setItem('luckyTicket',  parseInt(luckyTicket)+3);
            }
            
            let myOrderList = !parseMyOrder ? [] : parseMyOrder; 
            myOrderList.push(data);
            
            localStorage.setItem('myOrder', JSON.stringify(myOrderList));
            localStorage.setItem('userCoins', balance);
            localStorage.setItem('totalSpend',  parseInt(bookPrice));

            setShowModal(false);

            return;
        }
        
        setToast({ show: true, label: 'Not enough money'})
    }

    console.log(page)

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
                                <button className="btn-article" onClick={handleClickCategory('All Articles', allArticleData)}>All Articles</button>
                            </Col>
                            <Col className="article-section emailed">
                                <button className="btn-article" onClick={handleClickCategory('Most Emailed', mostEmailedData)}>Most Emailed</button>
                            </Col>
                            <Col className="article-section shared">
                                <button className="btn-article" onClick={handleClickCategory('Most Shared', mostSharedData)}>Most Shared</button>
                            </Col>
                            <Col className="article-section viewed">
                                <button className="btn-article" onClick={handleClickCategory('Most Viewed', mostViewedData)}>Most Viewed</button>
                            </Col>
                        </Row>
                    </Container>
                    
                    <div className="list-article">
                        <h2>{listArticle?.label}</h2>
                        <DropdownPeriod data={choicePeriod} onChange={setChoicePeriod}/>
                        {listArticle?.data?.length < 1 ? <img src={loading} alt=""/> :
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
                        }
                        <div className="list-pagination">
                            <PaginationArticle page={pagination.page} onClickPagination={setPage}/>
                        </div>
                    </div>

                    
                </div>
                <ModalDetail 
                    show={showModal}
                    onClose={() => {setShowModal(false);}}
                    data={modalData}
                    onHandleClickPurchase={handleClickPurchase}
                    toast={toast}
                    setToast={setToast}
                    userCoins={userCoins}
                />
            </div>
        </>
    )
}

export default Article;