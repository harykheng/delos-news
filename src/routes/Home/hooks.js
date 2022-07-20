import useSWR from 'swr';

export const useListMostView = (days) => {
    const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${days}.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx`;

    const fetcher = (url) => fetch(url,{
        method: "GET",
        headers: {
            "Accept": "application/json"
        },
    }).then((res) => res.json());

    const { data, error } = useSWR(url, fetcher)

    return { data, error }
}