import React from 'react';
// import TableWrapper from "../../../component/CrewTable/TableStyle";
import TableWrapper from '@iso/containers/Tables/AntTables/AntTables.styles';
import { Form } from 'antd';
import Button from '@iso/components/uielements/button';
import Modal from '@iso/components/Feedback/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Input, { Textarea, InputSearch } from '@iso/components/uielements/input';
import newAddImg from '../../../assets/images/new-inner-list.png';
import { Fieldset, Label } from '../Asset.styles';
import Actions from '../../../redux/drilltype/actions';
import clone from 'clone';
import fakeData from './data';

const dataList = new fakeData(10);

const FormItem = Form.Item;

const { add, initData, updateData, deleteData } = Actions;

export default function (props) {
  const [filtered, setFiltered] = React.useState([]);
  const dispatch = useDispatch();
  const { drillTypes } = useSelector((state) => state.DrillType);

  const [modalActive, setModalActive] = React.useState(false);
  const [pageStatus, setPageStatus] = React.useState('add');
  const [strDrillType, setStrDrillType] = React.useState('');
  const [strDescription, setStrDescription] = React.useState('');
  const [intDrillTypeId, setIntDrillTypeId] = React.useState(null);
  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key',
      width: '10%',
    },
    {
      title: 'Drill Type',
      dataIndex: 'strDrillType',
      key: 'strDrillType',
      width: '30%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'strDescription',
      key: 'strDescription',
      width: '50%',
      render: (text, row) => {
        return <a onClick={() => goDetail(row)}>{text}</a>;
      },
    },
    {
      title: '',
      dataIndex: 'delete',
      key: 'delete',
      width: '50%',
      render: (text, row) => {
        return (
          <Button
            onClick={() => {
              dispatch(deleteData(row._id));
            }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const sortColumns = [
    { ...columns[0], sorter: true },
    { ...columns[1], sorter: true },
    { ...columns[2], sorter: true },
    { ...columns[3], sorter: false },
  ];

  const onChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey && sorter.order) {
      if (sorter.order === 'ascend') {
        dataList.getSortAsc(sorter.columnKey, filtered);
      } else {
        dataList.getSortDesc(sorter.columnKey, filtered);
      }
      setFiltered(filtered);
    }
  };

  const onSave = () => {
    var sendDate = {};
    sendDate.strDrillType = strDrillType;
    sendDate.strDescription = strDescription;
    if (pageStatus == 'add') dispatch(add(sendDate));
    else dispatch(updateData(sendDate, intDrillTypeId));
  };

  React.useEffect(() => {
    dispatch(initData());
  }, []);

  React.useEffect(() => {
    setModalActive(false);
  }, [drillTypes]);

  React.useEffect(() => {
    setFiltered(drillTypes);
  }, [drillTypes]);

  const addItem = () => {
    setPageStatus('add');
    setModalActive(true);
    setStrDescription('');
    setStrDrillType('');
  };

  const goDetail = (row) => {
    setModalActive(true);
    setPageStatus('edit');
    setStrDrillType(row.strDrillType);
    setStrDescription(row.strDescription);
    setIntDrillTypeId(row._id);
  };

  return (
    <div className="isoInvoiceTable">
      {/* <Scrollbars
        style={{ width: "100%", height: "calc(100vh - 70px)" }}
      > */}
      <TableWrapper
        // rowSelection={rowSelection}
        dataSource={filtered}
        columns={clone(sortColumns)}
        onChange={onChange}
        pagination={false}
        className="isoSortingTable"
      />
      {/* </Scrollbars> */}
      <div
        style={{
          color: 'rgb(102, 115, 136)',
          fontSize: '10pt',
          background: '#f7f7f7',
          border: '1px solid rgb(241, 243, 246)',
          height: '25px',
          marginTop: '40px',
        }}
      >
        <span
          style={{
            float: 'left',
            marginLeft: '4px',
            marginRight: '4px',
            cursor: 'pointer',
          }}
        >
          <img
            src={newAddImg}
            onClick={() => {
              addItem();
            }}
          ></img>
        </span>
      </div>

      <Modal
        visible={modalActive}
        title="DRILL TYPE"
        onOk={onSave}
        okText="Save"
        onCancel={() => {
          setModalActive(false);
        }}
      >
        <Form>
          <Fieldset>
            <Label>Drill Type</Label>
            <Input
              label="Drill Type"
              placeholder=""
              value={strDrillType}
              onChange={(event) => {
                setStrDrillType(event.target.value);
              }}
            />
          </Fieldset>
          <Fieldset>
            <Label>Description</Label>
            <Textarea
              label="Description"
              placeholder=""
              rows={3}
              value={strDescription}
              onChange={(event) => {
                setStrDescription(event.target.value);
              }}
            />
          </Fieldset>
        </Form>
      </Modal>
    </div>
  );
}
