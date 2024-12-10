import * as cornerstone from "@cornerstonejs/core";
import * as tools  from "@cornerstonejs/tools";
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';

export default async function initCornerstone(){
    if(cornerstone.isCornerstoneInitialized()){
        return;
    }
  
    await cornerstone.init();
    cornerstone.setUseCPURendering(true);
    await tools.init();
    tools.addTool(tools.WindowLevelTool);
    await cornerstoneDICOMImageLoader.init({});
    await cornerstoneDICOMImageLoader.init({});
    
}
