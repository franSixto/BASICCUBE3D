import * as THREE from 'three';

var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement);

        // CUBE
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        var material = new THREE.MeshStandardMaterial({ color: 0xFFA500 });
        var cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.position.set(0,0,3);
        scene.add(cube);

        // LIGHT
		var lightAmbient = new THREE.AmbientLight(0xff0000, 1, 10);
        var light = new THREE.DirectionalLight(0xffffff, 1, 10);
        light.position.set(-10, 0, 15);
		light.shadow.mapSize.width = 1048; // También puedes probar 4096 para más calidad
		light.shadow.mapSize.height = 1048;
    // No pongas valores exagerados
        light.castShadow = true;
		scene.add(lightAmbient)
        scene.add(light);

        // PLANE
        var planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
        var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xB2FFFF });
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.position.set(0, 0, 0);
        scene.add(plane);

        camera.position.z = 5;
        camera.position.y = 0;
        camera.rotation.x = 0;


        function render() {
           	cube.rotation.x += 0.009
            cube.rotation.y += 0.009
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }
        render();