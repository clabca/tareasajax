<?php
    include('database.php');


        // Crear Variables
        $id = $_POST['id'];
        $name = $_POST['name'];
        $description = $_POST['description'];

        // Crear Consulta a Base de Datos
        $query = "UPDATE task SET name = '$name' , description = '$description' WHERE id = '$id' ";
        
        // Ejecuta la Consulta
        $result = mysqli_query($connection, $query);

        // si la consulta falla
        if(!$result){
            die('La Consulta Fallo');
        }
        echo 'Tarea Modificada Satisfactoriamente';

?>