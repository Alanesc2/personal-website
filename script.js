document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const contentSections = document.querySelectorAll('.spline-section, .content-section, .current-projects, .skills');
    
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.visibility = 'hidden';
    });
    
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        contentSections.forEach(section => {
            section.style.transition = 'opacity 3s ease-in-out, visibility 3s';
            section.style.opacity = '1';
            section.style.visibility = 'visible';
        });
        
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 1000);
    }, 5000);

    const texts = ["SWE", "Frontend Dev", "Web Designer", "UI/UX Dev"];
    let speed = 100;
    let textIndex = 0;
    let charIndex = 0;

    function typeWriter() {
        const textElement = document.querySelector(".dynamic-text");
        if (charIndex < texts[textIndex].length) {
            textElement.innerHTML += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, 1000);
        }
    }

    function eraseText() {
        const textElement = document.querySelector(".dynamic-text");
        if (textElement.innerHTML.length > 0) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
            setTimeout(eraseText, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            charIndex = 0;
            setTimeout(typeWriter, 500);
        }
    }

    // Image carousel
    var images = [], x = 0;
    images[0] = "src/Facetune_20-04-2023-11-21-58 2.jpeg";
    images[1] = "src/IMG_0927.jpeg";
    images[2] = "src/IMG_0624.jpeg";

    function displayNextImage() {
        var img = document.getElementById("profile-img");
        img.style.opacity = 0;
        setTimeout(function () {
            x = (x === images.length - 1) ? 0 : x + 1;
            img.src = images[x];
            img.style.opacity = 1;
        }, 1000);
    }

    function startTimer() {
        setInterval(displayNextImage, 5000);
    }

    function fadeIn() {
        document.body.style.opacity = 1;
    }

    function moveHR() {
        const hrElement = document.querySelector(".name_bar");
        let start = null;
        const amplitude = 50;
        const speed = 0.001;

        function animate(timestamp) {
            if (!start) start = timestamp;
            const progress = (timestamp - start) * speed;
            const translateX = Math.sin(progress) * amplitude;

            hrElement.style.background = `linear-gradient(45deg, 
                rgba(179, 176, 170),
                rgba(82, 81, 81, 0.8))`;

            const glowIntensity = Math.abs(translateX / 5);
            hrElement.style.boxShadow = `0 0 20px ${glowIntensity}px rgba(232, 230, 223, 0.3)`;
            
            requestAnimationFrame(animate);
        }

        hrElement.style.transition = 'all 0.2s ease-out';
        hrElement.style.willChange = 'transform, background, box-shadow';
        requestAnimationFrame(animate);
    }

    // Start all animations after loader transitions
    setTimeout(() => {
        var img = document.getElementById("profile-img");
        img.style.opacity = 1;
        startTimer();
        fadeIn();
        typeWriter();
        moveHR();
        animatePeriods();
    }, 5000);
});