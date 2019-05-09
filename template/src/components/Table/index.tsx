import React from 'react';
import './index.css';
import { Attributes } from '../../../typings';

interface TableAttributes extends Attributes {
  labelText?: string;
  thresholdText?: string;
  valueText?: string;
}

const Table = ({ data, labelText = 'Label', thresholdText = 'Threshold', valueText = 'Value' }: TableAttributes) => <table>
<thead>
    <tr>
        <th>{labelText}</th>
        <th>{valueText}</th>
        <th>{thresholdText}</th>
    </tr>
</thead>
<tbody>
  {
    data.map((row: any) => <tr key={row.rawLabel + row.threshold} className={row.success ? "success" : "fail"}>
      <td>{row.label}</td>
      <td>{row.value}</td>
      <td>{row.threshold}</td>
    </tr>)
  }
</tbody>
</table>;

export default Table;
