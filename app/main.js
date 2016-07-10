import 'babel-polyfill';
import 'three';
import 'bin/TrackballControls';
import MainView from './js/view/MainView';
import GeometryAdapterFactory from './js/adapter/GeometryAdapterFactory';

const view = new MainView();
view.initialize();

function averageVertices(geometryAdapter) {
    const sum = new THREE.Vector3();

    for (let i = 0; i < geometryAdapter.numVertices; i++) {
        sum.add(geometryAdapter.getVertex(i));
    }

    return sum.divideScalar(geometryAdapter.numVertices);
}

const adapterFactory = new GeometryAdapterFactory();
const geometries = [];

// Geometry
geometries.push(new THREE.BoxGeometry( 5, 5, 5 ));

// Indexed BufferGeometry
geometries.push(new THREE.BoxBufferGeometry( 5, 5, 5 ));

// Unindexed BufferGeometry
geometries.push(new THREE.BufferGeometry().fromGeometry(new THREE.BoxGeometry( 5, 5, 5 )));

for (const geometry of geometries) {
    const geometryAdapter = adapterFactory.getAdapter(geometry);

    console.log('Vertices average is:', averageVertices(geometryAdapter));
}