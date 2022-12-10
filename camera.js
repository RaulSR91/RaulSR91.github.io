const divCaptureProfilePicture = document.getElementById('divCaptureProfilePicture');
const playImg = document.getElementById('playImg');

const playBtn = document.getElementById('playBtn');
const capture = document.getElementById('captureBtn');
const stopBtn = document.getElementById('stopBtn');
const useImg = document.getElementById('useImg');

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');



const STATUS_CAMERA = {
    INIT: 1,
    CAPTURE: 2,
    CANCEL: 3,
    USE: 4
};


//var CAMERA = STATUS_CAMERA.INIT;


let stream;
let profilePicture;

playImg.addEventListener('click', () => initCapture());
playBtn.addEventListener('click', () => initCapture());

stopBtn.addEventListener('click', () => {
    viewStatusCamera(STATUS_CAMERA.CANCEL);
    stopCamera();
});

useImg.addEventListener('click', () => {
    playImg.src = profilePicture;
    viewStatusCamera(STATUS_CAMERA.USE);
    stopCamera();

});

capture.addEventListener('click', () => {
    const track = stream.getVideoTracks()[0];
    let imageCapture = new ImageCapture(track);
    imageCapture.takePhoto()
        .then(blob => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);

            img.onload = () => {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
                profilePicture = img.src;
                //  URL.revokeObjectURL(img.src);
                viewStatusCamera(STATUS_CAMERA.CAPTURE);
                stopCamera();
            };
        });
})


function initCapture() {

    viewStatusCamera(STATUS_CAMERA.INIT);

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                facingMode: "user"
            })
            .then(mediaStream => {
                player.srcObject = mediaStream;
                stream = mediaStream;
            });
    }
}

function stopCamera() {
    stream.getTracks().forEach(track => {

            if (track.readyState == 'live' && track.kind === 'video') {
                track.stop();
            }
        }

    );

    player.srcObject = null;

}


function showElement(element, show) {
    if (show) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function viewStatusCamera(CAMERA) {
    switch (CAMERA) {
        case STATUS_CAMERA.INIT:
            showElement(divCaptureProfilePicture, true);
            showElement(player, true);
            showElement(canvas, false);

            showElement(playBtn, false);
            showElement(capture, true);
            showElement(stopBtn, true);
            showElement(useImg, false);

            break;
        case STATUS_CAMERA.CAPTURE:
            showElement(canvas, true);
            showElement(player, false);

            showElement(playBtn, true);
            showElement(capture, false);
            showElement(stopBtn, true);
            showElement(useImg, true);
            break;
        case STATUS_CAMERA.USE:
        case STATUS_CAMERA.CANCEL:
            showElement(canvas, false);
            showElement(player, false);
            showElement(divCaptureProfilePicture, false);

            showElement(playBtn, false);
            showElement(capture, false);
            showElement(stopBtn, false);
            showElement(useImg, false);
            break;

    }
}