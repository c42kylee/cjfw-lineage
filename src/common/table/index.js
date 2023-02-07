import styles from './TableSet.module.scss'
import {useEffect, useState} from 'react'
import {json} from 'd3'

function Table (){
  const [lineageData, setLineageData] = useState([])

  useEffect(() => {
    json("/lineage.json").then((data)=> {
      setLineageData(data.dataLineageList)
    })
  }, [])

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">Lineage ID</th>
          <th scope="col">Source</th>
          <th scope="col">Pipe</th>
          <th scope="col">DataLake</th>
          <th scope="col">Pipe</th>
          <th scope="col">DataMart</th>
        </tr>
      </thead>
      <tbody>
        {lineageData.map((d,index)=>(
          <tr key={`DL${index+0}`} >
            <th scope="row" className={styles.id}>{d.lineage_id}</th>
            <td className={styles.entity}>{d.lineage_contents[0].entity_nm}</td>
            <td>{d.lineage_contents[1].batch_cycle}</td>
            <td className={styles.entity}>{d.lineage_contents[2].entity_nm}</td>
            <td>{d.lineage_contents.length > 3 ? d.lineage_contents[3].batch_cycle : '없음'}</td>
            <td className={styles.entity}>{d.lineage_contents.length > 4 ? d.lineage_contents[4].entity_nm : '없음'}</td>
          </tr> 
        ))}
      </tbody>
      <caption>List of lineage</caption>
    </table>
  )
}

export default Table

