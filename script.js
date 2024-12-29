document.getElementById("celebrateButton").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    if (name) {
        // Adı göstərmək
        document.getElementById("celebrationName").textContent = name;
        document.getElementById("celebration").classList.remove("hidden");

        // "Təbriklər" yazısını göstərmək
        document.getElementById("congratsText").classList.remove("hidden");

        // Elementləri gizlətmək
        document.querySelector('.container h1').style.display = 'none';
        document.getElementById("nameInput").style.display = 'none';
        document.getElementById("celebrateButton").style.display = 'none';

        // Atəşfəşanlıq effekti başlatmaq
        startFireworks();

        // Qar dənəcikləri və yolka ağacları yaratmaq
        createSnowflakes();
        createTrees();
    }
});

function startFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    const fireworks = [];
    const particles = [];

    const sound = document.getElementById('fireworksSound');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFirework(x, y) {
        const firework = {
            x,
            y,
            age: 0,
            colors: ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'],
            size: random(2, 3), // Daha böyük atəşfəşanlıq üçün ölçü artırıldı
        };
        fireworks.push(firework);
    }

    function createParticles(x, y) {
        for (let i = 0; i < 150; i++) { // Partlayışların sayını artırdıq
            const particle = {
                x,
                y,
                age: 0,
                life: random(70, 1500), // Həyat müddətini artırdıq
                dx: random(-4, 4),
                dy: random(-4, 4),
                colors: ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'],
                size: random(1, 2), // Daha böyük hissəciklər
            };
            particles.push(particle);
        }
    }

    function updateFireworks() {
        fireworks.forEach((firework, index) => {
            firework.age++;
            if (firework.age > 50) {
                createParticles(firework.x, firework.y);
                fireworks.splice(index, 1);
            }
        });
    }

    function updateParticles() {
        particles.forEach((particle, index) => {
            particle.age++;
            particle.x += particle.dx;
            particle.y += particle.dy;
            if (particle.age > particle.life) {
                particles.splice(index, 1);
            }
        });
    }

    function drawFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks.forEach(firework => {
            ctx.fillStyle = firework.colors[Math.floor(random(0, 4))];
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2); // Döngəyə çəkirik
            ctx.fill();
        });
    }

    function drawParticles() {
        particles.forEach(particle => {
            ctx.fillStyle = particle.colors[Math.floor(random(0, 4))];
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); // Döngəyə çəkirik
            ctx.fill();
        });
    }

    function loop() {
        updateFireworks();
        updateParticles();
        drawFireworks();
        drawParticles();
        requestAnimationFrame(loop);
    }

    resizeCanvas();

    // 4 Fişəng Yaratmaq
    createFirework(canvas.width * 0.2, canvas.height * 0.3);
    createFirework(canvas.width * 0.4, canvas.height * 0.5);
    createFirework(canvas.width * 0.6, canvas.height * 0.4);
    createFirework(canvas.width * 0.8, canvas.height * 0.3);

    // Səs Effekti Oynatmaq
    sound.play();

    window.addEventListener('resize', resizeCanvas);
    loop();
}

function createSnowflakes() {
    const container = document.getElementById('celebration');
    for (let i = 0; i < 100; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${random(5, 10)}s`;
        snowflake.style.width = `${random(5, 15)}px`;
        snowflake.style.height = snowflake.style.width;
        container.appendChild(snowflake);
    }
}

function createTrees() {
    const container = document.getElementById('celebration');
    for (let i = 0; i < 20; i++) {
        const tree = document.createElement('div');
        tree.className = 'tree';
        tree.style.left = `${Math.random() * 100}vw`;
        tree.style.animationDuration = `${random(7, 12)}s`;
        container.appendChild(tree);
    }
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
