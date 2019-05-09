import React, { useContext } from 'react';
import HeapSnapshot from '../../containers/HeapSnapshot';
import Lighthouse from '../../containers/Lighthouse';
import Size from '../../containers/Size';
import UnusedSource from '../../containers/UnusedSource';
import DataContext from '../../services/Data';
import { Attributes } from '../../../typings';
import './index.css';

type Container<P = Attributes> = React.FC<P>;

interface Map {
  [name: string]: Container;
}

const map: Map = {
  'Heap Snapshot Checks': HeapSnapshot,
  'Lighthouse Audits': Lighthouse,
  'Size Checks': Size,
  'Unused Source Checks': UnusedSource,
};

const Home = () => {
  const report = useContext(DataContext);

  return (
    <div>
      <header>
        <h1>Modus Create Gimbal Report Viewer</h1>
        <div>Audit result: <strong>{report.success ? 'success' : 'failure'}</strong></div>
      </header>
      <hr />
      {
        report.data.map((data: any) => {
          const Cls = map[data.rawLabel];

          if (Cls) {
            return <div key={data.rawLabel}>
              <h2>{data.label}</h2>
              <Cls data={data.data} />
            </div>;
          }

          console.log(data.rawLabel)

          return null;
        })
      }
    </div>
  );
};

export default Home;
