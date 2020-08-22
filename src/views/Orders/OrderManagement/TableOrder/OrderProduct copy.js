
import React, { useState } from "react";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import "./TableOrder.css";
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
const _defaultCosts = [

  {
    name: "lentille",
    price: 40,
    Volume: "25 ML"
  }
];

const OrderProduct = () => {
  const [costs, setCosts] = useState(_defaultCosts);

  const handleCostsChange = event => {
    const _tempCosts = [...costs];
    _tempCosts[event.target.dataset.id][event.target.name] = event.target.value;

    setCosts(_tempCosts);

  };

  const addNewCost = () => {
    setCosts(prevCosts => [...prevCosts, { name: "", price: 0 }]);
  };

  const getTotalCosts = () => {
    console.log(costs);
    return costs.reduce((total, item) => {
      return total + Number(item.price);

    }, 0);
  };
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);

  };
  const [products, setProducts] = React.useState('');
  const handleChangeProducts = (event) => {
    setProducts(event.target.value);

  };
  const [Volume, setVolume] = React.useState('');
  const handleChangeVolume = (event) => {
    setVolume(event.target.value);

  };
  return (
    <div className="table">
      <div className="table-title">Create new Product Orders </div>
      <div className="table-content">
        <div className="table-header">
          <div className="table-row">
            <div className="table-data">
              <div>Category</div>

            </div>
            <div className="table-data">
              <div style={{ display: 'flex' }}>Products</div>

            </div>
            <div className="table-data">
              <div>Order date</div>
            </div>
            <div className="table-data">
              <div>Quantity</div>
            </div>
            <div className="table-data">
              <div>Volume </div>
            </div>
            <div className="table-data">
              <div>Comment</div>
            </div>
          </div>
        </div>
        <div className="table-body">
          {costs.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="table-data">


                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  onChange={handleChange}
                >
                  <MenuItem value={'Product'}>Product</MenuItem>


                </Select>
              </div>
              <div className="table-data">

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"

                  onChange={handleChangeProducts}
                >
                  <MenuItem value={'Releasy'}>Releasy</MenuItem>

                </Select>

              </div>
              <div className="table-data">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker

                    id="date-picker-dialog"
                    format="MM/dd/yyyy"
                    //value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  /></MuiPickersUtilsProvider>
              </div>
              <div className="table-data">
                <TextField
                  id="outlined-number"
                  name="name"
                  type="number"

                  variant="outlined"
                //onChange={handleCostsChange}
                />


              </div>
              <div className="table-data">
                <Select
                  name="Volume"
                  data-id={index}

                  onChange={handleChangeVolume}

                >
                  <MenuItem value="25 ML">25 ML</MenuItem>
                  <MenuItem value="50 ML">50 ML</MenuItem>
                  <MenuItem value="75 ML">75 ML</MenuItem>

                  <MenuItem value="100 ML">100 ML</MenuItem>

                </Select>
              </div>
              <div className="table-data">
                <TextField
                  multiline
                  rows={2}
                  rowsMax={4}
                  name="comment"
                  data-id={index}
                  type="text"

                // onChange={handleCostsChange}
                />
              </div>
            </div>
          ))}
          <div className="table-row">
            <div className="table-data">
              <Button style={{ backgroundColor: '#04E605', position: 'absolute', color: 'white', fontSize: '30 px' }} onClick={addNewCost}>  + Add   </Button>

            </div>
          </div>

        </div>
        <div className="table-footer">
          <div className="table-row">
            <div className="table-data">

            </div>
            <div className="table-data">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProduct;
