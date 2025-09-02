import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {
    const initParticles = useCallback(async (engine: any) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={initParticles}
            options={{
                fullScreen: { enable: true, zIndex: 0 },
                background: { color: { value: "#000000" } },
                particles: {
                    number: {
                        value: 80,
                        density: { enable: true, area: 800 },
                    },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5 },
                    size: { value: { min: 1, max: 4 } },
                    move: {
                        enable: true,
                        speed: 2,
                        random: true,
                        straight: false,
                        outModes: { default: "out" },
                    },
                    links: {
                        enable: true,
                        distance: 150,
                        color: "#ffffff",
                        opacity: 0.3,
                        width: 1,
                    },
                },
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: true, mode: "push" },
                    },
                    modes: {
                        repulse: { distance: 100 },
                        push: { quantity: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}

export default ParticlesBackground;
