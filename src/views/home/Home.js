import React from 'react'
import Grid from '@material-ui/core/Grid'
import SearchBar from '../../components/SearchBar'
import Tweet from '../../components/Tweet'
import { makeStyles, Chip, Typography, CircularProgress, Avatar } from '@material-ui/core'
import useTweets from '../../hooks/useTweets'


const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(3)
    }
}))

const Home = () => {
    const classes = useStyles()
    const [symbols, setSymbols, tweets, setTweets, loading, setLoading] = useTweets()

    const getCount = (symbol) => {
        let count = 0
        tweets.map(_t => { return count += _t.symbols.some(sym => sym.symbol === symbol) ? 1 : 0 })
        return count
    }

    const filterTweets = () => {
        const filteredTweets = tweets.filter(tweet => tweet.symbols.some(s => symbols.includes(s.symbol)))
        setTweets(filteredTweets)
    }

    const addSymbol = (symbol) => {
        if (!symbols.includes(symbol.toUpperCase())) {
            setLoading(true)
            setSymbols([...symbols, symbol.toUpperCase()])
        }
    }

    const removeSymbol = (symbol) => {
        const _symbols = symbols.slice()
        _symbols.pop(symbol)
        setSymbols(_symbols)
        filterTweets()
    }

    const sortedTweets = tweets.sort((t1, t2) => new Date(t2.created_at) - new Date(t1.created_at))

    return <Grid container direction='column' justify='center' alignItems='center' className={classes.container} >
        <Grid item xs={12} sm={10} md={8}>
            <SearchBar addSymbol={addSymbol} />
        </Grid>
        <Grid item xs={12} sm={10} md={8}>
            {
                symbols.map(symbol =>
                    <Chip
                        key={symbol}
                        avatar={<Avatar>{getCount(symbol)}</Avatar>}
                        label={symbol}
                        onDelete={() => removeSymbol(symbol)}
                    />
                )
            }
        </Grid>
        <Grid item xs={12} sm={10} md={8} className={classes.container}>
            <Grid container justify='center' alignItems='stretch'>
                <Grid item xs={12}>
                    {
                        sortedTweets.map(tweet =>
                            <Tweet key={tweet.id} user={tweet.user} body={tweet.body} time={tweet.created_at} />
                        )
                    }
                    {
                        tweets.length === 0 && <Typography gutterBottom>Add a symbol using the input field to view tweets</Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
        <Grid container justify='center' alignItems='center' className={classes.container}>
            {
                loading && <CircularProgress color='secondary' />
            }
        </Grid>
    </Grid>
}

export default Home;