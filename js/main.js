let dark_mode_status;
dark_mode_status = localStorage.getItem('dark_mode_status');

if (dark_mode_status === 'on') {
    var body = document.body;
    body.classList.toggle('dark-body');
    var images = document.getElementsByTagName("img");
    var i;
    console.log(images)
    for (i=0; i<images.length; i++) {
        images[i].classList.toggle('invertible');
    }

    document.getElementById("brightness_1").innerHTML = "dark?";
    document.getElementById("brightness_2").innerHTML = "light mode.";
}

function ToggleDarkMode() {
    var body = document.body;
    body.classList.toggle('dark-body');
    var images = document.getElementsByTagName("img");
    var i;
    for (i=0; i<images.length; i++) {
        images[i].classList.toggle('invertible');
    }


    if (localStorage.getItem("dark_mode_status") === 'off') {
        document.getElementById("brightness_1").innerHTML = "dark?";
        document.getElementById("brightness_2").innerHTML = "light mode.";
        localStorage.setItem("dark_mode_status", 'on');
    }
    else {
        document.getElementById("brightness_1").innerHTML = "bright?";
        document.getElementById("brightness_2").innerHTML = "dark mode.";
        localStorage.setItem("dark_mode_status", 'off');
    }
}