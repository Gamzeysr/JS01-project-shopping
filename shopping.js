const taxtRate = 0.18;
const shippingPrice = 15;
const shippingFreePrice = 300;

window.addEventListener("load", () => {
    // calculateCartPrice();
    localStorage.setItem("taxRate", taxtRate);
    localStorage.setItem("shippingPrice", shippingPrice);
    localStorage.setItem("shippingFreePrice", shippingFreePrice);
    // //!👆 Bu sekilde local staregeıme ve sessionStorage me attım böğlelikle
    sessionStorage.setItem("taxRate", taxtRate);
    sessionStorage.setItem("shippingPrice", shippingPrice);
    sessionStorage.setItem("shippingFreePrice", shippingFreePrice);

})

// //! localStorage ile sessionStorage in farkı: kullanıcı oturumu sonlandırdıgı zaman bilgiler sessionStorage silinmiş oluyor.localStorage de kalıyor .

const productsDiv = document.querySelector(".products");
//? 👆Bu kısımda bu üç ürünün ana divini yani productina yakalamış oluyorum.Yani bu sayfadaki üç ürüne de bu sekilde hepsine erişebiliyorum
//? benim amacım burada productsların içerisindekilere işlevsllik kazandırmak

//*✨Capturing and Bubbling
//? Capturing yontemi sayesinde sayfama yeni bir ürün bile eklenmiş olsa o ürün products divine girecek ve ben burada onu Capturing yontemi ile yakalamış olacam 
productsDiv.addEventListener("click", (event) => {
    if (event.target.className == "fa-solid fa-minus") {
        // console.log("minus btn is clicked!");
        //burda dedgım tıklanılan element eger eksi butonu ıse 👆 
        // assagıdaki olaylar gerceklesecek 


        if (event.target.parentElement.querySelector(".quantity").innerText > 1) {
            //👆 tıklanan elementın parentına git ve 1 den byukse
            event.target.parentElement.querySelector(".quantity").innerText--;
            //👆 her  e tıklanıldıgında yanı eksı butonuna basıldıgında bırer bırer düş dedik.  
            calculateProductPrice(event.target);
            calculateCartPrice();
            //?👆 ürünler eksi butonuna basıldıgında hrekete gececeğinden burada ve eksi butonuna hrekete gececinden eksi butonunun oldugu yerde fonk ları cagırdık 
        }
        //   eğer tıklamış oldugumın parentelementinnin clasının ismi quantity olanı 1 den buyukse bir bir azalt dedik buarada
        else {
            if (confirm("Product will be removed???")) {
                //? confirm true mu false mu diye sorup kaldırma işlemi remove yapıyor burada
                event.target.parentElement.parentElement.parentElement.remove();
                //?kaldır uyarınıa tamam dersek div i kaldırmış oluyoruz
                calculateCartPrice();
                //?👆 silme yanı kaldırma olayında sadece sepet harekete gececği için sepetin oldugu fonk cagırdık buraya bosu bosuna diğer ürünleri ekleyecek olan fonk cagırmadık 
            }
        }
    }
    else if (event.target.classList.contains("fa-plus")) {
        // console.log("plus btn is clicked!");
        event.target.previousElementSibling.innerText++;
        //👆 Burada tıkladıgım hedefdekinin bir önceki elementi p içinde ki  oluyor bunların innertextine artır dedim böğlelikle Yani artı butonuna basıldıgında 1 leri her seferinde bir artır dedim
        calculateProductPrice(event.target);
        calculateCartPrice();
        //?👆 ürünler eksi butonuna basıldıgında hrekete gececeğinden burada ve eksi butonuna hrekete gececinden eksi butonunun oldugu yerde fonk ları cagırdık 
    }
    else if (event.target.className == "remove-product") {
        // console.log("remove btn is clicked!");
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
    }
    else {
        console.log("other element is clicked!");
    }
});
// Hesaplama kısmı👇
const calculateProductPrice = (clickeBtn) => {
    //* burası ürünleri güncelleyecek olan kısım 

    const productInfoDiv = clickeBtn.parentElement.parentElement;
    //*👆quantityi butonuna tıklanınca direk fiyatlara ulaşamam bu yüzden.html de ki producT İnfo ya ulaşmalıyım ki  fiyatlara erişeyim . product ınfoya ulasınca her bir recelin fiyatına ayrı balın fıyatına ayrı karadudun fıyatına ayrı ulaşabiliyorum
    // console.log(productInfoDiv);


    const price = productInfoDiv.querySelector(".product-price strong").innerText;
    //! Burada htmlde ki product-price in stronguna yani içinde ki 25.98 yazına ulaşmaya calısıyorum.
    // alert(price);
    const quantity = productInfoDiv.querySelector(".quantity").innerText;
    //! Buradada quantityleri yani 1 sayısı yazan yere eriştik
    const productTotalDiv = productInfoDiv.querySelector(".product-line-price");
    //! Burada da fiyat yazılarına ulaştım 25,98,45,99,74,99 a ulaştım.
    productTotalDiv.innerText = (price * quantity).toFixed(2);
    // alert(quantity);
    // Buradada o quatity dedğimiz 1 saysını yazan yer ile fiyatı çarpmayı yaptım
    // toFixed koyarakda ondalıklı sayılardaki ifadelerden ondalık kısmı iki tane olsun diye ayarladık.

}


const calculateCartPrice = () =>
//* burası da sepetin güncellenek oldgu kısım 
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





