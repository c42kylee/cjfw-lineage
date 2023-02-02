import {json, select, hierarchy, tree, linkHorizontal} from 'd3'
import {useRef, useEffect} from 'react'

function D3Tree() {
  const svgRef = useRef(null)
  const width = document.body.clientWidth
  const height = document.body.clientHeight
  console.log(width)
  console.log(height)
  const treeLayout = tree().size([height,width])
  useEffect(() => {
    const svg = select(svgRef.current)

    svg.selectAll("*").remove()

    svg.attr("width", width).attr("height", height)

    json("/flare.json").then((data)=> {
      const root = hierarchy(data)
      const paths = treeLayout(root).links()
      const pathGenerator = linkHorizontal()
        .x((d)=> d.y)
        .y((d)=> d.x)

      svg
        .selectAll("path")
        .data(paths)
        .enter()
        .append("path")
        .attr("fill","none")
        .attr("stroke","#000")
        .attr("stroke-width",1)
        .attr("d",pathGenerator)

      svg
        .selectAll("text")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("opacity", 0.5)
        .attr("color","black")
        .attr("font-size","0.75rem")
        .attr("x",d=>d.y)
        .attr("y",d=>d.x)
        .text((d)=> d.data.name)
    })
  },[])
  return (
    <svg ref={svgRef} />
  )
}

export default D3Tree
