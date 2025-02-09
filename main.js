import * as THREE from 'three';

var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        // CUBE
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshStandardMaterial({ color: 0x2c1861 });
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.position.set(-1,0,3);
        scene.add(cube);

        // LIGHT
		var lightAmbient = new THREE.AmbientLight(0x1bfe9e, 1, 10);
        var light = new THREE.DirectionalLight(0x1bfe9e, 1, 10);
        light.position.set(-10, 0, 15);
		light.shadow.mapSize.width = 2048; // También puedes probar 4096 para más calidad
		light.shadow.mapSize.height = 2048;
    // No pongas valores exagerados
        light.castShadow = true;
		scene.add(lightAmbient)
        scene.add(light);

        // PLANE
        var planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x2c1861 });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.position.set(0, 0, 0);
        scene.add(plane);

        camera.position.z = 4.8;
        camera.position.y = -0.2;
        camera.rotation.x = 0.1;
        camera.rotation.y = 0.1;
        camera.rotation.z = -0;


        function render() {
           	cube.rotation.x += 0.009
            cube.rotation.y += 0.009
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();

        //TEXTS

        const phrases = [
            "todo se reinventa.",
            "todo fluye y gira.",
            "cada giro es un cambio.",
            "el mundo sigue girando.",
            "solo el movimiento es eterno.",
            "todo se transforma en cada vuelta.",
            "cada rotación trae un nuevo destino."
          ];
          
          let currentPhraseIndex = 0;
          const textElement = document.getElementById('animated-text');
          
          function typeWriter(text, i, callback) {
            if (i < text.length) {
              textElement.innerHTML = text.substring(0, i + 1);
              setTimeout(() => typeWriter(text, i + 1, callback), 100); // Velocidad de escritura
            } else if (callback) {
              setTimeout(callback, 2000); // Tiempo que la frase permanece visible
            }
          }
          
          function eraseText(callback) {
            const text = textElement.innerHTML;
            if (text.length > 0) {
              textElement.innerHTML = text.substring(0, text.length - 1);
              setTimeout(() => eraseText(callback), 50); // Velocidad de borrado
            } else if (callback) {
              callback();
            }
          }
          
          function loopPhrases() {
            typeWriter(phrases[currentPhraseIndex], 0, () => {
              eraseText(() => {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                loopPhrases();
              });
            });
          }
          
          loopPhrases();