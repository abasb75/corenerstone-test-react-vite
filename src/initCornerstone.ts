import * as cornerstone from "@cornerstonejs/core";
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader';

export default async function initCornerstone(){
    if(cornerstone.isCornerstoneInitialized()){
        return;
    }
  
    await cornerstone.init();
    await cornerstoneDICOMImageLoader.init({});
    
}
