import * as React from 'react';
import './App.css';
import './components/orderCard.js';
import OrderCard from './components/orderCard.js';
import { useState } from 'react';
import { 
  AppBar,
  Button,
  Divider,
  Drawer, 
  Grid,
  List, ListItem, ListItemText,
  Toolbar,
} from '@mui/material';
import data from './database/data.json';

const drawerWidth = 350;
function App() {
  // console.warn = () => {};
  const [totalPrice, setTotalPrice] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const handleDrawerToggle = () => { 
    setMobileOpen(!mobileOpen); 
    var newTotal = orders.reduce((total, currentValue) => 
      total = total + (currentValue["Price"] * currentValue["Quantity"]), 0
    );
    setTotalPrice(newTotal);
  };

  function removeOrder(order) {
    // console.log(order);
    orders.splice(orders.indexOf(order), 1);
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <List>
        <ListItem>
          <ListItemText><h3>Shopping Cart</h3></ListItemText>
          <ListItemText><h3>Total: {
            totalPrice
          }</h3></ListItemText>
        </ListItem>
        <Divider />
        {/* {console.log(orders)} */}
        {//key={data} 
          orders && orders.sort((a, b) => a["ID"] - b["ID"]).map((data) => (
            <ListItem> 
              <ListItemText primary={data["Name"] + " x" + data["Quantity"]} />
              <ListItemText primary={"Total: $" + (data["Price"] * data["Quantity"])} />
              <ListItemText primary={<Button onClick={() => removeOrder(data)}>Delete</Button>}/>
            </ListItem>
          ))
        }
      </List>
      <Divider />
    </div>
  );
  // const container = window !== undefined ? () => window().document.body : undefined;
  
  

  useState(()=>{})
  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="fixed" sx={{ ml: { sm: `${drawerWidth}px` }, }}>
          <Toolbar>
            <Button onClick={handleDrawerToggle} size={'large'} style={{color: 'white'}}>
              Show Shopping Cart
            </Button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        {/* <p>The Card(s) below should Read from the local data.json file.</p>
        <br></br> */}
        <div>
          <Grid container spacing={2} padding={2}>
            {data && data.map((item) =>
            <OrderCard 
              id={item.id} 
              name={item.orders['name']} 
              image={item.orders['image']} 
              category={item.category} 
              price={item.orders['price']} 
              quantity={0} 
              callback={(operand, childData) => {
                // console.log(childData);
                var dataHasChanged = false;
                
                orders.forEach(function(order) {
                  if(order["Name"]===childData["Name"]){
                    if (operand==="add") {
                      order["Quantity"] += 1;
                    } else if (operand==="sub") {
                      order["Quantity"] -= 1;
                      if (order["Quantity"] <= 0) {
                        orders.splice(orders.indexOf(order), 1);
                      }
                    }
                    dataHasChanged = true;
                  }
                })
                if(!dataHasChanged){
                  setOrders(orders.concat(childData));
                }
                // console.log(orders);
              }}
            />)}
          </Grid>
        </div>
        
      </header>
    </div>
  );
}

export default App;
