function prevSlide(){
    const img = document.querySelector('.active');
    var prevImg = img.previousElementSibling;
    if(prevImg){
        img.classList.remove('active');
        prevImg = img.previousElementSibling;
        prevImg.classList.add('active');
    }
}

function nextSlide(){
    const img = document.querySelector('.active');
    var nextImg = img.nextElementSibling;
    if(nextImg){
        img.classList.remove('active');
        nextImg = img.nextElementSibling;
        nextImg.classList.add('active');
    }
}

function dragStart(e){
    const img = e.target;
    e.dataTransfer.setData('imageSrc', e.target.src);
    e.dataTransfer.setData('dataImg', e.target);
    e.dataTransfer.setData('name', img.getAttribute('data-name'));
    e.dataTransfer.setData('price', img.getAttribute('data-price'));
}

function dragOver(e){
    e.preventDefault();
}

function order(dataJson, total) {
    const button = document.querySelector('#buttonOrder');
    button.addEventListener('click', function(){
        window.location = 'order.html';
        sessionStorage.setItem('orderData', dataJson);
        sessionStorage.setItem('totalPrice', total);
    });
}

function drop(e){
    e.preventDefault();

    const breadBottom = document.querySelector('#breadBottom');
    const container = document.querySelector('#order');
    if(e.target == container){
        const src = e.dataTransfer.getData('imageSrc');
        const name = e.dataTransfer.getData('name');
        const price = e.dataTransfer.getData('price');

        if(src){
            let gambar = document.createElement('img');
            gambar.src = src;
            gambar.classList.add('order-img');
            gambar.setAttribute('data-name', name);
            gambar.setAttribute('data-price', price);
            container.insertBefore(gambar, breadBottom);
        }

        saveOrder();
    }else if(e.target.id == 'trash'){
        const data = e.dataTransfer.getData('dataImg');
        console.log(data);
    }else{
        return;
    }
}

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


let dataJson;
let orderData = [];
const saveOrder = () => {

    const items = Array.from(document.querySelectorAll('.order-img'));
    const tableDetail = document.querySelector('#detail');
    const tableTotal = document.querySelector('#total');
    removeChilds(tableDetail);
    let total = 0;
    items.forEach(item => {
        const dataPrice = parseFloat(item.getAttribute('data-price'));
        total += dataPrice;
        tableDetail.innerHTML += `
        
        <tr>
        
        <td>
            <p>${item.getAttribute('data-name')}</p>
        </td>
        
        <td>
            <p>$${item.getAttribute('data-price')}</p>
        </td>
        
        </tr>
        
        `
    });

    orderData.length = 0;
    items.forEach(item => {
        const dataOrder = {name: item.getAttribute('data-name'), price: item.getAttribute('data-price')};
        orderData.push(dataOrder);
    });

    dataJson = JSON.stringify(orderData);
    order(dataJson, total);

    tableTotal.innerHTML = `
        
    <tr>
    
    <td>
        <p>Total Price</p>
    </td>
    
    <td>
        <p>$${total}</p>
    </td>
    
    </tr>
    
    `;

}


const buttonOrder = document.querySelector('#buttonOrder');
buttonOrder.addEventListener('click', order);


// const dragOrderedImg = (e) => {
//     console.log(e);
// };

// const orderImg = document.querySelectorAll('#order img');
// for (const img of orderImg) {
//     img.addEventListener('dragstart', function(e) {
//         dragOrderedImg(e.srcElement);
//     });
// }

// export {order};