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
        .then(response => {
            if (response.success == true) {
                console.log('Updated object data:', response.data);

                document.getElementById('timestamp').innerHTML = new Date().toLocaleString();
                document.getElementById('results').innerHTML = JSON.stringify(response.data, null, 2);

                document.getElementById('stop-btn').removeAttribute('disabled');
                document.getElementById('alert-error').style.display = 'none';
                document.getElementById('results-container').style.display = 'block';
            } else {
                console.error('Failed to fetch object info. A response was returned, but with no data.');
                document.getElementById('alert-error').style.display = 'block';
                document.getElementById('results-container').style.display = 'none';
            }
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
        .then(response => {
            if (response.success == true) {
                console.log('Found object names:', response.data);

                document.getElementById('other_data').innerHTML = response.data.join(", ");
            } else {
                console.error('Failed to fetch object names. A response was returned, but with no data.');
            }
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

    document.getElementById('countdown-container').style.display = 'inline';
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
    document.getElementById('countdown-container').style.display = 'none';
    document.getElementById('countdown').innerHTML = "0s";

    console.log('Refresh loop stopped.');
});
