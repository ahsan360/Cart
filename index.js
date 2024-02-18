const removCart = document.querySelectorAll('.btn-danger');
for( let i of removCart){
    let btn = i;
    btn.addEventListener('click',(event)=>{
        let cur = event.target;
        cur.parentElement.parentElement.remove()
    })
}