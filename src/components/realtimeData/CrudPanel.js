import React from "react";
import { Buttom, Modal, InputGroup, Form, Button} from "react-bootstrap";
import {ref, set, get, update, remove, child } from 'firebase/database';
import StartFirebase from '../firebaseConfig/index'

const db = StartFirebase();

export class CrudPanel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mode:'',
            isOpen: false,
            record: {
                username: props.username,
                fullname: props.record.Fullname,
                phonenum: props.record.Phonenumber,
                dob: props.record.dateofbirth,
            },
            modUsername:'',
            modFullname:'',
            modPhonenum:'',
            modDob:''
        }
    }

    componentDidMount(){
        console.log(this.state.record);
    }

    render(){
        return (
            <>
                <Button variant='primary' className="ms-2" onClick={()=>{this.openModal('add')}}>Add New Record</Button>
                <Button variant='primary' className="ms-2" onClick={()=>{this.openModal('edit')}}>Edit Record</Button>

                <Modal show={this.state.isOpen}>
                    <Modal.Header>
                        <Modal.Title>{(this.state.mode=='add')? 'Add New Record': 'Edit record'}</Modal.Title>
                        <Button size="sm" variant='dark' onClick={()=>{this.closeModal()}}>X</Button>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Text> Username</InputGroup.Text>
                            <Form.Control 
                                value={this.state.modUsername}
                                onChange={e => { this.setState({ modUsername: e.target.value }) }}
                                disabled = {(this.state.mode != 'add')}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text> Full Name</InputGroup.Text>
                            <Form.Control 
                                value={this.state.modFullname}
                                onChange={e => { this.setState({ modFullname: e.target.value }) }}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text> Phone Number</InputGroup.Text>
                            <Form.Control 
                                value={this.state.modPhonenum}
                                onChange={e => { this.setState({ modPhonenum: e.target.value }) }}
                            />
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text> Date of Birth</InputGroup.Text>
                            <Form.Control 
                                type="date"
                                value={this.state.modDob}
                                onChange={e => { this.setState({ modDob: e.target.value }) }}
                            />
                        </InputGroup>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant='primary' className="ms-2" onClick={()=>{this.interface('add')}} style={(this.state.mode != 'add')? {display:'none'}: {}}>Add New Record</Button>
                        <Button variant='success' className="ms-2" onClick={()=>{this.interface('update')}} style={(this.state.mode == 'add')? {display:'none'}: {}}>Update Record</Button>
                        <Button variant='danger' className="ms-2" onClick={()=>{this.interface('delete')}} style={(this.state.mode == 'add')? {display:'none'}: {}}>Delete Record</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    openModal(option){
        if(option=='add'){
            this.setState({
                isOpen: true,
                mode: option,
                modUsername:'',
                modFullname:'',
                modPhonenum:'',
                modDob:''
            });
        }

        else if(option == 'edit'){
            let rec = this.state.record;

            this.setState({
                isOpen: true,
                mode: option,
                modUsername: rec.username,
                modFullname: rec.fullname,
                modPhonenum: rec.phonenum,
                modDob: rec.dob,
            });
        }

    }

    closeModal(){
        this.setState({
            isOpen: false
        })
    }

    getAllData(){
        return {
            id: this.state.modUsername,
            data:{
                Fullname: this.state.modFullname,
                Phonenumber: this.state.modPhonenum,
                dateofbirth: this.state.modDob,
            }
        }
    }

    interface(option){
        if(option == 'add')
            this.insertData();

        else if(option == 'update')
            this.updateData();

        else if(option == 'delete')
            this.deleteData();

        this.closeModal();
    }

    insertData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/' + record.id;

        get(child(dbRef, 'Customer/' + record.id)).then(snapshot =>{
            if(snapshot.exists()){
                alert('Cannot create, user already exists');
            }

            else{
                set(ref(db, address), record.data);
            }
        })
    }

    updateData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/' + record.id;

        get(child(dbRef, 'Customer/' + record.id)).then(snapshot =>{
            if(snapshot.exists()){
                update(ref(db, address), record.data);
            }

            else{
                alert('Cannot update, does not exists');
            }
        })
    }

    deleteData(){
        const dbRef = ref(db);
        const record = this.getAllData();
        const address = 'Customer/' + record.id;

        get(child(dbRef, 'Customer/' + record.id)).then(snapshot =>{
            if(snapshot.exists()){
                remove(ref(db, address));
            }

            else{
                alert('Cannot delete, does not exists');
            }
        })
    }
}