import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    CardHeader, 
    CardMedia,
    Grid,
    Typography 
} from '@mui/material';
import { 
    useState, 
    // setState 
} from 'react';
// import App from '../App';

function OrderCard({ id=0, image="", name="", category="", price=0, quantity=0, callback=null }) {
    // const [id, setId] = useState("");
    // const [name, setName] = useState("");
    // const [image, setImage] = useState("");
    // const [category, setCategory] = useState("");
    // const [price, setPrice] = useState("");
    const [currQuantity, setQuantity] = useState(0);
    const subQuantity = () => { 
        if(!currQuantity-1 < 0) {
            setQuantity(parseInt(currQuantity)-1);
            callback("sub", {
                "ID": id,
                "Name": name,
                "Price": price,
                "Quantity": 1
            });
        }
    }
    const addQuantity = () => { 
        setQuantity(parseInt(currQuantity)+1);
        callback("add", {
            "ID": id,
            "Name": name,
            "Price": price,
            "Quantity": 1
        });
    }

    // this.setState((prevState, props) => ({
    //     quantity: quantity + 1
    // })) 

    return (
        <Grid item xs={2} sm={2} md={2} key={id}>
            <br></br>
            <Card>
                <CardMedia sx={{height: 150, width: 300}} image={image} title={name}/>
                <CardHeader title={name} subheader={category}/>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">Price: ${price}</Typography>
                    {/* <Typography variant="body2" color="text.secondary">Quantity: {currQuantity}</Typography> */}
                </CardContent>
                <CardActions>
                    <Button onClick={addQuantity} size="small" color="primary">Add</Button>
                    <Button onClick={subQuantity} size="small" color="primary">Subtract</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default OrderCard;