<?php
    include('database.php');

    //Si Existe la variable name recibida del Post
   if(isset($_POST['name'])) {

        //devuelva la variable name del Post
       //echo $_POST['name'];

        // Crear Variables
        $name = $_POST['name'];
        $description = $_POST['description'];

        // Crear Consulta a Base de Datos
        $query = "INSERT into task(name, description) VALUES ('$name', '$description') ";
        
        // Ejecuta la Consulta
        $result = mysqli_query($connection, $query);

        // si la consulta falla
        if(!$result){
            die('La Consulta Fallo');
        }
        echo 'Tarea Agregada Satisfactoriamente';


   }
    

?>