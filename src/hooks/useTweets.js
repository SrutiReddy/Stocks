import { useState, useEffect } from "react"
import stockTwitAPI from '../api/stockTwitAPI'


const useTweets = () => {
    const [symbols, setSymbols] = useState([])
    const [tweets, setTweets] = useState([])
    const [loading, setLoading] = useState(false)

    
    useEffect(() => {

        const fetchMessages = async (symbol) => {
            const { data } = await stockTwitAPI.get(`streams/symbol/${symbol}.json`)
            return data.messages;
        }

        const setUniqueTweets = (_tweets) => {
            const tweetMap = new Map();

            const uniqueTweets = _tweets.filter(tweet => {
                const t = tweetMap.get(tweet.id);
                if (t) {
                    return false
                }
                tweetMap.set(tweet.id, tweet)
                return true
            });

            setTweets(uniqueTweets)
        }

        const updateTweets = async () => {
            if (symbols.length) {
                const twts = await symbols.reduce(async (res, symbol) => {
                    const msgs = await fetchMessages(symbol)
                    return [...await res, ...msgs]
                }, [])
                setLoading(false)
                setUniqueTweets(twts)
            }
        }

        const interval = setInterval(updateTweets, 3000)

        if (!symbols.length) {
            setTweets([])
        }

        return () => clearInterval(interval)

    }, [symbols, tweets.length])

    return [symbols, setSymbols, tweets, setTweets, loading, setLoading]
}

export default useTweets