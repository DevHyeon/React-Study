import React from 'react'


class ContactDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            name: '',
            phone:'',
        };
        this.handleToggle=this.handleToggle.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleEdit =this.handleEdit.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
    }

    handleEdit(){
        this.props.onEdit(this.state.name,this.state.phone);
    }

    handleToggle(){

        if(this.props.isSelected){

        if(!this.state.isEdit){
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            })
        }else{
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleKeyPress(e){
        if(e.charCode===13){
            this.handleToggle();
        }
    }

    

    render() {

        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>

        );

        const edit = (
            <div>
            <input
                type="text"
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                onKeyPress={this.handleKeyPress}
              />
        </div>
        )

        const view = this.state.isEdit ? edit : details
        
        

        const blank = (<div>선택 안됨</div>);

        return (
            <div>
                <h2>Details</h2>
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>{this.state.isEdit ? "변경" : "수정하기"}</button>
                    <button onClick={this.props.onRemove}>삭제하기</button>
                </p>
            </div>
        )
    }
}

ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
}

export default ContactDetails;
