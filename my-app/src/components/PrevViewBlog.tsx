import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, CardActionArea, Button } from '@material-ui/core/';
import { useStyles } from '../styles/PrevViewBlogStyle';

interface Props {
    title: string,
    contentText: string
    style: {
        margin: string,
    }
    img: string[] | string
}

export default function PrevViewBlog({ title, contentText, style, img }: Props): JSX.Element {
    const classes = useStyles();
    return (
        <Card className={classes.root} style={style}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={typeof img === 'string' ? img : img[0]}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {contentText.length > 150 ? contentText.substring(0, 150) + '...' : contentText}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Compartir
                </Button>
                <Button size="small" color="primary">
                    Leer Mas
                </Button>
            </CardActions>
        </Card>
    );
}