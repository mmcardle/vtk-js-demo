// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/Geometry';

import Rendering from '@kitware/vtk.js/Rendering';

import vtkRenderWindow from '@kitware/vtk.js/Rendering/Core/RenderWindow';
import vtkSlider from '@kitware/vtk.js/Interaction/UI/Slider';
import vtkCornerAnnotation from '@kitware/vtk.js/Interaction/UI/CornerAnnotation';
import vtkRenderer from '@kitware/vtk.js/Rendering/Core/Renderer';

import vtkOpenGLRenderWindow from '@kitware/vtk.js/Rendering/OpenGL/RenderWindow';

import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkCubeSource from '@kitware/vtk.js/Filters/Sources/CubeSource';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor.js'
import vtkInteractorStyleTrackballCamera from '@kitware/vtk.js/Interaction/Style/InteractorStyleTrackballCamera';

const renderCube = (el) => {

    console.log('render');

    // ----------------------------------------------------------------------------
    // Simple pipeline ConeSource --> Mapper --> Actor
    // ----------------------------------------------------------------------------


    const renderWindow = vtkRenderWindow.newInstance();
    const renderer = vtkRenderer.newInstance({ background: [0.2, 0.3, 0.4] });
    renderWindow.addRenderer(renderer);
    
    const coneSource = vtkCubeSource.newInstance({ height: 1.0 });
    
    const mapper = vtkMapper.newInstance();
    mapper.setInputConnection(coneSource.getOutputPort());
    
    const actor = vtkActor.newInstance();
    actor.setMapper(mapper);
    
    // ----------------------------------------------------------------------------
    // Add the actor to the renderer and set the camera based on it
    // ----------------------------------------------------------------------------
    
    renderer.addActor(actor);
    renderer.resetCamera();
    
    // ----------------------------------------------------------------------------
    // Use OpenGL as the backend to view the all this
    // ----------------------------------------------------------------------------
    
    const openglRenderWindow = vtkOpenGLRenderWindow.newInstance();
    renderWindow.addView(openglRenderWindow);
    

    // ----------------------------------------------------------------------------
    // Create a div section to put this into
    // ----------------------------------------------------------------------------

    const container = document.createElement('div');
    const rootContainer = document.querySelector(el);
    //rootContainer.innerHTML = '';
    rootContainer.appendChild(container);
    openglRenderWindow.setContainer(container);

    // ----------------------------------------------------------------------------
    // Capture size of the container and set it to the renderWindow
    // ----------------------------------------------------------------------------

    const { width, height } = container.getBoundingClientRect();
    console.log('container', width, height)
    openglRenderWindow.setSize(width, height);

    // ----------------------------------------------------------------------------
    // Setup an interactor to handle mouse events
    // ----------------------------------------------------------------------------

    const interactor = vtkRenderWindowInteractor.newInstance();
    interactor.setView(openglRenderWindow);
    interactor.initialize();
    interactor.bindEvents(container);

    // ----------------------------------------------------------------------------
    // Setup interactor style to use
    // ----------------------------------------------------------------------------

    interactor.setInteractorStyle(vtkInteractorStyleTrackballCamera.newInstance());

}

export default renderCube;