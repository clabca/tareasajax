<?php
    include('database.php');

    if(isset($_POST['id'])){
        $id =$_POST['id'];
        
              //se crea la consulta y se guarda en variable $query
            $query = "DELETE FROM task WHERE id=$id ";
            
            //se ejecuta la consulta y la coneccion y se guarda en $result
            $result = mysqli_query($connection, $query);

        // si la consulta falla
        if(!$result){
            die('La Consulta Fallo');
        }
        echo 'Tarea Eliminada Satisfactoriamente';


    }

?>