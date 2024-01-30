document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const blackHole = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        mass: 3000
    };

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.velX = (Math.random() - 0.5) * 2;
            this.velY = (Math.random() - 0.5) * 2;
            this.size = 2;
        }

        update() {
            // Gravitational attraction towards the black hole
            const dx = blackHole.x - this.x;
            const dy = blackHole.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const forceDirX = dx / dist;
            const forceDirY = dy / dist;
            const force = blackHole.mass / (dist * dist);
            const accelerationX = forceDirX * force;
            const accelerationY = forceDirY * force;

            this.velX += accelerationX;
            this.velY += accelerationY;

            this.x += this.velX;
            this.y += this.velY;
        }

        draw() {
            ctx.fillStyle = 'white';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    
function createParticles() {
    for (let i = 0; i < 1500; i++) {  // Increase the number of particles
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const particle = new Particle(x, y);

        // For 50% of the particles, adjust the velocity for an orbit effect
        if (i % 2 === 0) {
            const dx = blackHole.x - x;
            const dy = blackHole.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const tangentVelMagnitude = Math.sqrt(blackHole.mass / dist); // Simplified circular orbit velocity

            // Set velocity perpendicular to the radius for orbit effect
            particle.velX = -dy / dist * tangentVelMagnitude;
            particle.velY = dx / dist * tangentVelMagnitude;
        }

        particles.push(particle);
    }
}

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        particles[42].fillStyle = 'red';
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();
    console.log(particles);
});

