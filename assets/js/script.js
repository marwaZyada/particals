





let menu = document.getElementById("menu");
let list = document.querySelector(".header .nav_links");
console.log(list);
menu.onclick = () => {
  list.classList.toggle("show");
};

//    fetch carts
let carts = [];
let swiperSlide = document.getElementById("swiper");
console.log(swiperSlide);
window.onload = async () => {
  await fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
      carts = data.products;
      carts.map((el) => {
        swiperSlide.innerHTML += `<div class="swiper-slide">
        <div class="image-content">
        <img src=${el.thumbnail} width="100%" />
        </div>
        </div>
        `;
      });
      console.log(carts);
    });
};
//  filter section
$(document).on("click", ".filter-nav ul li", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

$(document).ready(function () {
  $(".filter-nav ul li").click(function () {
    const val = $(this).attr("data-filter");
    console.log(val);
    // switch(val){
    //     case 'all':{}
    // }
    if (val == "all") {
      $(".filter-box").show("1000");
    } else if (val != "all") {
      console.log($("." + val));
      $(".filter-box")
        .not("." + val)
        .hide("1000");
      $("." + val).show("1000");
    }
  });
});

// crud section
let place = document.getElementById("place");
let price = document.getElementById("price");
let tableBody = document.getElementById("body");
let btn = document.getElementById("btn");
let inputs = document.querySelectorAll(".crud input");
let products;
let i ;
let flag="add"
let index
console.log(localStorage.products)

if(localStorage.products){
 products=JSON.parse(localStorage.getItem("products"))
//  console.log("products" + products[0]);
console.log(products)

getData()
}

else{
    products=[]
    
}
      




btn.onclick = () => {
 

  let data = {
    id: Math.random(),
    price: price.value,
    place: place.value
  };
  if(place.value!=""&&price.value!=""){
   if(parseInt(price.value)>5000 ||parseInt(price.value)<0){
    alert("you should enter number>0 and <5000")
   }
   else{
    if(flag=="add"){
     
    products.push(data);
      }
   
  
    

  
    else{
      console.log(products[index])
      products[index].price=price.value
      products[index].place=place.value
   
    localStorage.products=JSON.stringify(products)
    getData()
    clear()
    btn.innerHTML="إضافة"
    flag="add"
    }
  }
  
 
  
}
    
   
  
  else{
    return null
  }
 
  localStorage.setItem("products",JSON.stringify(products));
  getData()
  console.log(products); 
  clear()
  }

 
  


function clear(){
  inputs.forEach(input => {
    input.value = "";
  });
}



function getData(){
    tableBody.innerHTML=""
   products.forEach((product,idx)=>{
        tableBody.innerHTML += `
        <tr draggable="true" class="dragg" data-index=${idx}>

        <td>${product.id}</td>
        <td>${product.place}</td>
        <td>${product.price}</td>
        <td>
        <button class="btn"  onclick="handleDelete(${product.id})">حذف</button>
        <button class="btn" onclick="handleUpdate(${idx})">تعديل</button>
        </td>
        </tr>
        `
    })
}

  function handleDelete(id){
     products=products.filter(el=>el.id!=id)
     localStorage.setItem("products",JSON.stringify(products))
getData()


    }
    

// update

function putData(){
  
}


    function handleUpdate(id){
      index=id
      place.value=products[id].place;
      price.value=products[id].price;
      btn.innerHTML="تعديل"
      flag="update"
    
     console.log(flag)
     place.focus()
     document.getElementById("crud").scrollIntoView({behavior:"smooth"},true)
    
    }

// drag

let startIndex
function dragStart(){
startIndex=this.getAttribute("data-index")
console.log(startIndex)
}
function dragOver(e){
e.preventDefault();
}
function dragDrop(){
  let lastIndex=this.getAttribute("data-index")
  console.log(lastIndex)
  let text=`هل انت متأكد من تغيير الرحلة ${products[startIndex].place}ب${products[lastIndex].place}`
  if(confirm(text)){
let x=products[startIndex];
products[startIndex]=products[lastIndex]
products[lastIndex]=x
console.log(products)
localStorage.products=JSON.stringify(products)
getData()
location.reload()

  }
}


(function dragging(){
  let rows=document.querySelectorAll(".crud .dragg")
  rows.forEach(row=>{
    row.addEventListener("dragstart",dragStart)
    row.addEventListener("dragover",dragOver)
    row.addEventListener("drop",dragDrop)
    // row.addEventListener("dragenter",dragEnter)
    // row.addEventListener("dragleave",dragLeave)
  })
}())


// contact form
let record=document.getElementById("record")

record.onclick=()=>{

let speach=true
window.SpeechRecognition = window.webkitSpeechRecognition;

const recognition = new SpeechRecognition()
recognition.lang="ar-AR"
recognition.interimResults=true
recognition.addEventListener("result",e=>{
  const transcript=Array.from(e.results).map(result=>result[0]).map(result=>
    result.transcript)
   document.getElementById("area").innerHTML= transcript
 

})
if(speach){
  recognition.start()
}
}

// light mode
const lightTheme=document.getElementById("light")
console.log(lightTheme)
lightTheme.addEventListener("click",(e)=>{
e.preventDefault()
document.body.classList.toggle("light")
lightTheme.classList.toggle("bx-sun")


handleLightMood=()=>{
 return document.body.classList.contains("light")?"light":"dark"
}

handleIconMood=()=>{
  return lightTheme.classList.contains("bx-sun")?"light":"dark"
}



localStorage.setItem("mode",handleLightMood())
localStorage.setItem("iconMode",handleIconMood())



  })

  let mood=localStorage.mode
  
  let iconMood=localStorage.iconMode
  if(mood&&iconMood){
   if( mood=="light"||iconMood=="light"){
    document.body.classList.add("light")
    lightTheme.classList.add("bx-sun")
    
   }
   else{
    document.body.classList.remove("light")
    lightTheme.classList.remove("bx-sun")
    
   }
  }


// cart section
let addedArray

if(localStorage.cart!=null){
  addedArray=JSON.parse(localStorage.cart)
}
else{
  addedArray=[]
}
let addedItem=document.getElementById("cart-item")
let total=document.getElementById("total")
  const putProduct=(i)=>{
    let item=products.find((el,ind)=>ind===i)
   
    console.log(item.place)
    let result=addedArray.find(el=>el.id==item.id)
    console.log(result)
    if(result==undefined){
      item.qnt=1
      addedArray=[...addedArray,item]
    addedItem.innerHTML=""
    addedArray.map(el=>{
    addedItem.innerHTML+=`<div class="d-flex justify-content-around"><div>${el.place} </div><span>${el.qnt}</span></div>`
  })
  localStorage.setItem("cart",JSON.stringify(addedArray))
  }
    else{
      item.qnt=result.qnt+1
      console.log(item.qnt)
      let filter=addedArray.filter(el=>el.id!=item.id)
      console.log(filter)
      addedArray=[...filter,item]
      addedItem.innerHTML=""
      // addedArray=
      addedArray.map(el=>{
      addedItem.innerHTML+=`<div class="d-flex justify-content-around"><div class="ms-5">${el.place}</div><span>${el.qnt}</span></div> `
    })
    localStorage.setItem("cart",JSON.stringify(addedArray))
    }
    
   
    console.log(addedArray)
    total.innerHTML=addedArray.length

     }

  // search section
  let inputSearch=document.getElementById("p-search")
  let searchRow=document.getElementById("search")
  if(inputSearch.value==""){
JSON.parse(localStorage.products).forEach((el,index)=>{
searchRow.innerHTML+=` <div class="col-lg-4 col-sm-12 mb-3">
<div class="content text-center p-2 fs-2">
    <p>${el.place}</p>
    <p>${el.price}</p>
    <button class="btn btn-danger" onclick="putProduct(${index})">أضف للسلة</button>
</div>
</div>`
})
  }
  
  inputSearch.addEventListener("keyup",(e)=>{
 if(inputSearch.value!="") {  
  let text=inputSearch.value
 
products= JSON.parse(localStorage.products).filter(el=>{return el.place.indexOf(text)!==-1})
// console.log(newArr)
}

else{
  products=JSON.parse(localStorage.products)
}
searchRow.innerHTML=""
products.map((el,index)=>{

  return searchRow.innerHTML+=` <div class="col-lg-4 col-sm-12 mb-3">
 <div class="content text-center p-2 fs-2">
     <p>${el.place}</p>
     <p>${el.price}</p>
     <button class="btn btn-danger">أضف للسلة</button>
 </div>
 </div>`
 })

  })






    