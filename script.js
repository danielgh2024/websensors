<button id="start">Start</button>

<script>
document.getElementById('start').addEventListener('click', function() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener('devicemotion', function(event) {
                        document.getElementById('acceleration-x').textContent = event.acceleration.x.toFixed(2);
                        document.getElementById('acceleration-y').textContent = event.acceleration.y.toFixed(2);
                        document.getElementById('acceleration-z').textContent = event.acceleration.z.toFixed(2);
                    });

                    window.addEventListener('deviceorientation', function(event) {
                        document.getElementById('rotation-alpha').textContent = event.alpha.toFixed(2);
                        document.getElementById('rotation-beta').textContent = event.beta.toFixed(2);
                        document.getElementById('rotation-gamma').textContent = event.gamma.toFixed(2);
                    });
                }
            })
            .catch(console.error);
    } else {
        // handle regular non iOS 13+ devices
        window.addEventListener('devicemotion', function(event) {
            document.getElementById('acceleration-x').textContent = event.acceleration.x.toFixed(2);
            document.getElementById('acceleration-y').textContent = event.acceleration.y.toFixed(2);
            document.getElementById('acceleration-z').textContent = event.acceleration.z.toFixed(2);
        });

        window.addEventListener('deviceorientation', function(event) {
            document.getElementById('rotation-alpha').textContent = event.alpha.toFixed(2);
            document.getElementById('rotation-beta').textContent = event.beta.toFixed(2);
            document.getElementById('rotation-gamma').textContent = event.gamma.toFixed(2);
        });
    }
});
</script>
