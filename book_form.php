<?php
$connection = mysqli_connect('localhost', 'root', '', 'book_db');

$error_message = ''; // Inicijalizujemo promenljivu za prikaz greške

if(isset($_POST['posalji'])){
    $ime = $_POST['ime'];
    $email = $_POST['email'];
    $telefon = $_POST['telefon'];
    $adresa = $_POST['adresa'];
    $lokacija = $_POST['lokacija'];
    $gosti = $_POST['gosti'];
    $polazak = $_POST['polazak'];
    $povratak = $_POST['povratak'];

    // Provera da li su polja prazna
    if (!empty($ime) && !empty($email) && !empty($telefon) && !empty($adresa) && !empty($lokacija) && !empty($gosti) && !empty($polazak) && !empty($povratak)) {
        $request = "INSERT INTO book_form (ime, email, telefon, adresa, lokacija, gosti, polazak, povratak) 
                    VALUES ('$ime', '$email', '$telefon', '$adresa', '$lokacija', '$gosti', '$polazak', '$povratak')";

        if(mysqli_query($connection, $request)) {
            header('Location: bukiraj.php');
            exit;
        } else {
            $error_message = 'Greška prilikom unosa u bazu.';
        }
    } else {
        $error_message = 'Sva polja moraju biti popunjena.';
    }
} else {
    $error_message = 'Greška, pokušajte ponovo';
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Forma za bukiranje</title>
</head>
<body>
    <!-- Ovde možete dodati HTML za vašu formu -->
    <!-- Prikazivanje greške -->
    <?php if (!empty($error_message)) { ?>
        <p style="color: red;"><?php echo $error_message; ?></p>
    <?php } ?>
</body>
</html>
