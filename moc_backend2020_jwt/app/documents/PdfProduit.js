
module.exports = ({ Orderno, Category, Status, Orderdate,Products,Comment,volume,qte,FirstName,Name,Adresse,City,PostalCode,Country }) => {
    const today = new Date();
return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Commande</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 30px;
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 20px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica',
         color: #555;
         }
         .margin-top {
         margin-top: 50px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 50px;
         line-height: 50px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 50px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 20px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
      <div class="invoice-box">

         <table cellpadding="0" cellspacing="0">
            <tr class="top">
               <td colspan="2">
                  <table>
                     <tr>
                        <td class="title"><img src="http://localhost:3000/images/logos/moc.jpg"
                           style="width:100%; max-width:156px;"></td>
                        <td>
                        Order Date: ${Orderdate!=null?Orderdate.substring(0, 10):""}
                        </td>
                     </tr>
                  </table>
               </td>
            </tr>
            <tr class="information">
               <td colspan="2">
                  <table>
                  <tr>
                 
                  <td colspan=2 style="text-align: center;width:100%; font-size: 35px"> <center> <b>Product Bill  Order  </b></center></td>
                  </tr>
                     <tr>
                        <td style="font-size: 18px">
                           Order Number:<b> 0000${Orderno==null?"":Orderno}<br></b>
                           
                           Client  Name: ${FirstName==null?"":FirstName}   ${Name==null?"":Name}
                          <br>
                          Adresse : ${Adresse==null?"":Adresse}
                          <br>
                          City : ${City==null?"":City}
                          <br>
                          Postal Code : ${PostalCode==null?"":PostalCode}
                          <br>
                          Country : ${Country==null?"":Country}
                        </td>
                       </tr>
                        
                  </table>
               </td>
            </tr>
            <tr class="heading">
               <td>Order informations:</td>
               <td></td>
            </tr>
            <tr class="item">
                
               <td>Category:</td>
               <td>${Category==null?"":Category}</td>
            </tr> 
            <tr class="item">
                
               <td>Products:</td>
               <td>${Products==null?"":Products}</td>
            </tr> 
            <tr class="item">
                
               <td>Status:</td>
               <td>${Status==null?"":Status}</td>
            </tr> 
            <tr class="item">
                
               <td>Comment:</td>
               <td>${Comment==null?"":Comment}</td>
            </tr> 
            <tr class="item">
                
               <td>Quantity :</td>
               <td>${qte==null?0:qte}</td>
            </tr> 
            <tr class="item">
                
               <td>Volume:</td>
               <td>${volume==null?"":volume}</td>
            </tr>
            
         </table>
         <br />
         <h1 class="justify-center">Total price: ${parseInt(qte==null?0:qte) * parseInt(150)} DT </h1>
      </div>
   </body>
</html>
    `;
};