window.addEventListener('DOMContentLoaded', function() { // функция которая ждет пока вся страница загрузиться прежде чем выполнять код скрипта

    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'), // переменная содежит все селекторы с goods__item - массив
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title'); 

    function openCart() {
        cart.style.display = 'block';                           // показывет корзины через свойство цсс для корзины
        document.body.style.overflow = 'hidden';                // нужно для того чтобы оснавная страница не прокручивалась когда активна корзина
    }

    function closeCart() {
        cart.style.display = 'none';                            // цсс устанавлявает стиль для карт ноне то есть скрывет корзину
        document.body.style.overflow = ''; 
    }

    
    open.addEventListener('click', openCart);                   // добавляет смотрителя ан клик и запускает функцию openCart
    close.addEventListener('click', closeCart);                 // добавляет смотрителя ан клик и запускает функцию closeCart

    goodsBtn.forEach(function (btn, i) {                        //массив перебирает все кнопки в карточке
        btn.addEventListener('click', () => {                   //добавляет смотрителя на клик - дествие при клике на кнопку добавить в корзину
            let item = products[i].cloneNode(true),             // клонирует картоку номер И
                trigger = item.querySelector('button'),         // переменная содержит класс button
                removeBtn = document.createElement('div'),      //создает пусто блок
                empty = cartWrapper.querySelector('.empty');    // переменная содержит класс empty

            trigger.remove();                                       //функция удаляет кнопку в окне корзины
            


            showConfirm(); // вызывает функцию показа картинки и анимации при заказе товара 
            calcGoods(1); // вызывает функцию количества заказаного товара 





            removeBtn.classList.add('goods__item-remove');      // добавляет в removeBtn то есть в блок созданный goods__item-remove
            removeBtn.innerHTML = '&times';                     // вставляет крестик в карточку
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);      // обертка для карточки продукта добавляет карточку товара

            if (empty) {                        //если empty true  тогда его удаляет-надпись из корзины когда добавляется товар
                empty.remove();
            }
            
           
            calcTotal(); // вызывает функцию подсчета общей суммы товаров

            removeFromCart(); // вызывает функцию удаления товара из корзины
        });
    });


    function sliceTitle() {
        titles.forEach(function(item) {            // перебирает titles .goods__title' все заголовки в карточке продукта 
        if (item.textContent.length < 70) {    // получает текст из item -заголовки и проверяет их длину length меньше 70
            return;                             // возвращает значение то есть оставляет как есть заголовок
        } else {
            let str = item.textContent.slice(0, 71) + '...';   //переменная получает содержимое заголовков и через slice  отрезает текст начиная с 0 знака и заканчивая 70 и вставляет точки
            item.textContent = str;
        }
    });

    }
    sliceTitle();  

    function showConfirm() {                        // функция которая показывает картинку как подтверждение заказа
        confirm.style.display = 'block';            // класс блока confirm  задаем стиль на отображение блок
        let counter = 100; // счетчик
        
        const id = setInterval(frame, 10); // переменная с функцией интервала для запуска анимации

        function frame() { //анимация
            if ( counter == 10) {
                clearInterval (id); // останавливает интервал
                confirm.style.display = 'none'; // скрываем картинку
            } else {
                counter--; //уменьшает счетчик на 1
                confirm.style.transform = `translateY(-${counter}px)`; //изменяет стиль confirm сдвиг по оси Y на величину counter
                confirm.style.opacity = '.' + counter; // уменьшает прозрачность картинки на величину counter
            }
            
        }
    }

    // setInterval
    // setTimeout 

    function calcGoods(i){ // функция для посчета количества объектов в корзине
        const items = cartWrapper.querySelectorAll('.goods__item'); // переменная запрос к корзине cartWrapper и выбор всех обектов с селектором goods__item
        badge.textContent = items.length + i // <div class="nav__badge">0</div> добавляет вместо 0 длину (количество) items
    }

    function calcTotal () {                 // посчет общей суммы товаров
        const price = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span'); // выбирет по селектору  <div class="goods__price"><span>5768</span> руб/шт
        let total = 0;                      // общая цена 0
        price.forEach(function(item) { // перебор массива
            total+= +item.textContent; //общая сумма =  и добавление значение из спана цены товара перевод в число
        });
        totalCost.textContent = total;
    }
    
    function removeFromCart () { // функция для удаления товара из корзины
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove'); // выбираем все карточки с классом goods__item-remove
        removeBtn.forEach(function(btn) { // перебираем все кнопки и вешаем смотритель по клику на крестик
            btn.addEventListener('click', () => {
                btn.parentElement.remove(); // удаляет родительский блок кнопки то есть карточку товара в корзине
                calcGoods(0); // количество товаров в корзине
                calcTotal(); // сумма заказов
            });
        });
    }

});