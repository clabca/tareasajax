$(function() {
    console.log('jQuery is Working');

    // al comenzar ocutar html id=task-result
    $('#task-result').hide();


    //Ejecutar Funcion FetchTasks
    fetchTasks();



    // Capturar del Id=search la accion keyup
    $('#search').keyup(function(e) {


        // si id=search contiene algun valor
        if($('#search').val()){

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

                //selecciona elemento html id=container y llenalo con template  
                $('#container').html(template);


                // Mostrar html id=task-result
                $('#task-result').show();



            }
        })
    }
    });

        $('#task-form').submit(function(e) {

            //console.log('submiting');

            const postData = {
                name: $('#name').val(),
                description: $('#description').val()

            };
            
            console.log(postData);
            
            $.post('task-add.php', postData, function(response) {
                console.log(response);
                fetchTasks();

                // Limpiar Formulario
                $('#task-form').trigger('reset');
                
            });



            //anular comportamiento por defecto
            e.preventDefault();
        });


        function fetchTasks(){
            $.ajax({
                url: 'task-list.php',
                type: 'GET',
                success: function (response) {
                    console.log(response);
    
                    let tasks = JSON.parse(response);
                    let template ='';
                    tasks.forEach(task =>{
                        template += `
                            <tr taskID="${task.id}">
                                <td>${task.id}</td>
                                <td>${task.name}</td>
                                <td>${task.description}</td>
                                <td>
                                    <button class="task-delete btn btn-danger">
                                    Borrar
                                    </button>
                                </td>
                            </tr>
                                       
                        `
    
                    });
    
                    $('#tasks').html(template);
                    
    
                }
            });
    
    



        }

        $(document).on('click', '.task-delete', function(){
            //console.log($(this));

            //seleccionando el padre del padre del elemento (button) (td) (tr)
            let element = $(this)[0].parentElement.parentElement;

            //tomando el valor del atributo taskId del tr
            let id = $(element).attr('taskId');

            //console.log(id);

            // 01:47


        })


});
