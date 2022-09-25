const taxtRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
    calculateCartPrice();
    localStorage.setItem("taxRate", taxtRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    localStorage.setItem("shippingFreePrice", shippingFreePrice);

    // sessionStorage.setItem("taxRate", taxtRate);
    // sessionStorage.setItem("shippingPrice", shippingPrice);
    // sessionStorage.setItem("shippingFreePrice", shippingFreePrice);

})

//! B u sekilde local staregeıme ve sessionStorage me attım böğlelikle
//! localStorage ile sessionStorage in farkı localStorage de kullanıcı oturumu sonlandırdıgı zaman sessionStorage silinmiş oluyor.localStorage dde kalıyor .

const productsDiv = document.querySelector(".products");
// Bu kısımda bu üç ürünün ana divini yani productina yakalamış oluyorum
// benim amacım burada productsların içerisindekilere işlevsllik kazandırmak 
// şimdii artı eksi ve remove butonlarını yakalıcam 
productsDiv.addEventListener("click", (event) => {
    if (event.target.className == "fa-solid fa-minus") {
        // console.log("minus btn is clicked!");
        if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
            event.target.parentElement.querySelector(".quantity").innerText--;
            calculateProductPrice(event.target);
            // Buraya buttonlar tıklandıgında harekete gecildin sidiye bu sekilde göndedik
            calculateCartPrice();
        }
        //   eğer tıklamış oldugumın parentelementinnin clasının ismi quantity olanı 1 den buyukse bir bir azalt dedik buarada
        else {
            if (confirm("Product will be removed???")) {
                // confirm true mu false mu diye sorup kaldırma işlemi remove yapıyor burada 
                event.target.parentElement.parentElement.parentElement.remove();
                // kaldır uyarınıa tamam dersek div i kaldırmış oluyoruz 
                calculateCartPrice();
            }
        }
    }
    else if (event.target.classList.contains("fa-plus")) {
        // console.log("plus btn is clicked!");
        event.target.previousElementSibling.innerText++;
        // Burada tıkladıgım hedefdekinin bir önceki elementi p içinde ki  oluyor bunların innertextine artır dedim böğlelikle Yani artı butonuna basıldıgında 1 leri her seferinde bir artır dedim
        calculateProductPrice(event.target);
        // Buraya buttonlar tıklandıgında harekete gecildin sidiye bu sekilde göndedik
        calculateCartPrice();
    }
    else if (event.target.className == "remove-product") {
        // console.log("remove btn is clicked!");
        event.target.parentElement.parentElement.parentElement.remove();
    }
    else {
        // console.log("other element is clicked!");
    }
});

const calculateProductPrice = (clickeBtn) =>
// Burası artı butonuna basıldıgında calısacak
{

    const productInfoDiv = clickeBtn.parentElement.parentElement;
    // burası quantity-controller classındaki div 
    // console.log(productInfoDiv);
    //! hem artı butonuna hem eksi butonuna ulaşmka için bunu yaptık 
    //! hangi resimdeki artıya tıkladıysam onu çalıştırıyor bu kısım 
    const price = productInfoDiv.querySelector(".product-price strong").innerText;
    //! Burada htmlde ki product-price in stronguna yani içinde ki 25.98 yazına ulaşmaya calısıyorum 
    // alert(price);
    const quantity = productInfoDiv.querySelector(".quantity").innerText;
    //! Buradada quantityleri yani 1 sayısı yazan yeri almaya çalıştık 
    const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
    //! Burada da fiyat yazılarına ulaştım 25,98,45,99,74,99 a ulaştım 
    productTotalDiv.innerText = (price * quantity).toFixed(2);
    // alert(quantity);
    // Buradada o quatity dedğimiz 1 saysını yazan yer ile fiyatı çarpmayı yaptım
    // toFixed koyarakda ondalıklı sayılardaki ifadelerden ondalık kısmı iki tane olsun diye ayarladık 

}


const calculateCartPrice = () =>
// Subtotal tax shipping total yazan yer 
{
    const productsTotalPricesDivs = document.querySelectorAll(".product-line-price");

    let subtotal = 0;
    productsTotalPricesDivs.forEach(div => {
        subtotal += parseFloat(div.innerText);
    });
    // console.log(subtotal);
    const taxPrice = subtotal * localStorage.getItem("taxRate");
    // Kdv hesapladık 

    const shippingPrice = parseFloat(subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice") ? localStorage.getItem("shippingPrice") : 0);

    console.log(shippingPrice);

    document.querySelector("#cart-subtotal").lastElementChild.innerText = subtotal.toFixed(2);

    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);

    document.querySelector("#cart-shipping").children[1].innerText = shippingPrice.toFixed(2);

    document.querySelector("#cart-total").lastElementChild.innerText = (subtotal + taxPrice + shippingPrice).toFixed(2);
}





