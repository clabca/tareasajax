<?php
    include('database.php');



      //se crea la consulta y se guarda en variable $query
      $query = "SELECT * FROM task ";
      
      //se ejecuta la consulta y la coneccion y se guarda en $result
      $result = mysqli_query($connection, $query);

          // si la consulta falla
          if(!$result){
            die('La Consulta Fallo '. mysqli_error($connection) );
        }
       

        // declara variable $json sera un array
        $json = array();

       //recorrer resultado y almacenar en variable $row
        while($row = mysqli_fetch_array($result)){
            
            //llenar variable $json en cada fila
            $json[] = array(
                'name' => $row['name'],
                'description' => $row['description'],
                'id' => $row['id']

            );
        }

        // toma los datos de $json, los convierte en string y los guarda en una nueva variable $jsonstring
        // json a string
        $jsonstring = json_encode($json);
        echo $jsonstring;


?>