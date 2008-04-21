<?php

/* $Id$ */

require_once 'config.php';

$dbh->query("CREATE TABLE config_seq (id INTEGER UNSIGNED PRIMARY KEY)");
$dbh->query("CREATE TRIGGER config_seq_cleanup AFTER INSERT ON config_seq
             BEGIN
                 DELETE FROM config_seq WHERE id<LAST_INSERT_ROWID();
             END");

$id = $dbh->nextId('config');

$query = sprintf("INSERT INTO config (id, token, value)
                  VALUES (%d, '%s', '%s')",
                  $id, $_POST['id'], stripslashes($_POST['value']));

$status = $dbh->query($query);

/* sleep for a while so we can see the indicator in demo */
usleep(2000);

$renderer = $_GET['renderer'] ?  $_GET['renderer'] : $_POST['renderer'];
if ('textile' == $renderer) {
    require_once './Textile.php';
    $t = new Textile();
    print $t->TextileThis(stripslashes($_POST['value']));
} else {
    print $_POST['value']; 
}
