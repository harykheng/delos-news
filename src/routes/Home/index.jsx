
import React from "react";
import { useListMostView } from './hooks';
import { oddOrEven } from '../../helpers/oddOrEven';

import logoDelos from '../../assets/logo-delos-horizontal-white.png';
import noPhoto from '../../assets/no-photo-available.png';

import './styles.scss';

const Home = () => {

    const { data: listMostView } = useListMostView(1);


    console.log(oddOrEven(2))

    const renderTitle = (item) => {
        return(
            <section className="content-body">
                <h1>{item?.title}</h1>
                <p className="content-abstract">{item?.abstract}</p>
                <div className="content-author">
                    <span className="separator"/> 
                    <i>{item?.byline}</i>
                </div>
                <button className="btn-read-more" onClick={() => { window.open(item?.url, '_blank')}}>Read More</button>
            </section>
        )
    }

    return (
        <div className="delos-home">
            <div className="header">
                <img src={logoDelos} alt="" />
                <h2 className="header-title">Delos News</h2>
                <div class="typewriter">
                    <h3>Premium Article Shopping</h3>
                </div>
            </div>
            <div className="body">
                {listMostView?.results.map((item,index) => {
                    if(index > 1 && index < 7) {
                        const imgContent = item.media.filter(img => img.type === 'image')[0];
                        const imgSource = (imgContent && imgContent['media-metadata'].filter(src => src.width > 400)[0]) || null;
                        const isImgNotFound = imgSource?.url ? imgSource.url : noPhoto;
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
    );
};

export default Home;