
const update = () => {
    const Cart = document.querySelectorAll<HTMLDivElement>('.cart-total-price')
    const allCart = document.querySelectorAll<HTMLDivElement>('.cart-price')
    const allCartValue = Array.from(document.querySelectorAll<HTMLDivElement>('.cart-quantity-input'))
    let tot: number = 0;
    let j = 0;
    for (const i of allCart) {
        let price: string = '';
        const text: string = i.innerText
        for (let j = 0; j < text.length; j++) {
            if (j) price += text[j]
        }
        const num: number = parseFloat(price);
        if (!isNaN(num))
            tot += (num*allCartValue[j++].value)
    }
    ;
    Cart[0].innerText = `$${tot.toFixed(2)}`;
}

const AddCart = document.querySelectorAll<HTMLButtonElement>('.shop-item-button')
for (let i of AddCart) {
    let btn = i;
    btn.addEventListener('click', (event: MouseEvent) => {
        let cur = <HTMLButtonElement>event.target;
        let t = <HTMLDivElement>cur.parentElement?.parentElement
        const tittle: string = t.getElementsByClassName('shop-item-title')[0].innerHTML;
        const price: string = t.getElementsByClassName('shop-item-price')[0].innerHTML;
        const img: HTMLImageElement = t.getElementsByClassName('shop-item-image')[0] as HTMLImageElement;
        addCartItem(tittle, price, img.src)
        update()
    })
}

let removeCartitem = (event: MouseEvent) => {
    //console.log(event)
    let cur = <HTMLButtonElement>event.target;
    let t = <HTMLDivElement>cur.parentElement?.parentElement
    if (t) t.remove()
    update()
}
 
const addCartItem = (title: any, price: any, img: any) => {
    const child = document.createElement('div');
    child.classList.add('cart-row');
    const parent = document.querySelectorAll<HTMLDivElement>('.cart-items')[0];
    const titles = document.querySelectorAll<HTMLDivElement>('.cart-item-title')
    for (const i of titles) {

        if (i.innerText == title) {
            alert('Already Added');
            return
        }
    }


    if (parent) {
        child.innerHTML =
            `<div class="cart-item cart-column">
                <img class="cart-item-image" src="${img}" width="100" height="100">
                <span class="cart-item-title"> ${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
        parent.append(child);
        const btn = child.getElementsByClassName('btn-danger')[0];
        btn.addEventListener('click', (event: any) => removeCartitem(event));
        const cartQuantityInput: HTMLInputElement | null = child.querySelector('.cart-quantity-input');
        if(cartQuantityInput){
            
        cartQuantityInput.addEventListener('change',(event:any)=> {
            if(Number(cartQuantityInput.value)<=0)cartQuantityInput.value = '1';
                update()
            
        })
        }

    }
};




