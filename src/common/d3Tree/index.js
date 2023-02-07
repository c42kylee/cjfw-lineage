import styles from './D3Tree.module.scss'
import {json, select, hierarchy, tree, linkHorizontal, scaleOrdinal} from 'd3'
import {useRef, useEffect} from 'react'

function D3Tree() {
  const svgRef = useRef(null)
  // const width = 3000
  // const height = 1000
  // const treeLayout = tree().size([height,width])
  useEffect(() => {
    const svg = select(svgRef.current)

    svg.selectAll("*").remove()

    // svg.attr("viewBox","0 100 1000 1000")

    json("/flare.json").then((data)=> {
      const root = hierarchy(data)
      const colorScale = scaleOrdinal()
        .range(["#0052bb", "#40ab46", "#f4ac4d", "#eb3436", "#0299c6", "#dd4477", "#915300", "#40ab46", "#991a99", "#3375c9", "#f9a7a7", "#005970", "#cccccc", "#696969"])

      const fontSize = 30
      // const padding = 0.5
      // const width = 1200
      const dx = 30
      const dy = 200
      const treeLayout = tree().nodeSize([dx, dy])
      const paths = treeLayout(root).links()
      const pathGenerator = linkHorizontal()
        .x((d)=> d.y)
        .y((d)=> d.x)
      // svg.attr("viewBox",[0, -dy*6/2, width, dy*8])
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
        .selectAll("rect")
        .data(root.descendants())
        .enter()
        .append('rect')
        .attr('width', fontSize)
        .attr('height', fontSize)
        .attr("x",d=>d.y)
        .attr("y",d=>d.x)
        .attr('fill', (d) => colorScale(d))
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
    <div className={styles.tree}>
      <svg ref={svgRef} className={styles.tree}/>
    </div>
  )
}

export default D3Tree
