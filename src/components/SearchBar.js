import React, { useState } from 'react'
import { Paper, InputBase, makeStyles, IconButton } from '@material-ui/core'
import Add from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: '100%',
        margin: theme.spacing(3)
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    }
}))

const SearchBar = ({ addSymbol }) => {
    const classes = useStyles()
    const [symbol, setSymbol] = useState('')

    return <Paper
        component='form'
        className={classes.root}
        onSubmit={(e) => {
            e.preventDefault()
            symbol !== '' && addSymbol(symbol)
        }}>
        <InputBase className={classes.input}
            placeholder='Symbol'
            name='symbol'
            value={symbol}
            onChange={(e) => {
                e.persist();
                setSymbol(e.target.value)
            }}
        />
        <IconButton onClick={() => symbol !== '' && addSymbol(symbol)} >
            <Add />
        </IconButton>
    </Paper>
}

export default SearchBar