const REFRESH_TIME_IN_MS = parseFloat("{{ refresh_time_in_ms }}") || 60000;
let countdownInterval = null;
let refreshInterval = null;

function startCountdown(seconds) {
    const countdownElement = document.getElementById('countdown');
    let remainingSeconds = seconds;

    let timer = setInterval(function () {
        if (remainingSeconds <= 0) {
            clearInterval(timer);
            countdownElement.innerHTML = '0s';
            return;
        }
        countdownElement.innerHTML = Math.floor(remainingSeconds / 1000) + 's';
        remainingSeconds--;
    }, 1000);

    return timer; // Return the interval ID
}

function fetch_object_info() {
    const astro_name = document.querySelector('input[name="astro_name"]').value;
    console.log('Requesting object data for:', astro_name);

    fetch('/info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ astro_name: astro_name, }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Updated object data:', data);

            document.getElementById('timestamp').innerHTML = new Date().toLocaleString();
            document.getElementById('result').innerHTML = JSON.stringify(data, null, 2);

            document.getElementById('stop-btn').removeAttribute('disabled');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function fetch_object_find() {
    const astro_name = document.querySelector('input[name="astro_name"]').value;
    console.log('Requesting object names for:', astro_name);

    fetch('/find', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ astro_name: astro_name, }),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Found object names:', data);

            document.getElementById('other_data').innerHTML = data.join(", ");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function start_refresh_loop() {
    fetch_object_info();

    // Start the countdown
    if (countdownInterval !== null) {
        clearInterval(countdownInterval); // Clear the previous countdown
    }
    countdownInterval = startCountdown(REFRESH_TIME_IN_MS);
}

document.getElementById('object_form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Fetch other data immediately
    fetch_object_find();

    // Fetch data immediately and then every N seconds
    if (refreshInterval !== null) {
        clearInterval(refreshInterval); // Clear the previous interval
    }
    start_refresh_loop();
    if (REFRESH_TIME_IN_MS > 0) {
        refreshInterval = setInterval(start_refresh_loop, REFRESH_TIME_IN_MS);
    }
});

document.getElementById('stop-btn').addEventListener('click', function (event) {
    event.preventDefault();

    // window.location.reload();
    clearInterval(refreshInterval);

    document.getElementById('stop-btn').setAttribute('disabled', true);
    document.getElementById('countdown').innerHTML = "0s";

    console.log('Refresh loop stopped.');
});
