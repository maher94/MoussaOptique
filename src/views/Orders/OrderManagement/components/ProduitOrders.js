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
 import authHeader from 'services/auth-header';

 

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
  
 class ProduitOrders extends Component {
state={
  columns: [
    { title: 'Order no', field: 'Orderno' ,editable: 'never' ,cellStyle: {
      backgroundColor: '#049A94',
      color: '#FFF'
    },
    headerStyle: {
      backgroundColor: '#049A94',
    }},
    { title: 'Order date', field: 'Orderdate' , type :"date"},
    { title: 'Category', field: 'Category' ,lookup:  {Product:'Product'} },
    {
      title: 'Products',
      field: 'Products',
      lookup:{Releasy:'Releasy'}
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
   
    
    { title: 'volume', field: 'volume', lookup:  {
      '25 ML':'25 ML','50 ML':'50 ML','75 ML':'75 ML','100 ML':'100 ML'}},
  ],
  data: [],
  selectedRow: null,
  Orderdate: "",
  Category:"",
  Products:"",
  Status:"",
  Comment:"",
  qte:0,
  volume:"",
  order:"",
  selectedorderpdf:{}

}
componentDidMount(){
  this.getOrders();
  

}


createAndDownloadPdf = (orderno) => {

  axios.post('http://localhost:4000/create-pdfProduit',{ id:orderno})
    .then(() => axios.get('http://localhost:4000/fetch-pdfProduit', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'commandeProduit0000'+orderno+'.pdf');
    })
}

getOrders= _ =>{
  const userId = JSON.parse(localStorage.getItem('user'));
  fetch('http://localhost:4000/ordersProduit/list/' +userId.id,{ headers: authHeader() } )
  .then(response=>response.json())
  .then(response=>this.setState({data:response.data}))
  .catch(err=>console.error(err))
}
  render(){
   

  return (
    <MaterialTable
    icons={tableIcons}
      title="Product Orders"
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
      onClick: (event, rowData) =>OrderAPI.updateStatus(rowData.Orderno,"Produit")
       
 }
    ]}
      editable={{
      /*  onRowAdd: newData =>
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
              this.setState({volume:newData.volume});
              const userId = JSON.parse(localStorage.getItem('user'));
              // console.info(this.state.order);
              OrderAPI.sendCreate(this.state.Orderdate,this.state.Category,this.state.Products,"Draft",this.state.Comment,this.state.qte,this.state.volume,"Produit",userId.id);
                 
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
              this.setState({volume:newData.volume});
              OrderAPI.sendUpdate(this.state.Orderdate,this.state.Category,this.state.Products,this.state.Status,this.state.Comment,this.state.qte,this.state.volume, newData.Orderno,"Produit");
              window.location.reload(false)
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              
              OrderAPI.sendDelete(oldData.Orderno,"Produit");
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
        
        onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
        

      options={{
        
        headerStyle: {
          backgroundColor: '#049A94',
          color: '#FFF'
        },
       // exportButton: true,
        filtering: true,
        grouping: true,
        sorting: true,
        
        rowStyle: rowData => ({
          backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#C7CFDE' : '#FFF'
        })
      }}
      
    />
  );
}
 }
 export default ProduitOrders;