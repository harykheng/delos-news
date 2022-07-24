import useSWR from 'swr';
import moment from 'moment';

export const useListMostViewed = (days) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${days}.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`;

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(url, fetcher)

    const mostViewedData = data?.results?.map((item) => {
        const imgContent = item?.media?.filter(img => img.type === 'image')[0];
        const imgSource = (imgContent && imgContent['media-metadata'].filter(src => src.width > 400)[0]) || null;

        return{
            title: item?.title,
            imgUrl: imgSource?.url,
            byLine: item?.byline,
            publishDate: item?.published_date,
            articleUrl: item?.url,
            abstract: item?.abstract,
            uri: item?.uri
        }
    }) || []; 

    return { data, isValidating, mostViewedData }
}

export const useListAllArticle = (days, page) => {
    const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
    const queryParams = new URLSearchParams({
        // begin_date: moment().subtract(days, 'days').format('DDMMYYYY'), -> cannot search by date from api
        // end_date: moment().format('DDMMYYYY') -> cannot search by date from api
        page
    }).toString(); 

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(`${url}${queryParams}&api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`, fetcher)

    const allArticleData = data?.response?.docs?.map((item) => {
        const imgContent = item?.multimedia?.filter(img => img.type === 'image');
        const imgSource = (imgContent?.filter(src => src.width > 400)[0]) || null;

        return{
            title: item?.headline?.main,
            imgUrl: !imgSource ? null : `https://www.nytimes.com/${imgSource?.url}`,
            byLine: item?.byline?.original,
            publishDate: item?.pub_date,
            articleUrl: item?.web_url,
            abstract: item?.abstract,
            uri: item?.uri
        }
    }) || []; 

    const pagination = { page: data?.response?.meta?.offset }

    return { data, isValidating, allArticleData, pagination }
}

export const useListMostEmailed = (days) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/emailed/${days}.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`;

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(url, fetcher)

    const mostEmailedData = data?.results?.map((item) => {
        const imgContent = item?.media?.filter(img => img.type === 'image')[0];
        const imgSource = (imgContent && imgContent['media-metadata'].filter(src => src.width > 400)[0]) || null;

        return{
            title: item?.title,
            imgUrl: imgSource?.url,
            byLine: item?.byline,
            publishDate: item?.published_date,
            articleUrl: item?.url,
            abstract: item?.abstract,
            uri: item?.uri
        }
    }) || []; 

    return { data, isValidating, mostEmailedData }
}

export const useListMostShared = (days) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/shared/${days}.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`;

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(url, fetcher)

    const mostSharedData = data?.results?.map((item) => {
        const imgContent = item?.media?.filter(img => img.type === 'image')[0];
        const imgSource = (imgContent && imgContent['media-metadata'].filter(src => src.width > 400)[0]) || null;

        return{
            title: item?.title,
            imgUrl: imgSource?.url,
            byLine: item?.byline,
            publishDate: item?.published_date,
            articleUrl: item?.url,
            abstract: item?.abstract,
            uri: item?.uri
        }
    }) || []; 

    return { data, isValidating, mostSharedData }
}