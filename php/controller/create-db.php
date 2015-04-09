<!--The start of the code.-->
<?php
    //requiring the config file for the following code.
    require_once(__DIR__ . "/../model/config.php");
    //this is all for crearting the table and stuff
    $query = $_SESSION["connection"]->query("CREATE TABLE posts ("
            //this is also for creating stuff and its all wonderful.
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "title varchar(255) NOT NULL,"
            . "post text NOT NULL,"
            . "PRIMARY KEY (id))");
    //if this query is false is does the else.
    if($query) {
    }
    else {
    }
    //this is the second query which attempts to create the tables and users or something.
    $query2 = $_SESSION["connection"]->query("CREATE TABLE users ("
               //code that helps do stuff
            . "id int(11) NOT NULL AUTO_INCREMENT,"
            . "username varchar(30) NOT NULL,"
            . "email varchar (50) NOT NULL,"
            . "password char (128) NOT NULL,"
            . "salt char(128) NOT NULL,"
            . "PRIMARY KEY (id))");
    //the second query where if it fails it does the else function which is an error.
    if($query2) {
    }
    else {
        echo "<p id='hide'>" . $_SESSION["connection"]->error . "</p>";
    }