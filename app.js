$(function() {
    console.log('jQuery is Working');

    // Capturar del Id=search la accion keyup
    $('#search').keyup(function() {
        //tome el valor de search y guardelo en variable search
        let search = $('#search').val();
        //muestre por consola la variable search
        console.log(search);
    })


});
