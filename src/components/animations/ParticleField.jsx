import { useEffect, useRef, useCallback, useState } from 'react';
import { cn } from '../../utils/cn';
import { useTheme } from '../../context/ThemeContext';

export const ParticleField = ({
  particleCount = 150,
  colors = ['#1E5FBB', '#00D4FF', '#8B5CF6'],
  lightModeColors = ['#1e40af', '#0369a1', '#6d28d9'],
  connectionDistance = 120,
  mouseRadius = 150,
  speed = 0.5,
  className,
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const animationRef = useRef(null);
  const visibleRef = useRef(true);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Responsive particle count
  const getResponsiveParticleCount = useCallback(() => {
    if (typeof window === 'undefined') return particleCount;
    const width = window.innerWidth;
    if (width < 640) return Math.floor(particleCount * 0.3); // Mobile: 30%
    if (width < 1024) return Math.floor(particleCount * 0.6); // Tablet: 60%
    return particleCount; // Desktop: 100%
  }, [particleCount]);

  const createParticles = useCallback((width, height) => {
    const particles = [];
    const count = getResponsiveParticleCount();
    const activeColors = isDark ? colors : lightModeColors;
    // Adjust alpha for light mode - particles need to be more visible
    const baseAlpha = isDark ? 0.3 : 0.5;
    const alphaRange = isDark ? 0.5 : 0.4;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + (isDark ? 1 : 1.5),
        color: activeColors[Math.floor(Math.random() * activeColors.length)],
        alpha: Math.random() * alphaRange + baseAlpha,
      });
    }
    return particles;
  }, [getResponsiveParticleCount, colors, lightModeColors, speed, isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    particlesRef.current = createParticles(width, height);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    const handleResize = () => {
      setCanvasSize();
      particlesRef.current = createParticles(width, height);
    };

    const animate = () => {
      // Skip all work while the hero is off-screen. This loop used to run for
      // the entire life of the page — including the whole way down the site —
      // doing an O(n^2) neighbour pass every frame for a canvas nobody could see.
      if (!visibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            particle.vx -= Math.cos(angle) * force * 0.5;
            particle.vy -= Math.sin(angle) * force * 0.5;
          }
        }

        // Apply velocity with damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Ensure minimum movement
        if (Math.abs(particle.vx) < 0.1) particle.vx = (Math.random() - 0.5) * speed;
        if (Math.abs(particle.vy) < 0.1) particle.vy = (Math.random() - 0.5) * speed;

        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check with wrapping
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw connections - theme-aware colors
        const connectionColor = isDark ? '30, 95, 187' : '30, 64, 175';
        const connectionOpacityMultiplier = isDark ? 0.3 : 0.4;

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * connectionOpacityMultiplier;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(${connectionColor}, ${opacity})`;
            ctx.lineWidth = isDark ? 0.5 : 0.8;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Pause the loop whenever the canvas leaves the viewport.
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        ([entry]) => { visibleRef.current = entry.isIntersecting; },
        { rootMargin: '100px' }
      );
      io.observe(canvas);
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      io?.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticles, connectionDistance, mouseRadius, speed, isDark]);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      style={{ pointerEvents: 'auto' }}
    />
  );
};

export default ParticleField;
