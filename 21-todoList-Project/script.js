//! TÜM ELEMENTLERİ SECMEK

const form = document.querySelector("#todoAddForm")
const addInput = document.querySelector("#todoName")
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const clearButton = document.querySelector("#clearButton")
const filterInput = document.querySelector("#todoSearch")


//! OLASI EVENTLERDE YAPILACAK İŞLEMLER
runEvent()
function runEvent() {
    form.addEventListener("submit", addTodo) //! form uzerınde submit olursa addTodo fonksiyonu calısıcak
    document.addEventListener("DOMContentLoaded", pageLoaded); //! sayfa yenıden yuklenırse
    secondCardBody.addEventListener("click", removeTodoToUI) //! belirlenen alana tıklanırsa calıstırılacak fonksiyon
    clearButton.addEventListener("click", allTodosEverywhere) //! clearButton üzerinde bir dinleme yaptık ve bir fonksiyon atadık
    filterInput.addEventListener("keyup", filter) //! filtreleme icin bir event ve fonksiyon tanımladık
}


//! SAYFA YUKLENDIGINDE VEYA YENILENDIGINDE CALISTIRICAK FONKSYION
function pageLoaded() {
    checkTodosFromStorage() //! todo kontrol eden fonksiyon
    todos.forEach(function (todo) {   //! storage'deki  her bir eleman için loop yapar ve todo içerisinde toplar
        addTodoToUI(todo)   //! todo içerisindeki herşeyi artık arayüzde goruntuleyebılırız
    })
}


//! ARAMA FİLTRELEMESİ İCİN
function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim() //! search'tan gelen degeri kücültüp boslukları sildik
    const todoListesi = document.querySelectorAll(".list-group-item") //! tüm todo elemanlarını todoListesinde tuttuk

    if (todoListesi.length > 0) { //! todoListesi uzunlugunu sorguladık
        todoListesi.forEach(function(todo) { //! foreach ile elemanlar üzerinde dönüp 'todo' içinde tuttuk
            if (todo.textContent.toLowerCase().trim().includes(filterValue)) { //! todo, liste oldugundan textcontent ile liste elemanlarını aldık. ve includes fonksiyonu ile filterValue arasında girilen değer ve liste içerisnde olan değerleri arattıks 
                //
                todo.setAttribute("style", "display : block"); //! eğer aratılan değer listede varsa görüntüledik
            } else {
                //
                todo.setAttribute("style", "display:none !important") //! aratılan deger yoksa  gizleme işlemi yapılıyor
            }
        })
    } else {
        showAlert("warning", "Filtreleme yapmak ıcın en az bir todo olmalı") //! liste boşsa filtreleme uyarısı versin                                                  
    }
}




//! ARAYÜZDEN VE LOCALSTORAGE'DEN TODO SİLME
function allTodosEverywhere() {
    const todoListesi = document.querySelectorAll(".list-group-item")
    if (todoListesi.length > 0) {  //! eğer todoList uzunlugu sıfırdan büyükse silme işlemleri
        //! Arayüzden silme silme 
        todoListesi.forEach(function (todo) { //! todoListesi üzerinde foreach ile dönüp, todo'ya atadık
            todo.remove() //! atanan verileri sildik
        })

        //! Storage'dan silme
        todos = []; //! todos doluysa boşalttık
        localStorage.setItem("todos", JSON.stringify(todos)) //! object olarak storage'de goruntuledık ama todos boş oldugundan görüntülenecek bişi yok
        showAlert("success", "Basarılı bir sekilde silindi") //! silindi bilgisi
    } else {
        showAlert("warning", "Silmek icin en az bir todo olmalıdır") //! todoListesi zaten boşsa silinecek bir şey yok uyarısı verdik
    }
}


//! ARAYÜZDEN TODO SİLME 
function removeTodoToUI(e) {
    if (e.target.className === "fa fa-remove") { //! tıklanan alanın hedefinın class'ına göre bir kosul
        const todo = e.target.parentElement.parentElement; //! tıklanan elemanı silebilmek icin asıl parent'ı tuttuk
        todo.remove()      //! ve parent'ı sildik
        showAlert("success", "Todo basarıyla silindi.")     //! bir alert'ile gösterdik

    }
}


//! TODO EKLEMEK İÇİN...  ARAYÜZ VE STORAGE'DE GORUNTULENMESI ICIN.
function addTodo(e) {  //! todo eklemek ıcın bu fonksiyonu yazdık
    const inputText = addInput.value.trim() //! addInputtan gelen value'yi alır kenarlarındakı boslukları sıler
    if (inputText == "" || inputText == null) { //! gelen degerın kontrolu yapılır
        showAlert("warning", "Please write something.") //! alert fonksiyonu parametrelerını doldurduk
    } else {      //! gelen deger dolu ise arayüze ve storage'e ekler
        //todo arayüze ekleme 
        addTodoToUI(inputText)
        //todo storage ekleme
        addTodoToStorage(inputText)
        showAlert("success", "Basariyla eklendi") //! fonksiyondan gelen type ve message'yi tanımladık
    }
    e.preventDefault()  //! formun varsayılan davranışını engelledik

}





//! İNPUTTAN GELEN DEGER ALT KISIMDA LİSTELENMESI ICIN YAPILDI
function addTodoToUI(newTodo) { //! burda yeni eklenen todo card'a uygun olan html kodlarını ekliyoruz

    const li = document.createElement("li") //! li element'i olusturduk
    li.className = "list-group-item d-flex justify-content-between"
    li.textContent = newTodo

    const a = document.createElement("a") //! a element'i olusturduk
    a.href = "#"
    a.className = "delete-item"

    const i = document.createElement("i")   //! i element'i olusturduk
    i.className = "fa fa-remove"

    li.appendChild(a)   //! li içerisine a ekledık
    a.appendChild(i)    //! a içerisine i ekledık
    todoList.appendChild(li)

    addInput.value = "" //! input girisı yapıldıktan sonra input value'si temizlensin.
}

// <!--
//     <li class="list-group-item d-flex justify-content-between">Todo 1
//         <a href="#" class="delete-item">
//             <i class="fa fa-remove"></i>
//         </a>
//     </li>
//  -->



//! STORAGE EKLEME 
function addTodoToStorage(newTodo) { //! storage' ekleme fonksiyonu
    checkTodosFromStorage(); //! fonksiyona gönderdik
    todos.push(newTodo);    //! todos'tan gelen değeri newTodo'ya atadık ve arrayimize push ettik
    localStorage.setItem("todos", JSON.stringify(todos)); //! storage 'e todos arrayini atadık
}

let todos = [];

function checkTodosFromStorage() { //! storage eklemeden once kontrol eder
    if (localStorage.getItem("todos") === null) { //! todos boş mu 
        todos = []; //! boşsa boş kalsın
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); //! todos doluysa parse ile ayrıştırıp todos'a atayalım
    }
}


//! EKLENDİ VEYA EKLENEMEDİ POP-UP'I
function showAlert(type, message) {   //! 2 parametreli fonksiyonumuz. alert vericek
    const div = document.createElement("div") //! bir div ekledık
    div.className = `alert alert-${type}` //! div'in klası var ve type'ı parametreden gelecegı icin degısken olacak
    div.textContent = message;  //! contenti de message parametresınden gelıcek

    firstCardBody.appendChild(div) //! div'i card-body içerisine ekledık

    setTimeout(function () {
        div.remove() //! fonksiyon calıstıgında 2.5saniyeliğine bir alert verip kaybolacak
    }, 2500)
}



























