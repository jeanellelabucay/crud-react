import StartFirebase from '../firebaseConfig/index';
import React from 'react';
import {ref, onValue} from 'firebase/database';
import {Table} from 'react-bootstrap';
import { CrudPanel } from './CrudPanel';

const db = StartFirebase();
let UniqueNumber=0;

export class RealtimeData extends React.Component{
    constructor(){
        super();
        this.state = {
            tableData: []
        }
    }

    componentDidMount(){
        const dbRef = ref(db, 'Customer');

        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key": keyName, "data":data});
            });
            this.setState({tableData: records});
        });
    }

    render(){
        return(
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>Phone Number</th>
                        <th>Date of Birth</th>
                        <th>Control Panel</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.tableData.map((row,index)=>{
                        return(
                        <tr key={UniqueNumber++}>
                            <td>{index+1}</td>
                            <td>{row.key}</td>
                            <td>{row.data.Fullname}</td>
                            <td>{row.data.Phonenumber}</td>
                            <td>{row.data.dateofbirth}</td>
                            <td><CrudPanel username={row.key} record={row.data}/></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }
}