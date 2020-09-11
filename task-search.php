<?php
    include('database.php');

    //Guarde la variable search recibida del Post en la variable $search
    $search = $_POST['search'];

    // si $search no es vacio
    if(!empty($search)) {

        //se crea la consulta y se guarda en variable $query
        $query = "SELECT * FROM task WHERE name LIKE '%$search%' ";
        
        //se ejecuta la consulta y la coneccion y se guarda en $result
        $result = mysqli_query($connection, $query);

        //si no hay resultados
        if(!$result){
            //muestre msg con error
            die('Error en la Consulta '. mysqli_error($connection));
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

    }
?>