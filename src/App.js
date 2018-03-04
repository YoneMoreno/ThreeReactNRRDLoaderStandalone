/* global THREE */

import React, {Component} from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.stop = this.stop.bind(this);
        this.start = this.start.bind(this);
        this.animate = this.animate.bind(this)
    }

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            1000
        );


        scene.add(camera);

        const loader = new THREE.NRRDLoader();
        loader.load("models/columnasegmentado01.nrrd", function (volume) {
            let sliceZ;


            //z plane

            const indexZ = 0;
            sliceZ = volume.extractSlice('z', Math.floor(volume.RASDimensions[2] / 4));
            sliceZ.name = 'foo';
            console.log(sliceZ);
            scene.add(sliceZ.mesh);

        });

        var renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);


        renderer.setClearColor('#000000');


        this.scene = scene;
        window.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        let controls = new THREE.TrackballControls(camera, renderer.domElement);
        controls.rotateSpeed = 0;
        controls.zoomSpeed = 5;
        controls.panSpeed = 2;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;


        this.mount.appendChild(this.renderer.domElement);
        this.start()
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement)
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId)
    }

    animate() {


        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate)
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div
                style={{width: '2000px', height: '2000px'}}
                ref={(mount) => {
                    this.mount = mount
                }}
            />
        )
    }
}

export default App;
