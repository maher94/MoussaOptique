import { Component } from "react";
import React from 'react';
import { Paper, Button } from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddBox from '@material-ui/icons/AddBox';
import Container from '@material-ui/core/Container';
import Zoom from '@material-ui/core/Zoom';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import OrderLenses from '../TableOrder/OrderLenses'
import OrderProduct from '../TableOrder/OrderProduct'
import axios from 'axios';
import authHeader from 'services/auth-header';
import { Link as RouterLink, withRouter } from 'react-router-dom';
class AddOrder extends Component {
   state = {
      data: [],
      setChecked: "",
      like: 0,
      checked: false,
      checkedLenses: false,
      checkedProduct: false,
      userNamesession: JSON.parse(localStorage.getItem('username')),
      firstName: ""
   }
   handleChange = () => {
      this.state == false ? this.setState({ checked: false }) : this.setState({ checked: true })
   };
   handleChangeLenses = () => {
      this.state == false ? this.setState({ checkedLenses: false }) : this.setState({ checkedLenses: true })
   };
   handleChangeProduct = () => {
      this.state == false ? this.setState({ checkedProduct: false }) : this.setState({ checkedProduct: true })
   };
   componentDidMount() {
      this.getUserDetails();
   }
   getUserDetails = _ => {
      const userNamesession = JSON.parse(localStorage.getItem('user'));
      fetch('http://localhost:4000/api/user/listByUsername/' + userNamesession.username)
         .then(response => response.json())
         .then(response => this.setState({ data: response.data }))
         .catch(err => console.error(err))
   }
   saveChangedInformation (FirstName, LastName, city, PhoneNumber, Adresse, Adresse2, country, PostalCode) {
      const userNamesession = JSON.parse(localStorage.getItem('user'));

      const baseUrl = "http://localhost:4000/api/user/updateProfile/" + userNamesession.id
      const datapost = {
        FirstName: FirstName,
        LastName: LastName,
        PhoneNumber: PhoneNumber,
        Adresse: Adresse,
        Adresse2: Adresse2,
        Country: country,
        PostalCode: PostalCode,
        city:city
      }
  
      axios.post(baseUrl, datapost, { headers: authHeader() })
        .then(response => {
          if (response.data.success) {
            alert(response.data.message)
            window.location.reload(false)
  
          }
          else {
            alert("Error when updating data")
  
          }
        })
        .catch(error => {
          alert(error)
          console.log(error)
        })
      
   }


   render() {
      return (
         <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" style={{ padding: 50 }}>
               <Paper style={{ padding: 60 }}>
                  <Typography variant="h6" gutterBottom>
                     General Information
         </Typography>
                  <Grid container spacing={2}>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (

                              <TextField
                                 required
                                 id="firstName"
                                 name="firstName"
                                 label=" First Name"
                                 fullWidth
                                 defaultValue={client.FirstName}
                                 autoComplete="fname"
                                 error={client.FirstName!=null && client.FirstName!=''?false:true}
                              ></TextField>
                           );
                        })}
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="lastName"
                                 name="lastName"
                                 label="Last Name"
                                 defaultValue={client.LastName}
                                 fullWidth
                                 autoComplete="lname"
                                 error={client.LastName!=null && client.LastName!=''?false:true}
                              />
                           );
                        })}
                     </Grid>
                     <Grid item xs={12}sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="email"
                                 name="email"
                                 defaultValue={client.email}
                                 label="Email"
                                 fullWidth
                                 disabled
                                 error={client.email!=null && client.email!=''?false:true}
                              ></TextField>
                           );
                        })}
                     </Grid>
                   
                     <Grid item xs={12}sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="address1"
                                 name="address1"
                                 defaultValue={client.Adresse}
                                 label="Address Line 1"
                                 fullWidth
                                 autoComplete="billing address-line1"
                                 error={client.Adresse!=null && client.Adresse!=''?false:true}
                              ></TextField>
                           );
                        })}
                     </Grid>
                     <Grid item xs={12}>
                     {this.state.data.map(function (client) {
                           return (
                        <TextField
                           id="address2"
                           name="address2"
                           label="Address line 2"
                           fullWidth
                           autoComplete="billing address-line2"
                          
                        />
                        );
                     })}
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="city"
                                 name="city"
                                 label="City"
                                 defaultValue={client.city}
                                 fullWidth
                                 autoComplete="billing address-level2"
                                 error={client.city!=null && client.city!=""?false:true}
                                 
                              />
                           );
                        })}
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField required id="phoneNumber" name="phoneNumber" label="Phone Number" fullWidth defaultValue={client.PhoneNumber}  error={client.PhoneNumber!=null && client.PhoneNumber!=''?false:true} />
                           );
                        })}
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="zip"
                                 name="zip"
                                 label="Postal code"
                                 fullWidth
                                 defaultValue={client.PostalCode}
                                 autoComplete="billing postal-code"
                                 error={client.PostalCode!=null && client.PostalCode!=""?false:true}
                              />
                           );
                        })}
                     </Grid>
                     <Grid item xs={12} sm={6}>
                        {this.state.data.map(function (client) {
                           return (
                              <TextField
                                 required
                                 id="country"
                                 name="country"
                                 label="Country"
                                 fullWidth
                                 defaultValue={client.Country}
                                 autoComplete="billing country"
                                 error={client.Country!=null && client.Country!=""?false:true}
                              />
                           );
                        })}
                     </Grid>
                  </Grid>
                  <br></br>
                  <br></br>
                  <br></br>

                  <div style={{
                     height: '42px',
                     display: 'flex',
                     alignItems: 'center',
                     marginTop: 1
                  }}>
                     <span style={{ flexGrow: 1 }} />
                     <Button
                        variant="contained"
                        size="large"
                        style={{
                           backgroundColor: '#04E605',
                           boxShadow: 'none',
                        }}
                        startIcon={
                           <SaveIcon />
                        }
                        onClick={() => this.saveChangedInformation(document.getElementById('firstName').value, document.getElementById('lastName').value, document.getElementById('city').value, document.getElementById('phoneNumber').value, document.getElementById('address1').value, document.getElementById('address2').value, document.getElementById('country').value, document.getElementById('zip').value)}
                        >Save</Button>
                  </div>
               </Paper>

            </Container>
            <Container maxWidth="lg" style={{ paddingLeft: 30, paddingRight: 30 }}>
               <Paper style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Container maxWidth="lg" >
                     <div style={{
                        height: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 1
                     }}>
                        <span style={{ flexGrow: 1 }} />
                        <Button
                           variant="contained"
                           size="large"
                           style={{
                              borderColor: '#0063cc', font: '#0069d9',
                              borderColor: '#0062cc',
                              boxShadow: 'none',
                           }}
                           startIcon={
                              <AddBox />
                           }
                           onClick={() => this.handleChange()}
                        >ADD</Button>
                     </div>
                  </Container>
               </Paper>
               <Zoom in={this.state.checked}>
                  <Paper style={{ paddingTop: 10, paddingBottom: 10 }}>
                     <Container maxWidth="xs" >
                        <div style={{
                           height: '42px',
                           display: 'flex',
                           alignItems: 'center',
                           marginTop: 1
                        }}>
                           <span style={{ flexGrow: 1 }} />
                           <Button
                              variant="contained"
                              size="large"
                              style={{
                                 borderColor: '#0063cc', font: '#0069d9',
                                 borderColor: '#0062cc',
                                 boxShadow: 'none',
                              }}
                              startIcon={
                                 <AddBox />
                              }
                              onClick={() => this.handleChangeLenses()}
                           >ADD Lenses</Button>
                           <Button
                              variant="contained"
                              size="large"
                              style={{
                                 borderColor: '#0063cc', font: '#0069d9',
                                 borderColor: '#0062cc',
                                 boxShadow: 'none',
                              }}
                              startIcon={
                                 <AddBox />
                              }
                              onClick={() => this.handleChangeProduct()}
                           >ADD Product</Button>
                        </div>
                     </Container>
                  </Paper>
               </Zoom>

               <Zoom in={this.state.checkedLenses}>
                  <div elevation={20} >
                     <OrderLenses></OrderLenses>
                     <br></br>
                  </div>
               </Zoom>
               <br></br><br></br>
               <Zoom in={this.state.checkedProduct}>
                  <div elevation={20} >
                     <OrderProduct></OrderProduct>
                     <br></br>
                  </div>
               </Zoom>
            </Container>
         </React.Fragment>
      )
   }
}
export default AddOrder;