function lineageList(lineageData){
  const viewList = []
  const lineageDataLen = lineageData.length
  for (let i=0; i < lineageDataLen; i+=1){
    const stepLen = lineageData[i].lineage_contents.length
    const stepList = []
    for (let l=0; l<stepLen; l+=1){
      const lineageContent= lineageData[i].lineage_contents[l]
      switch(l) {
        case 0 :
          stepList.push(lineageContent.entity_nm)
          break
        case 1 :
          stepList.push(lineageContent.batch_cycle)
          break
        case 2 :
          stepList.push(lineageContent.entity_nm)
          break
        case 3 :  
          stepList.push(lineageContent.batch_cycle)
          break
        case 4 :
          stepList.push(lineageContent.entity_nm)
          break
        default :
          stepList.push('NULL')
      }
    }
    viewList.push(stepList)
  }
  return viewList
}

export {lineageList}