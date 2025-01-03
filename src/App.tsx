import { loadAndCacheImage } from "@cornerstonejs/core/loaders/imageLoader";
import { useEffect, useRef, useState } from "react"
import initCornerstone from "./initCornerstone";
import { RenderingEngine, getRenderingEngine } from "@cornerstonejs/core";
import * as cornerstone from "@cornerstonejs/core";
import { IStackViewport } from "@cornerstonejs/core/types";
import { Enums, ToolGroupManager, WindowLevelTool } from "@cornerstonejs/tools";
import IToolGroup from "@cornerstonejs/tools/types/IToolGroup";

const imageIds = 'dicomweb:/corenerstone-test-react-vite/3.dcm';

function App() {

  const [isLoaing,setIsLoading] = useState(true);
  const [imageId,setImageId]  = useState("");
  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(imageId){
      renderViewer();
    }
  },[imageId]);

  const renderViewer = async ()=>{

    const renderingEngineId = 're-0';
    const viewportId = 'vp-0';


    if(!viewerRef?.current) return;

    const renderingEngine = getRenderingEngine(renderingEngineId) || new RenderingEngine(renderingEngineId);

    const viewportInput = {
        viewportId,
        element:viewerRef?.current,
        type: cornerstone.Enums.ViewportType.STACK,
    };
    
    if(!renderingEngine.getViewport(viewportId)) {
        renderingEngine.enableElement(viewportInput)
    }
    
    const viewport = renderingEngine.getViewport(viewportId) as IStackViewport;


    viewport.setStack([imageId],0);
    viewport.render();

    setIsLoading(false);

    const toolGroup = ToolGroupManager.createToolGroup("to")  as IToolGroup;
    toolGroup.addTool(WindowLevelTool.toolName);
        
    toolGroup.setToolActive(WindowLevelTool.toolName,{
      bindings: [{ mouseButton: Enums.MouseBindings.Primary }],
    });

    toolGroup.addViewport(viewportId,renderingEngineId);

}

  useEffect(()=>{
    initCornerstone().then(()=>{
      loadAndCacheImage(imageIds).then(image=>{
      setImageId(image.imageId);
      })
    });
  },[]);

  return (
    <div className="w-full h-[100vh] flex items-center justify-center" ref={viewerRef}>
      {isLoaing  ? <span>Loading ...</span>  : <></>}
    </div>
  )
}

export default App
