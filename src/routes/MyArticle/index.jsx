import React from "react";
import moment from "moment";
import { Container, Row, Col } from 'react-bootstrap';

import './styles.scss';

import noPhoto from '../../assets/no-photo-available.png'
import noOrder from '../../assets/empty-order.png'


const MyArticle = () => {
    const myOrder = JSON.parse(localStorage.getItem('myOrder'));

    return(
        <>
            <div className="delos-my-article">
                    <div className="header">
                        <h2 className="header-title">My Article</h2>
                    </div>
                    <div className="body">
                    {!myOrder 
                        ? <div className="no-order">
                            <img src={noOrder} alt=""/>
                            <p>Dont Have Article :(</p>
                          </div>
                        : <Container fluid>
                            {myOrder.map((item, index) => {
                                return (
                                    <>
                                        <Row key={index} onClick={() => { window.open(item?.articleUrl, '_blank')}} className="my-article-row">
                                            <Col className="left-section" md="auto">
                                                <img src={item.imgUrl ? item.imgUrl : noPhoto} className="img-article" alt=""/>
                                            </Col>
                                            <Col className="right-section">
                                                <h2>{item.title}</h2>
                                                <p>{item.abstract}</p>
                                                <div className="content-author">
                                                    <span className="separator"/> 
                                                    <i>{item.byLine}</i>
                                                </div>
                                                <div className="publish-date">
                                                    <span>{moment(item.publishDate).format('DD MMMM YYYY')}</span>
                                                </div>
                                            </Col>
                                        </Row>
                                        <hr />
                                    </>
                                )
                            })}
                        </Container>}
                    </div>
            </div>
        </>
    )
}

export default MyArticle;