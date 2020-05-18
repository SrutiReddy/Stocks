import React from 'react'
import { Card, CardContent, Typography, CardHeader, Avatar, makeStyles, CardActions } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
    card: {
        margin: theme.spacing(3)
    }
}))

const Tweet = ({ user, body, time }) => {
    const classes = useStyles()

    return <Card className={classes.card}>
        <CardHeader
            title={user.name}
            avatar={<Avatar alt={user.name} src={user.avatar_url} />}
        />
        <CardContent>
            <Typography>{body}</Typography>
        </CardContent>
        <CardActions>
<Typography variant='subtitle2'>{new Date(time).toLocaleTimeString() + ' ' + new Date(time).toLocaleDateString()}</Typography>
        </CardActions>
    </Card>
}

export default Tweet;