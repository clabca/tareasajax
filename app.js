$(function() {

    // variable para comparar si es edicion
    let edit = false

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
                // console.log(response);


                // string a json
                // guarda json en variable tasks
                let tasks = JSON.parse(response);
                
                // declara variable template como string
                let template ='';


                // Mostrar por Consola Resultados
                //console.log(tasks);

                //recorrer las filas
                tasks.forEach(task => {
                // Mostrar por Consola Resultados
                    //console.log(task);

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
                description: $('#description').val(),
                id: $('#taskId').val()

            };
            
            //console.log(postData);
            

            // operador ternario si edit es  true o false
            //edit ? '': '' ;

            // si edit es falso ocupe task-add.php si no task-edit.php
            let url = edit === false ? 'task-add.php' : 'task-edit.php';

            console.log(url)

            // $.post('task-add.php', postData, function(response) {
            $.post(url, postData, function(response) {
                //    console.log(response);
                fetchTasks();

                // Limpiar Formulario
                $('#task-form').trigger('reset');
                edit = false;

                
            });



            //anular comportamiento por defecto
            e.preventDefault();
        });


        function fetchTasks(){
            $.ajax({
                url: 'task-list.php',
                type: 'GET',
                success: function (response) {
                    //console.log(response);
    
                    let tasks = JSON.parse(response);
                    let template ='';
                    tasks.forEach(task =>{
                        template += `
                            <tr taskID="${task.id}">
                                <td>${task.id}</td>
                                <td>
                                    <a href="#" class="task-item" >
                                        ${task.name}
                                    </a>
                                </td>
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

            if (confirm('Estas Seguro de Querer Eliminar El Registro?')){



            //seleccionando el padre del padre del elemento (button) (td) (tr)
            let element = $(this)[0].parentElement.parentElement;

            //tomando el valor del atributo taskId del tr
            let id = $(element).attr('taskId');

             // console.log(id);

            $.post('task-delete.php', {id}, function(response) {
                console.log(response);
                
                
                fetchTasks();


            })
        }


        })

        $(document).on('click', '.task-item', function(){
            //console.log('Editando');

            //seleccionando el padre del padre del elemento (button) (td) (tr)
            let element = $(this)[0].parentElement.parentElement;

            //tomando el valor del atributo taskId del tr
            let id = $(element).attr('taskId');

             //console.log(id);

             $.post('task-single.php', {id}, function(response) {
                //console.log(response);
                
                const task = JSON.parse(response);
                $('#name').val(task.name);
                $('#description').val(task.description);
                $('#taskId').val(task.id);
                // es edicion
                edit = true;
        });
    });
});
