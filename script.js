document.addEventListener("DOMContentLoaded", () => {
	// --- Navbar Mobile Menu ---
	const hamburger = document.querySelector(".hamburger");
	const navLinks = document.querySelector(".nav-links");
	const links = document.querySelectorAll(".nav-links a");

	hamburger.addEventListener("click", () => {
		navLinks.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	links.forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("active");
			hamburger.classList.remove("active");
		});
	});

	// --- Smooth Scrolling with Offset ---
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			const targetId = this.getAttribute("href");
			if (targetId === "#") {
				return;
			}
			e.preventDefault();
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const headerOffset = 80;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth",
				});
			}
		});
	});

	// --- Dropdown Menu Click Toggle (Mobile & Touch Friendly) ---
	const dropdownContainers = document.querySelectorAll(".dropdown-container");
	dropdownContainers.forEach((container) => {
		const trigger = container.querySelector(".dropdown-trigger, .nav-dropdown-trigger");
		if (trigger) {
			trigger.addEventListener("click", (e) => {
				e.preventDefault();
				e.stopPropagation();
				
				const isActive = container.classList.contains("active");
				dropdownContainers.forEach((c) => c.classList.remove("active"));
				
				if (!isActive) {
					container.classList.add("active");
				}
			});
		}
	});

	document.addEventListener("click", () => {
		dropdownContainers.forEach((c) => c.classList.remove("active"));
	});

	// --- Section Fade-In Animation ---
	const observerOptions = {
		root: null,
		rootMargin: "0px",
		threshold: 0.1,
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("fade-in-up");
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const animatedElements = document.querySelectorAll(
		".section-title, .about-content, .skill-category, .timeline-item, .project-card, .hero-content"
	);

	animatedElements.forEach((el) => {
		el.style.opacity = "0";
		el.style.transform = "translateY(20px)";
		el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
		observer.observe(el);
	});

	// Add scroll fade-in animation styles helper
	const styleSheet = document.createElement("style");
	styleSheet.innerText = `
		.fade-in-up {
			opacity: 1 !important;
			transform: translateY(0) !important;
		}
	`;
	document.head.appendChild(styleSheet);

	// --- Dynamic Card Hover Border Glow (Linear/Vercel style) ---
	const projectCards = document.querySelectorAll(".project-card");
	projectCards.forEach((card) => {
		card.addEventListener("mousemove", (e) => {
			const rect = card.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			card.style.setProperty("--mouse-x", `${x}px`);
			card.style.setProperty("--mouse-y", `${y}px`);
		});
		card.addEventListener("mouseleave", () => {
			card.style.setProperty("--mouse-x", "-999px");
			card.style.setProperty("--mouse-y", "-999px");
		});
	});

	// --- Scroll Progress Indicator ---
	const scrollBar = document.getElementById("scroll-bar");
	window.addEventListener("scroll", () => {
		const scrollTop = window.scrollY;
		const docHeight = document.documentElement.scrollHeight - window.innerHeight;
		if (docHeight > 0) {
			const scrollPercentage = (scrollTop / docHeight) * 100;
			if (scrollBar) {
				scrollBar.style.width = `${scrollPercentage}%`;
			}
		}
	});

	// --- Magnetic Interactive Buttons ---
	const magneticButtons = document.querySelectorAll(".btn, .contact-btn, .btn-primary");
	magneticButtons.forEach((btn) => {
		btn.addEventListener("mousemove", (e) => {
			const rect = btn.getBoundingClientRect();
			// Compute element center coordinates relative to viewport
			const btnX = rect.left + rect.width / 2;
			const btnY = rect.top + rect.height / 2;
			const mouseX = e.clientX;
			const mouseY = e.clientY;

			// Distance from button center to mouse cursor
			const distanceX = mouseX - btnX;
			const distanceY = mouseY - btnY;

			// Magnet pull factor (30% pull strength)
			const pullFactor = 0.3;

			// Move the button subtly towards the cursor position
			btn.style.transform = `translate(${distanceX * pullFactor}px, ${distanceY * pullFactor}px)`;
			btn.style.transition = "none";
		});

		btn.addEventListener("mouseleave", () => {
			// Elastic return to base position
			btn.style.transform = "translate(0px, 0px)";
			btn.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
		});
	});

	// --- HTML5 Canvas Interactive 3D Ocean Waves Background & Haki Blast Engine ---
	const canvas = document.getElementById("ambient-canvas");
	if (canvas) {
		const ctx = canvas.getContext("2d");
		let width = (canvas.width = window.innerWidth);
		let height = (canvas.height = window.innerHeight);

		// Handle viewport resizing
		window.addEventListener("resize", () => {
			width = canvas.width = window.innerWidth;
			height = canvas.height = window.innerHeight;
		});

		// Mouse coordinates for ripples
		const mouse = {
			x: null,
			y: null,
			radius: 200,
		};

		// Camera pitch/yaw state
		let pitch = 0.42;
		let yaw = 0;
		let targetPitch = 0.42;
		let targetYaw = 0;

		window.addEventListener("mousemove", (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
			// Tilt camera based on cursor position relative to screen center
			targetYaw = (e.clientX - width / 2) * 0.0003;
			targetPitch = 0.35 + (e.clientY / height) * 0.15;
		});

		window.addEventListener("mouseleave", () => {
			mouse.x = null;
			mouse.y = null;
			targetYaw = 0;
			targetPitch = 0.42;
		});

		// 3D Grid Parameters
		const cols = 32;
		const rows = 22;
		const fov = 380;
		let time = 0;

		// --- Conqueror's Haki Blast Class ---
		class HakiBlast {
			constructor(x, y, isAmbient = false) {
				this.x = x;
				this.y = y;
				this.isAmbient = isAmbient;
				this.maxRadius = isAmbient 
					? Math.min(width, height) * 0.35 
					: Math.max(width, height) * 0.6;
				this.radius = 0;
				this.speed = isAmbient ? 1.5 : 2.5; // Flows slowly
				this.age = 0;
				this.maxAge = isAmbient ? 80 : 120; // Flows slowly over longer period
				this.lightning = [];
				this.shakeIntensity = 0; // Completely stable for reading - no camera shake

				// Generate primary horizontal crackling bolts (exactly 2: one left, one right)
				const baseAngles = [Math.PI, 0];
				baseAngles.forEach(baseAngle => {
					const angle = baseAngle + (Math.random() - 0.5) * 0.1;
					const length = isAmbient 
						? width * 0.35 + Math.random() * 100 
						: width * 0.65 + Math.random() * 200;
					this.lightning.push(this.generateBolt(this.x, this.y, angle, length));
				});
			}

			generateBolt(startX, startY, angle, maxLength) {
				const points = [{ x: startX, y: startY }];
				let curX = startX;
				let curY = startY;
				let curAngle = angle;
				let curLength = 0;
				const branches = [];
				
				const maxSegments = this.isAmbient ? 8 : 15; // Fewer segments
				let segmentCount = 0;

				while (curLength < maxLength && segmentCount < maxSegments) {
					const step = this.isAmbient ? 30 + Math.random() * 20 : 40 + Math.random() * 30;
					// Keep the path flowing smoothly and horizontally (less jagged)
					curAngle = curAngle * 0.8 + angle * 0.2 + (Math.random() - 0.5) * 0.25;
					const nextX = curX + Math.cos(curAngle) * step;
					const nextY = curY + Math.sin(curAngle) * step;

					points.push({ x: nextX, y: nextY });

					// Disabled branching to keep it clean and non-disruptive
					if (Math.random() < 0.1 && curLength > 50 && curLength < maxLength * 0.7 && branches.length < 0) {
						const branchAngle = curAngle + (Math.random() > 0.5 ? 0.5 : -0.5);
						const branchLength = (maxLength - curLength) * 0.4;
						branches.push(this.generateBranch(nextX, nextY, branchAngle, branchLength));
					}

					curX = nextX;
					curY = nextY;
					curLength += step;
					segmentCount++;
				}

				return { points, branches };
			}

			generateBranch(startX, startY, angle, maxLength) {
				const points = [{ x: startX, y: startY }];
				let curX = startX;
				let curY = startY;
				let curAngle = angle;
				let curLength = 0;

				const maxSegments = 4;
				let segmentCount = 0;

				while (curLength < maxLength && segmentCount < maxSegments) {
					const step = 15 + Math.random() * 15;
					curAngle = curAngle * 0.75 + angle * 0.25 + (Math.random() - 0.5) * 0.4;
					const nextX = curX + Math.cos(curAngle) * step;
					const nextY = curY + Math.sin(curAngle) * step;

					points.push({ x: nextX, y: nextY });

					curX = nextX;
					curY = nextY;
					curLength += step;
					segmentCount++;
				}
				return points;
			}

			update() {
				this.age++;
				this.radius += this.speed;
				return this.age >= this.maxAge;
			}

			draw(ctx) {
				const progress = this.age / this.maxAge;
				const fade = progress < 0.1 ? progress / 0.1 : (1 - progress) / 0.9;

				this.lightning.forEach(bolt => {
					// Fully grows the lightning within the first 30% of the lifespan
					const growth = Math.min(1, progress / 0.3);
					const visiblePoints = Math.floor(bolt.points.length * growth);

					if (visiblePoints >= 2) {
						this.drawPath(ctx, bolt.points.slice(0, visiblePoints), fade);
					}

					bolt.branches.forEach(branch => {
						const branchVisible = Math.floor(branch.length * growth);
						if (branchVisible >= 2) {
							this.drawPath(ctx, branch.slice(0, branchVisible), fade * 0.75);
						}
					});
				});
			}

			drawPath(ctx, points, opacity) {
				if (points.length < 2) return;

				// Pass 1: Jet-black outer silhouette (thin outline)
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					ctx.lineTo(points[i].x, points[i].y);
				}
				ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.75})`;
				ctx.lineWidth = this.isAmbient ? 2.0 : 3.5;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.stroke();

				// Pass 2: Shanks' Cloak Red glowing aura (thin flowing stream)
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					ctx.lineTo(points[i].x, points[i].y);
				}
				ctx.strokeStyle = `rgba(192, 57, 43, ${opacity * 0.8})`;
				ctx.lineWidth = this.isAmbient ? 1.0 : 1.8;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.stroke();

				// Pass 3: White-hot Joyboy core (thin central core)
				ctx.beginPath();
				ctx.moveTo(points[0].x, points[0].y);
				for (let i = 1; i < points.length; i++) {
					ctx.lineTo(points[i].x, points[i].y);
				}
				ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.9})`;
				ctx.lineWidth = this.isAmbient ? 0.4 : 0.7;
				ctx.lineCap = "round";
				ctx.lineJoin = "round";
				ctx.stroke();
			}
		}

		const activeBlasts = [];

		function triggerHakiBlast(x, y, isAmbient = false) {
			// Limit concurrent active blasts to 3 to optimize resources
			if (activeBlasts.length >= 3) {
				activeBlasts.shift();
			}
			activeBlasts.push(new HakiBlast(x, y, isAmbient));
		}

		// Trigger a series of blasts (0ms, 130ms, 260ms) to feel like real Conqueror's Haki crackling series
		function triggerHakiBlastSeries(x, y, isAmbient = false) {
			if (isAmbient) {
				triggerHakiBlast(x, y, true);
			} else {
				triggerHakiBlast(x, y, false);
				setTimeout(() => triggerHakiBlast(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, false), 130);
				setTimeout(() => triggerHakiBlast(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, false), 260);
			}
		}

		// Bind events to headings, hero brand logo, and hero titles/roles
		const hakiTargets = document.querySelectorAll(
			".section-title, .hero-title, .hero-role, .logo"
		);

		hakiTargets.forEach(el => {
			el.addEventListener("mouseenter", () => {
				const rect = el.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				triggerHakiBlastSeries(centerX, centerY, false);
			});

			el.addEventListener("click", () => {
				const rect = el.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				triggerHakiBlastSeries(centerX, centerY, false);
			});
		});

		// Ambient Idle crackles (spawns subtle discharges only when page is idle)
		let lastInteraction = Date.now();
		function recordInteraction() {
			lastInteraction = Date.now();
		}
		window.addEventListener("mousemove", recordInteraction);
		window.addEventListener("scroll", recordInteraction);
		window.addEventListener("click", recordInteraction);

		setInterval(() => {
			const now = Date.now();
			if (now - lastInteraction > 4000) { // Idle for 4 seconds
				// Only select elements currently in viewport to save calculation cost
				const visibleTargets = Array.from(hakiTargets).filter(el => {
					const rect = el.getBoundingClientRect();
					return rect.top >= 0 && rect.bottom <= window.innerHeight;
				});

				if (visibleTargets.length > 0) {
					const target = visibleTargets[Math.floor(Math.random() * visibleTargets.length)];
					const rect = target.getBoundingClientRect();
					const centerX = rect.left + rect.width / 2;
					const centerY = rect.top + rect.height / 2;
					triggerHakiBlastSeries(centerX, centerY, true);
				}
				lastInteraction = now - 1500; // Delay next check
			}
		}, 2500);

		function animate() {
			ctx.clearRect(0, 0, width, height);
			time += 0.015;

			const scrollY = window.scrollY;

			// (Screen flash effects disabled for better reading flow)

			// Camera elastic pitch/yaw sways
			pitch += (targetPitch - pitch) * 0.06;
			yaw += (targetYaw - yaw) * 0.06;

			// Add minor automatic idle camera sway
			const ambientSwayX = Math.sin(time * 0.4) * 0.015;
			const ambientSwayY = Math.cos(time * 0.3) * 0.01;
			const currentPitch = pitch + ambientSwayY;
			const currentYaw = yaw + ambientSwayX;

			const camY = 160 + scrollY * 0.06;
			const phaseOffset = time * 1.5 + scrollY * 0.005;

			const spacingX = (width * 1.8) / cols;
			const spacingZ = 950 / rows;

			const cosPitch = Math.cos(currentPitch);
			const sinPitch = Math.sin(currentPitch);
			const cosYaw = Math.cos(currentYaw);
			const sinYaw = Math.sin(currentYaw);

			// Calculate viewport vibration intensity
			let shakeX = 0;
			let shakeY = 0;
			activeBlasts.forEach(blast => {
				if (!blast.isAmbient) {
					const prog = blast.age / blast.maxAge;
					const intensity = blast.shakeIntensity * Math.pow(1 - prog, 2.5);
					const angle = Math.random() * Math.PI * 2;
					shakeX += Math.cos(angle) * intensity;
					shakeY += Math.sin(angle) * intensity;
				}
			});

			const projectedPoints = [];

			// 1. Calculate projected 3D coordinates for all grid points
			for (let i = 0; i < cols; i++) {
				projectedPoints[i] = [];
				for (let j = 0; j < rows; j++) {
					const x3d = (i - cols / 2) * spacingX;
					const z3d = 50 + j * spacingZ;

					// Convex dome swelling factor (radial cosine)
					const distFromCenter = Math.hypot(i - cols / 2, j - rows / 2);
					const maxCenterDist = Math.hypot(cols / 2, rows / 2);
					const domeHeight = Math.cos(Math.min(1, distFromCenter / maxCenterDist) * Math.PI / 2) * 140;

					// Base heights with undulating wave equations
					const w1 = Math.sin(i * 0.28 + phaseOffset) * Math.cos(j * 0.24 - phaseOffset * 0.7) * 45;
					const w2 = Math.cos(j * 0.16 + phaseOffset * 0.5) * 25;
					let y3d = w1 + w2 - domeHeight; // Convex swelling upwards

					// Relative camera coordinates
					const relX = x3d;
					const relY = y3d - camY;
					const relZ = z3d;

					// 3D rotations (Yaw then Pitch)
					const xRot = relX * cosYaw + relZ * sinYaw;
					const zRot1 = -relX * sinYaw + relZ * cosYaw;

					const yRot = relY * cosPitch - zRot1 * sinPitch;
					const zRot2 = relY * sinPitch + zRot1 * cosPitch;

					// Perspective projection
					const scale = fov / (fov + zRot2);
					const px = width / 2 + xRot * scale + shakeX;
					const py = height * 0.65 + yRot * scale + shakeY;

					// Depth cueing opacity (fade into distance)
					let opacity = 1.0 - zRot2 / 950;
					if (opacity < 0) opacity = 0;
					if (opacity > 1) opacity = 1;

					projectedPoints[i][j] = { x: px, y: py, z: zRot2, opacity: opacity };
				}
			}

			// 2. Apply interactive shockwave displacement from Haki Blasts
			activeBlasts.forEach(blast => {
				for (let i = 0; i < cols; i++) {
					for (let j = 0; j < rows; j++) {
						const pt = projectedPoints[i][j];
						const dx = pt.x - blast.x;
						const dy = pt.y - blast.y;
						const dist = Math.hypot(dx, dy);

						const waveWidth = 85;
						if (Math.abs(dist - blast.radius) < waveWidth) {
							const progress = (dist - blast.radius) / waveWidth; // ranges from -1 to 1
							const factor = 1 - Math.abs(progress);
							const waveFade = 1 - (blast.age / blast.maxAge);
							// Distort the height vertically in screen space
							pt.y += Math.sin(progress * Math.PI) * (blast.isAmbient ? 12 : 120) * factor * waveFade;
						}
					}
				}
			});

			// 3. Apply standard interactive mouse ripples
			if (mouse.x !== null && mouse.y !== null) {
				for (let i = 0; i < cols; i++) {
					for (let j = 0; j < rows; j++) {
						const pt = projectedPoints[i][j];
						const dx = pt.x - mouse.x;
						const dy = pt.y - mouse.y;
						const dist = Math.hypot(dx, dy);

						if (dist < mouse.radius) {
							const factor = (mouse.radius - dist) / mouse.radius;
							pt.y += Math.sin(dist * 0.05 - time * 12) * 24 * factor;
						}
					}
				}
			}

			// 4. Draw grid lines connecting the projected points
			for (let i = 0; i < cols; i++) {
				for (let j = 0; j < rows; j++) {
					const pt = projectedPoints[i][j];
					if (pt.opacity <= 0) continue;

					// Base color determined by depth (Z-distance) and active theme
					const depthRatio = pt.z / 950;
					const isLight = document.body.classList.contains("light-theme");
					let baseColor;
					if (isLight) {
						if (depthRatio < 0.28) {
							baseColor = `rgba(40, 30, 24, ${pt.opacity * 0.14})`; // Near: Oil Charcoal Ink
						} else if (depthRatio < 0.68) {
							baseColor = `rgba(90, 70, 58, ${pt.opacity * 0.10})`; // Mid: Sepia/Oak Brown
						} else {
							baseColor = `rgba(184, 141, 62, ${pt.opacity * 0.08})`; // Far: Vintage Gold-Tan
						}
					} else {
						if (depthRatio < 0.28) {
							baseColor = `rgba(192, 57, 43, ${pt.opacity * 0.25})`; // Near: Shanks' Cloak Red
						} else if (depthRatio < 0.68) {
							baseColor = `rgba(212, 160, 23, ${pt.opacity * 0.18})`; // Mid: Treasure Gold
						} else {
							baseColor = `rgba(38, 166, 154, ${pt.opacity * 0.12})`; // Far: Ocean Blue-Teal
						}
					}

					// Connect horizontally
					if (i < cols - 1) {
						const nextPt = projectedPoints[i + 1][j];
						if (nextPt.opacity > 0) {
							ctx.beginPath();
							ctx.moveTo(pt.x, pt.y);
							ctx.lineTo(nextPt.x, nextPt.y);
							ctx.strokeStyle = baseColor;
							ctx.lineWidth = pt.opacity * 1.5;
							ctx.stroke();
						}
					}

					// Connect vertically
					if (j < rows - 1) {
						const nextPt = projectedPoints[i][j + 1];
						if (nextPt.opacity > 0) {
							ctx.beginPath();
							ctx.moveTo(pt.x, pt.y);
							ctx.lineTo(nextPt.x, nextPt.y);
							ctx.strokeStyle = baseColor;
							ctx.lineWidth = pt.opacity * 1.5;
							ctx.stroke();
						}
					}
				}
			}

			// 5. Update and Draw active Haki Blasts
			for (let i = activeBlasts.length - 1; i >= 0; i--) {
				const blast = activeBlasts[i];
				blast.draw(ctx);
				if (blast.update()) {
					activeBlasts.splice(i, 1);
				}
			}

			requestAnimationFrame(animate);
		}

		animate();
	}

	// --- Theme Toggle (Dark Mode as Default, Wanted Poster as Light Mode) ---
	const themeToggle = document.getElementById("theme-toggle");
	if (themeToggle) {
		const icon = themeToggle.querySelector("i");
		
		// Check for stored preference
		const currentTheme = localStorage.getItem("theme");
		if (currentTheme === "light") {
			document.body.classList.add("light-theme");
			icon.className = "fas fa-moon"; // Moon icon in light mode
		} else {
			icon.className = "fas fa-sun"; // Sun icon in dark mode
		}
		
		themeToggle.addEventListener("click", (e) => {
			const isCurrentlyLight = document.body.classList.contains("light-theme");
			const targetThemeLight = !isCurrentlyLight;
			
			// Get button or click position
			const rect = themeToggle.getBoundingClientRect();
			const x = e.clientX || (rect.left + rect.width / 2);
			const y = e.clientY || (rect.top + rect.height / 2);
			
			// Create transition overlay
			const overlay = document.createElement("div");
			overlay.className = "theme-transition-overlay";
			overlay.style.left = `calc(${x}px - 125vmax)`;
			overlay.style.top = `calc(${y}px - 125vmax)`;
			
			if (targetThemeLight) {
				overlay.classList.add("sunrise-transition");
			} else {
				overlay.classList.add("sunset-transition");
			}
			
			document.body.appendChild(overlay);
			
			// Add transition helper class to body for slow color blending
			document.body.classList.add("theme-toggling");
			
			// Force reflow
			overlay.offsetWidth;
			
			// Activate expansion
			overlay.classList.add("active");
			
			// Switch theme variables when screen is fully covered (600ms)
			setTimeout(() => {
				if (targetThemeLight) {
					document.body.classList.add("light-theme");
					icon.className = "fas fa-moon"; // Moon icon in light mode
					localStorage.setItem("theme", "light");
				} else {
					document.body.classList.remove("light-theme");
					icon.className = "fas fa-sun"; // Sun icon in dark mode
					localStorage.setItem("theme", "dark");
				}
			}, 600);
			
			// Start fading out overlay
			setTimeout(() => {
				overlay.classList.add("fade-out");
			}, 1000);
			
			// Remove overlay and clean up toggling class
			setTimeout(() => {
				overlay.remove();
				document.body.classList.remove("theme-toggling");
			}, 2000);
		});
	}
});
