/* Фильтры */
$('body').on('change', '.w_sidebar input', function(){
    var checked = $('.w_sidebar input:checked'),
        data = '';
    checked.each(function () {
        data += this.value + ',';
    });
    if(data){
        $.ajax({
            url: location.href,
            data: {filter: data},
            type: 'GET',
            beforeSend: function(){
                $('.preloader').fadeIn(300, function(){
                    $('.product-one').hide();
                });
            },
            success: function(res){
                $('.preloader').delay(500).fadeOut('slow', function(){
                    $('.product-one').html(res).fadeIn();
                    var url = location.search.replace(/filter(.+?)(&|$)/g, ''); //$2
                    var newURL = location.pathname + url + (location.search ? "&" : "?") + "filter=" + data;
                    newURL = newURL.replace('&&', '&');
                    newURL = newURL.replace('?&', '?');
                    history.pushState({}, '', newURL);
                });
            },
            error: function () {
                alert('Помилка!');
            }
        });
    }else{
        window.location = location.pathname;
    }
});

/* Поиск */
let products = new Bloodhound({//получение запроса
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        wildcard: '%QUERY',
        url: path + '/search/typeahead?query=%QUERY'
    }
});

products.initialize();

$("#typeahead").typeahead({
    // hint: false,
    highlight: true//подстветка найденого
},{
    name: 'products',
    display: 'title',
    limit: 10,
    source: products //источник данных
});

$('#typeahead').bind('typeahead:select', function(ev, suggestion) {
    //  console.log(suggestion);
    window.location = '/search?s=' + encodeURIComponent(suggestion.title);
});
/* Поиск */

/*Корзина*/
//используем делегирование событий
$('body').on('click', '.add-to-cart-link', function (e){
    e.preventDefault();
    let id = $(this).data('id'),
        qty = $('.quantity input').val() ? $('.quantity input').val() : 1;
        mod = $('.available select').val();
        $.ajax({
            url: '/cart/add',
            data: { id: id, qty:qty, mod:mod},
            type: 'GET',
            success: function (res){
                showCart(res);
            },
            error: function (){
                alert('Помилка! Спробуйте пізніше');
            }
        });
});

//удаление элементов с корзины
$('#cart .modal-body').on('click', '.del-item', function(){
    var id = $(this).data('id');
    $.ajax({
        url: '/cart/delete',
        data: {id: id},
        type: 'GET',
        success: function(res){
            showCart(res);
        },
        error: function(){
            alert('Помилка!');
        }
    });
});

function showCart(cart){
    if($.trim(cart) === '<h3>Кошик пустий</h3>'){
        $('#cart .modal-footer a, #cart .modal-footer .btn-danger').css('display', 'none');
    }else{
        $('#cart .modal-footer a, #cart .modal-footer .btn-danger').css('display', 'inline-block');
    }
    $('#cart .modal-body').html(cart);
    $('#cart').modal();
    if($('.cart-sum').text()){
        $('.simpleCart_total').html($('#cart .cart-sum').text());
    }else{
        $('.simpleCart_total').text('Пустий');
    }
}

function getCart(){
    $.ajax({
        url: '/cart/show',
        type: 'GET',
        success: function (res){
            showCart(res);
        },
        error: function (){
            alert('Помилка! Спробуйте пізніше');
        }
    });
}

function clearCart(){
    $.ajax({
        url: '/cart/clear',
        type: 'GET',
        success: function (res){
            showCart(res);
        },
        error: function (){
            alert('Помилка! Спробуйте пізніше');
        }
    });
}


/*Корзина*/

$('#currency').change(function(){
    window.location = '/currency/change?curr=' + $(this).val();
});

$('.available select').on('change', function(){
    let modId = $(this).val(),
        color = $(this).find('option').filter(':selected').data('title'),
        price = $(this).find('option').filter(':selected').data('price'),
        basePrice = $('#base-price').data('base');
    if(price){
        $('#base-price').text(symboleLeft + price + symboleRight);
    }else{
        $('#base-price').text(symboleLeft + basePrice + symboleRight);
    }
})