/** 

write your code here
for page order.html

**/

const tableDetail = document.querySelector('#detail');
const tableTotal = document.querySelector('#total');
const nameSession = sessionStorage.getItem('orderData');
const priceSession = sessionStorage.getItem('totalPrice');
const dataOrder = JSON.parse(nameSession);

if(dataOrder){
    dataOrder.forEach(data => {
        tableDetail.innerHTML += `
            <tr>
            
            <td>
                <p>${data.name}</p>
            </td>
            
            <td>
                <p>$${data.price}</p>
            </td>
            
            </tr>
        `;
    });
    
    tableTotal.innerHTML = `
        <tr>
                
        <td>
            <p>Total Price</p>
        </td>

        <td>
            <p>$${priceSession}</p>
        </td>
        
        </tr>
    `;
}