$(function() {
    console.log('jQuery is Working');

    // Capturar del Id=search la accion keyup
    $('#search').keyup(function() {
        //tome el valor de search y guardelo en variable search
        let search = $('#search').val();
        //muestre por consola la variable search
        //console.log(search);

        // uso de ajax con jquery
        $.ajax({
            url: 'task-search.php',
            type: 'POST',
            data: {search},
            success : function(response){
              
                // Mostrar por Consola Resultados
                 console.log(response);


                // string a json
                // guarda json en variable tasks
                let tasks = JSON.parse(response);
                
                // declara variable template como string
                let template ='';


                // Mostrar por Consola Resultados
                console.log(tasks);

                //recorrer las filas
                tasks.forEach(task => {
                // Mostrar por Consola Resultados
                    console.log(task);

                    template += `<li> 
                    ${task.name}
                    </li>`


                });

            }
        })
    })
});
