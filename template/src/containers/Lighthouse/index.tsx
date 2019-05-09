import React from 'react';
import Table from '../../components/Table';
import { Attributes } from '../../../typings';

const Lighthouse = ({ data }: Attributes) => <Table data={data} labelText="Category" valueText="Score" />;

export default Lighthouse;
