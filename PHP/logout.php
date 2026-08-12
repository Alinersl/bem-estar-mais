<?php

session_start();

session_destroy();

header("Location: ../PÁGINAS/index.html");

exit;

?>