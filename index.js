var dateInit = new Date('2024-04-27T19:00:00');

var date_now = new Date();
date_now.setHours(19, 0, 0, 0);

var diff = date_now - dateInit;
var oDays = Math.floor(diff / (1000 * 60 * 60 * 24));

var countDays = document.getElementById('days');
countDays.textContent = oDays;

function randomMovement(element) {
    var deltaX = (Math.random() - 0.5) * 10;
    var deltaY = (Math.random() - 0.5) * 10;

    var currentTop = parseFloat(element.style.top);
    var currentLeft = parseFloat(element.style.left);

    var newTop = currentTop + deltaY;
    var newLeft = currentLeft + deltaX;

    if (newTop < 0) newTop = 0;
    if (newTop > 100) newTop = 100;
    if (newLeft < 0) newLeft = 0;
    if (newLeft > 100) newLeft = 100;

    element.style.top = newTop + '%';
    element.style.left = newLeft + '%';

    checkCollisions(element);
}

function checkCollisions(element) {
    var hearts = document.getElementsByClassName('small-heart');
    for (var i = 0; i < hearts.length; i++) {
        var heart = hearts[i];
        if (heart !== element) {
            var rect1 = element.getBoundingClientRect();
            var rect2 = heart.getBoundingClientRect();
            if (rect1.left < rect2.right &&
                rect1.right > rect2.left &&
                rect1.top < rect2.bottom &&
                rect1.bottom > rect2.top) {

                createExplosion(element);
                break;
            }
        }
    }
}

function createExplosion(element) {

    if (element.dataset.exploding) return;
    element.dataset.exploding = true;

    var container = document.getElementById('heart-container');
    for (var i = 0; i < 4; i++) {
        var smallHeart = document.createElement('div');
        smallHeart.className = 'tiny-heart';
        smallHeart.style.top = element.style.top;
        smallHeart.style.left = element.style.left;
        smallHeart.innerHTML = '&#10084;';
        container.appendChild(smallHeart);

        setTimeout(function (heart) {
            var deltaX = (Math.random() - 0.5) * 20;
            var deltaY = (Math.random() - 0.5) * 20;
            var currentTop = parseFloat(heart.style.top);
            var currentLeft = parseFloat(heart.style.left);
            heart.style.top = (currentTop + deltaY) + '%';
            heart.style.left = (currentLeft + deltaX) + '%';

            setTimeout(function () {
                heart.style.opacity = 0;
                setTimeout(function () {
                    heart.remove();
                }, 1000);
            }, 1000);
        }, 0, smallHeart);
    }

    setTimeout(function () {
        delete element.dataset.exploding;
    }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
    var numHearts = oDays;
    var container = document.getElementById('heart-container');

    for (var i = 0; i < numHearts; i++) {
        var smallHeart = document.createElement('div');
        smallHeart.className = 'small-heart';

        smallHeart.style.top = Math.random() * 100 + '%';
        smallHeart.style.left = Math.random() * 100 + '%';

        smallHeart.innerHTML = '&#10084;';

        container.appendChild(smallHeart);

        setInterval(function (heart) {
            return function () {
                randomMovement(heart);
            };
        }(smallHeart), 2000);
    }
});


var listItem = document.getElementById('item');
listItem.addEventListener('click', function () {
    
    var bigHeart = document.getElementById('big-heart');
    bigHeart.style.opacity = '0';
    bigHeart.style.transition = 'opacity 0.5s ease';

    var imageContainer = document.createElement('div');
    imageContainer.style.opacity = '0';
    imageContainer.style.transition = 'opacity 0.5s ease';
    imageContainer.style.position = 'absolute';
    imageContainer.style.top = '50%';
    imageContainer.style.left = '50%';
    imageContainer.style.transform = 'translate(-50%, -50%) scale(0)';
    
    var image = document.createElement('img');
    image.src = './Imagenes/item_1.jpg';
    image.style.width = '100%';
    image.style.height = 'auto';
    image.style.objectFit = 'cover';
    image.style.objectPosition = 'center';
    
    imageContainer.appendChild(image);
    
    document.body.appendChild(imageContainer);
    
    setTimeout(function () {
        bigHeart.style.display = 'none';
        imageContainer.style.opacity = '1';
        imageContainer.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 100);
    
    setTimeout(function () {
        bigHeart.style.display = 'block';
        bigHeart.style.opacity = '1';
        bigHeart.style.transition = 'opacity 0.5s ease';
        imageContainer.style.opacity = '0';
        imageContainer.style.transform = 'translate(-50%, -50%) scale(0)';
        
        setTimeout(function () {
            document.body.removeChild(imageContainer);
        }, 500);
    }, 5000);
});










