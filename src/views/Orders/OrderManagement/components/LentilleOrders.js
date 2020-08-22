import React, { Component } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { forwardRef } from 'react';
import { saveAs } from 'file-saver';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
 import pdf from '@material-ui/icons/PictureAsPdf';
import Order from "./Order";
 import Refresh from '@material-ui/icons/Autorenew';
 import * as OrderAPI from "../api/OrderAPI"
 import DisplayOrder from './DisplayOrders'
 import { Link } from 'react-router-dom'
 import ReactDOM from 'react-dom';
 import Dialog from './Dialog';
 import { Link as RouterLink, withRouter } from 'react-router-dom';
import AddOrder from './AddOrder';
 

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    pdf: forwardRef((props, ref) => <pdf {...props} ref={ref} />)
  };
  
 class MyOrders extends Component {
state={
  columns: [
    { title: 'Order no', field: 'Orderno' ,editable: 'never' ,cellStyle: {
      backgroundColor: '#B1D9FE',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#B1D9FE',
    }},
    { title: 'Order date', field: 'Orderdate' , type :"date"},
    { title: 'Category', field: 'Category' ,lookup:  {Lenses:'Lenses'} },
    {
      title: 'Products',
      field: 'Products',
      lookup:{SkySoft:'SkySoft'}
    },
    {
      title: 'Status',
      field: 'Status',
      editable: 'never',
      lookup:{WaitingValidation:"Waiting Validation",Draft:"Draft",Validated :"Validated" ,Created:"Created",Rejected:"Rejected"},
      cellStyle: {
        backgroundColor:('yellow') ,
    }},
    {
      title: 'Comment',
      field: 'Comment',
      
    },
    { title: 'Quantity', field: 'qte', type: 'numeric' },
   
    
    { title: 'Sph', field: 'pss', lookup:  {
      '-1,00': '-1,00',  '-1,25': '-1,25','-1,50': '-1,50','-1,75': '-1,75','-2,00':'-2,00','-2,25':'-2,25','-2,50':'-2,50','-2,75':'-2,75','-3,00':'-3,00','-3,25':'-3,25','-3,50':'-3,50','-3,75':'-3,75','-4,00':'-4,00','-4,25':'-4,25','-4,50':'-4,50','-4,75':'-4,75','-5,00':'-5,00','-5,25':'-5,25','-5,50':'-5,50','-5,75':'-5,75','-6,00':'-6,00','-6,50':'-6,50','-7,00':'-7,00','-7,50':'-7,50','-8,00':'-8,00','-8,50':'-8,50','-9,00':'-9,00','-9,50':'-9,50','-10,00':'-10,00','-10,50':'-10,50','-11,00':'-11,00','-11,50':'-11,50','-12,00':'-12,00','-12,50':'-12,50','-13,00':'-13,00','-13,50':'-13,50','-14,00':'-14,00','-14,50':'-14,50','-15,00':'-15,00','-15,50':'-15,50','-16,00':'-16,00'}},
  ],
  data: [],
  selectedRow: null,
  Orderdate: "",
  Category:"",
  Products:"",
  Status:"",
  Comment:"",
  qte:0,
  pss:0,
  order:"",
  selectedorderpdf:{}

}
componentDidMount(){
  this.getOrders();

}


createAndDownloadPdf = (orderno) => {

  axios.post('http://localhost:4000/create-pdfLentille',{ id:orderno})
    .then(() => axios.get('http://localhost:4000/fetch-pdfLentille', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'commandeLentille0000'+orderno+'.pdf');
    })
}

getOrders= _ =>{
  const userId = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/ordersLentille/list/'+userId.id )
  .then(response=>response.json())
  .then(response=>this.setState({data:response.data}))
  .catch(err=>console.error(err))
}
  render(){
   

  return (
    <MaterialTable
    icons={tableIcons}
      title="Lenses Orders"
      columns={this.state.columns}
      data={this.state.data}
      
      actions={[
        {icon: Refresh,
            tooltip: 'Refresh',
            isFreeAction: true,
            onClick: () => window.location.reload(false)
          },
           
       {
          icon: pdf,
          tooltip: 'Download Pdf',
          onClick: ( event,rowData) =>this.createAndDownloadPdf(rowData.Orderno)
           
     }
    , 
    {
      icon: Check,
      tooltip: 'submitted',
      onClick: (event, rowData) =>OrderAPI.updateStatus(rowData.Orderno,"Lentille")
       
 }
    ]}
      editable={{
       /* onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              this.setState(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });

              this.setState({Orderdate:newData.Orderdate});
              this.setState({Category:newData.Category});
              this.setState({Products:newData.Products});
              this.setState({Status:"Draft"});
              this.setState({Comment:newData.Comment});
              this.setState({qte:newData.qte});
              this.setState({pss:newData.pss});
              
              // console.info(this.state.order);
              const userId = JSON.parse(localStorage.getItem('user'));
              OrderAPI.sendCreate(this.state.Orderdate,this.state.Category,this.state.Products,"Draft",this.state.Comment,this.state.qte,this.state.pss,"Lentille",userId.id);
                 
              window.location.reload(false)
            }, 600);
          }),*/
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
             
              if (oldData) {
                this.setState(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
              this.setState({Orderdate:newData.Orderdate});
              this.setState({Category:newData.Category});
              this.setState({Products:newData.Products});
              this.setState({Status:newData.Status});
              this.setState({Comment:newData.Comment});
              this.setState({qte:newData.qte});
              this.setState({pss:newData.pss});
              OrderAPI.sendUpdate(this.state.Orderdate,this.state.Category,this.state.Products,this.state.Status,this.state.Comment,this.state.qte,this.state.pss, newData.Orderno,"Lentille");
              window.location.reload(false)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              
              OrderAPI.sendDelete(oldData.Orderno,"Lentille");
              window.location.reload(false);
              this.setState(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                
                return { ...prevState, data };
              }
              
              
              );
            }, 600);
          }),
          
          
        }}
        
        onRowClick={((evt, selectedRow) =>  
          //todo Dialog 
         console.log( JSON.parse(localStorage.getItem('user')))
         
          
          )}
        

      options={{
        
        headerStyle: {
          backgroundColor: '#82BFE8',
          color: '#FFF'
        },
       // exportButton: true,
        filtering: true,
        grouping: true,
        sorting: true,
        
        rowStyle: rowData => (

            //console.log(rowData.Comment),
          {
        
         // backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#C7CFDE' : '#FFF'
    
        })
      }}
      
    />
    
  );
  
}

 }
 export default MyOrders;