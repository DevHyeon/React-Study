import React from 'react'
import ContactInfo from './ContactInfo'
import ContactDetails from './ContactDetails'
import ContactCreate from './ContactCreate'

import upadte from 'react-addons-update'


class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [
                {
                    name: '관리자',
                    phone: '010-3232-2323'

                }, {
                    name: '홍길동',
                    phone: '010-0000-1111'

                }, {
                    name: '유령',
                    phone: '010-2222-4444'

                }, {
                    name: '몰라유',
                    phone: '010-1234-1234'

                }, {
                    name: '김만두',
                    phone: '010-3333-2222'

                }

            ]
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        

    }

    

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        })
        console.log(key);
    }

    handleCreate(contact){
        this.setState({
            contactData: upadte(this.state.contactData,{$push: [contact]})
        });
    }

    handleRemove(){
        if(this.state.selectedKey < 0){
            return;
        }
        this.setState({
            contactData: upadte(this.state.contactData,{ $splice: [[this.state.selectedKey,1]]}),
            selectedKey: -1
        
        })
        
    }

    handleEdit(name, phone){
        this.setState({
            contactData: upadte(this.state.contactData,
                {
                    [this.state.selectedKey] : { 
                        name: { $set: name},
                        phone: { $set: phone}
                    }
                    })
        })

    }


    render() {

        const mapToComponents = (data) => {

            data.sort();
            data = data.filter((contact) => {
                //console.log(contact);
                return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
            })
            data.sort();

            return data.map((contact, i) => {
                
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={() => this.handleClick(i)}
                />);
            });
        }

        return (
            
            <div>
                
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="검색"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey !== -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default Contact;
