  
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
 
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import MyOrders from './MyOrders'
 

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
 
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  
 
   
}));



 

export default function GeneralInformation() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleChange = () => {
    setChecked(prev => !prev);
  };
  
  return (
    <React.Fragment>
      <CssBaseline />
    
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            General information
          </Typography>
         
          <React.Fragment>
            
              <React.Fragment>
              <AddressForm />
                <div className={classes.buttons}>
                  
                  <Button
                    variant="contained"
                    color="primary"
                     
                    className={classes.button}
                  >
                   Commander
                  </Button>
                  <FormControlLabel
                   className={classes.button}
          control={
            <Switch checked={checked} onChange={handleChange} />
          }
          label=" My orders"
        />
                </div>
               

              </React.Fragment>
            
          </React.Fragment>
        </Paper>
      
      </main>
      <div >
        <Zoom in={checked}>
          <div elevation={20} className={classes.paper}>
         <MyOrders></MyOrders>
          </div>
        </Zoom>
        </div>

    </React.Fragment>
  );
}