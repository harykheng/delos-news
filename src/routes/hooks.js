import useSWR from 'swr';

export const useListMostView = (days) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${days}.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`;

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(url, fetcher)

    const mostViewData = data?.results?.map((item) => {
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
    }) || []; //todo: set loading

    return { data, isValidating, mostViewData }
}

export const useListAllArticle = () => {
    const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx';

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, isValidating } = useSWR(url, fetcher)

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
    }) || []; //todo: set loading

    return { data, isValidating, allArticleData }
}