import React from "react";
import StartFirebase from "../firebaseConfig/index";
import { ref, set, get, update, remove, child } from "firebase/database";
import './index.css';

export class Crud extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            db: '',
            username: '',
            fullname: '',
            phonenumber: '',
            dob: ''
        }
        this.interface = this.interface.bind(this);
    }

    componentDidMount() {
        this.setState({
            db: StartFirebase()
        });
    }

    render() {
        return (
            <>
                <label>Enter Username</label>
                <input type='text' id="userbox" value={this.state.username}
                    onChange={e => { this.setState({ username: e.target.value }); }} />
                <br /><br />

                <label>Enter Fullname</label>
                <input type='text' id="userbox" value={this.state.fullname}
                    onChange={e => { this.setState({ fullname: e.target.value }); }} />
                <br /><br />

                <label>Enter Phone Number</label>
                <input type='number' id="phonebox" value={this.state.phonenumber}
                    onChange={e => { this.setState({ phonenumber: e.target.value }); }} />
                <br /><br />

                <label>Choose Date of Birth</label>
                <input type='date' id="datebox" value={this.state.dob}
                    onChange={e => { this.setState({ dob: e.target.value }); }} />
                <br /><br />

                <button id="addBtn" onClick={this.interface}>Add Data</button>
                <button id="updateBtn" onClick={this.interface}>Update Data</button>
                <button id="deleteBtn" onClick={this.interface}>Delete Data</button>
                <button id="selectBtn" onClick={this.interface}>Get Data from DB</button>
            </>
        )
    }

    interface(event) {
        const id = event.target.id;

        if (id == 'addBtn') {
           this.insertData();
        }

        else if (id == 'updateBtn') {
           this.updateData();
        }

        else if (id == 'deleteBtn') {
           this.deleteData();
        }

        else if (id == 'selectBtn') {
           this.selectData();
        }
    }

    getAllInputs() {
        return {
            username: this.state.username,
            name: this.state.fullname,
            phone: Number(this.state.phonenumber),
            dob: this.state.dob
        }
    }

    insertData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        set(ref(db, 'Customer/'+ data.username),
            {
                Fullname: data.name,
                Phonenumber: data.phone,
                dateofbirth: data.dob
            })
            .then(() => { alert('Data was added successfully') })
            .catch((error) => { alert("There was an error, details: " + error) });
    }

    updateData() {
        const db = this.state.db;
        const data = this.getAllInputs();

        update(ref(db, 'Customer/' + data.username),
            {
                Fullname: data.name,
                Phonenumber: data.phone,
                dateofbirth: data.dob
            })
            .then(() => { alert('Data was update successfully') })
            .catch((error) => { alert("There was an error, details: " + error) });
    }

    deleteData() {
        const db = this.state.db;
        const username = this.getAllInputs().username;

        remove(ref(db, 'Customer/' + username))
            .then(() => { alert('Data was delete successfully') })
            .catch((error) => { alert("There was an error, details: " + error) });
    }

    selectData() {
        const dbref = ref(this.state.db);
        const username = this.getAllInputs().username;

        get(child(dbref, 'Customer/' + username)).then((snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    fullname: snapshot.val().Fullname,
                    phonenumber: snapshot.val().Phonenumber,
                    dob: snapshot.val().dateofbirth
                })
            }

            else{
                alert("No data found!");
            }
        })
        .catch((error)=>{alert("There was an error, details: "+error)});
    }

}