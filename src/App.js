import * as React from 'react';
import './App.css';
import './components/orderCard.js';
import data from './database/data.json';
import OrderCard from './components/orderCard.js';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { AppBar, Button, Divider, Drawer, Grid, InputAdornment, List, ListItem, ListItemText, Toolbar, TextField } from '@mui/material';

const drawerWidth = 350;
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [totalPrice, setTotalPrice] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false);
  const [orders, setOrders] = useState( //useLocalStorage("orders", true);
    localStorage.getItem("orders") === null ? [] : JSON.parse(localStorage.getItem("orders"))
  );
  const searchOrders = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value)
  }
  const handleDrawerToggle = () => { 
    setMobileOpen(!mobileOpen); 
    var newTotal = orders.reduce((total, currentValue) => 
      total = total + (currentValue["Price"] * currentValue["Quantity"]), 0
    );
    setTotalPrice(newTotal);
  };
  function removeOrder(order) {
    // console.log(orders);
    orders.splice(orders.indexOf(order), 1);
    setOrders(orders);
    localStorage.setItem("orders", JSON.stringify(orders));
    setMobileOpen(!mobileOpen);
  };
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
  useEffect(() => {
    console.log(orders);
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders])

  useState(()=>{})
  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>
            <Button onClick={handleDrawerToggle} style={{color: 'white'}}>
              Show Shopping Cart
            </Button>
            <TextField
              id="search"
              // type="search"
              label="Search"
              value={searchInput}
              onChange={searchOrders}
              sx={{ 
                width: 400, 
                input: {color: 'white'},
                outline: 'white',
                
              }}
              InputProps={{
                endAdornment: ( <InputAdornment position="end"><SearchIcon /></InputAdornment> ),
              }}
            />
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
          <Grid container spacing={1} padding={5}>
            {data && data.filter((value) => {
              if(searchInput.length > 0){ if(value.category.includes(searchInput) || value.orders.name.includes(searchInput)){ return value; }} 
              else { return value; }
              return null;
            }).map((item) =>
            <OrderCard 
              id={item.id} 
              name={item.orders.name} 
              image={item.orders.image} 
              category={item.category} 
              price={item.orders.price} 
              quantity={0} 
              callback={(operand, childData) => {
                // console.log(childData);
                var dataHasChanged = false;
                orders.forEach(function(order) {
                  console.log(order["Name"] + " AND " + childData["Name"])
                  if(order["Name"]===childData["Name"]){
                    if (operand==="add") {
                      order["Quantity"] += 1;
                      dataHasChanged = true;
                    } else if (operand==="sub") {
                      order["Quantity"] -= 1;
                      if (order["Quantity"] <= 0) {
                        orders.splice(orders.indexOf(order), 1);
                        dataHasChanged = true;
                      }
                    }
                  }
                });
                if(!dataHasChanged){
                  if(operand==="add"){
                    setOrders(orders.concat(childData));
                  }
                };
                // console.log(orders);
                localStorage.setItem("orders", JSON.stringify(orders));
                // window.location.reload();
              }}
            />)}
          </Grid>
        </div>
        
      </header>
    </div>
  );
}

export default App;
