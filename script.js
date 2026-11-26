// IMPORTANT: Replace this with your WhatsApp number, including country code, without + or spaces.
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

const products = [
  {id:1,name:"Everyday Tote Bag",category:"Fashion",price:499,icon:"👜"},
  {id:2,name:"Classic Wrist Watch",category:"Accessories",price:899,icon:"⌚"},
  {id:3,name:"Ceramic Coffee Mug",category:"Home",price:249,icon:"☕"},
  {id:4,name:"Wireless Earbuds",category:"Electronics",price:1299,icon:"🎧"},
  {id:5,name:"Casual Sneakers",category:"Fashion",price:999,icon:"👟"},
  {id:6,name:"Minimal Necklace",category:"Accessories",price:399,icon:"📿"},
  {id:7,name:"Decorative Lamp",category:"Home",price:699,icon:"💡"},
  {id:8,name:"Portable Speaker",category:"Electronics",price:1499,icon:"🔊"}
];
let cart = [];

function renderProducts(){
  const category=document.getElementById("category-filter").value;
  const visible=category==="All"?products:products.filter(p=>p.category===category);
  document.getElementById("products").innerHTML=visible.map(p=>`
    <article class="product"><div class="product-art">${p.icon}</div><h3>${p.name}</h3><p>${p.category}</p>
    <div class="product-bottom"><strong>₹${p.price.toLocaleString("en-IN")}</strong><button onclick="addToCart(${p.id})">Add to cart</button></div></article>`).join("");
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({...products.find(p=>p.id===id),qty:1});renderCart();}
function renderCart(){
  document.getElementById("cart-count").textContent=cart.reduce((n,p)=>n+p.qty,0);
  document.getElementById("cart-items").innerHTML=cart.length?cart.map(p=>`<div class="cart-row"><span>${p.name} × ${p.qty}</span><strong>₹${(p.price*p.qty).toLocaleString("en-IN")}</strong></div>`).join(""):"<p>Your cart is empty.</p>";
  document.getElementById("cart-total").textContent="Total: ₹"+cart.reduce((n,p)=>n+p.price*p.qty,0).toLocaleString("en-IN");
}
function toggleCart(){document.getElementById("cart-panel").classList.toggle("open");document.getElementById("overlay").classList.toggle("show");}
function checkout(){
  if(!cart.length){alert("Your cart is empty.");return;}
  if(WHATSAPP_NUMBER.includes("X")){alert("First add your WhatsApp number in script.js.");return;}
  const lines=cart.map(p=>`${p.name} x ${p.qty} = ₹${p.price*p.qty}`).join("\n");
  const total=cart.reduce((n,p)=>n+p.price*p.qty,0);
  const msg=encodeURIComponent(`Hello Ni & Di, I want to order:\n${lines}\nTotal: ₹${total}`);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`,"_blank");
}
document.getElementById("whatsapp-link").href=`https://wa.me/${WHATSAPP_NUMBER}`;
renderProducts();renderCart();
