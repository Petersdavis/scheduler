import React, { Component } from 'react';
import Modal from 'react-modal';
import './App.css';
import './bootstrap-theme.min.css';
import './bootstrap.min.css';
import './fonts.css';

import './glyphicons-halflings-regular.svg';
import './glyphicons-halflings-regular.eot';
import './glyphicons-halflings-regular.ttf';
import './glyphicons-halflings-regular.woff';
import './glyphicons-halflings-regular.woff2';
import {validatePrice} from './boilerplate.js';
import {Glyphicon, Row, Col, Button, FormControl} from 'react-bootstrap';



class GetShift extends React.Component{
	
	constructor(props){
		super(props);
		
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.saveShift = this.saveShift.bind(this);
		this.validateShift = this.validateShift.bind(this);
		this.handleDeleteClick = this.handleDeleteClick.bind(this);
	}
	handleDeleteClick(e){
		this.props.handleDeleteClick();
	}
	closeModal(){
		this.props.closeModal()
	}
	handleClick(e){
	 this.props.handleClick(e.target.getAttribute("time_index"), e.target.getAttribute("quarts_index"));	
	}
	
	validateShift(shift){
		
	}
	
	handleMouseEnter(e){
		this.props.handleMouseEnter(e.target.getAttribute("time_index"));
	}
	
	saveShift(e){
	 this.props.deleteEmployee(e.target.getAttribute("employee_id"));	
	}
		
	render(){
		const times = ["9:","10:","11:","12:","1:","2:","3:","4:","5:","6:","7:","8:","9:","10:","11:"];
		const quarts = ["00", "15","30","45"];
		const isOpen = this.props.isOpen;
		const pos = this.props.pos;
		const appElement = document.getElementById('root');
		var modal_style={
			overlay: {
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  backgroundColor: 'rgba(255, 255, 255, 0.75)'
			},
			content: {
			  position: 'fixed',
			  top: '40px',
			  left: '40px',
			  right: '40px',
			  bottom: '40px',
			  border: '1px solid #ccc',
			  background: '#fff',
			  overflow: 'auto',
			  WebkitOverflowScrolling: 'touch',
			  borderRadius: '4px',
			  outline: 'none',
			  padding: '20px'
			}
		  };
		modal_style.content.left = pos.x +5;
		modal_style.content.right = window.innerWidth -(pos.x +200);
		  
		  
		const container_style = {
			width:'100px',
			position:'relative'
		}
		const quarts_style = {
			position:'absolute',
			top:'-30px',
			left:'100px',
			width:'30px'
			
		}
		
		const quart_style = {
			padding:'1px',
			borderRadius:'12px',
			height:'30px',
			margin:'1px'
		}
		const customstyle = {
		  padding: '5px',
		  marginTop:0,
		  fontWeight:'bold',
		  maxWidth:'100px'
		};
		const shift_helper = this.props.shift_helper;
		var x; 
		var rows = [];
		var bsStyle = ""
		var has_quarts = 0
		var cur_time;
		
		var start_time 
		if(!shift_helper.id){
			shift_helper.id = -1
		}
		
		if(shift_helper.start_time !== 0){
			start_time= times[shift_helper.start_time.hour] + quarts[shift_helper.start_time.quart]
		}else{
			start_time = ""
			
		}
				
		for(x=0;x<times.length;++x){
			if(shift_helper.last_entered == x && (shift_helper.start_time == 0 || shift_helper.start_time.hour < x )){
				has_quarts = 1
				bsStyle = "primary";
			}else if(shift_helper.last_entered > x && (shift_helper.start_time != 0 && shift_helper.start_time.hour<x)){
				has_quarts = 0;
				bsStyle = "primary";
			}else{
				has_quarts = 0;
				bsStyle = "default";
			}
			
			if(shift_helper.start_time !== 0 && shift_helper.start_time.hour == x){
				cur_time =  times[shift_helper.start_time.hour] +  quarts[shift_helper.start_time.quart];
				bsStyle = "primary";
			}else{
				cur_time = times[x] + "00"
			}
								
			rows.push(
			<div key = {x} style={container_style}>	
			<Button 
			time_index = {x}
			quarts_index = {0}
			onMouseEnter = {this.handleMouseEnter}
			onClick = {this.handleClick}
			style = {customstyle} 
			bsStyle = {bsStyle} block>
					{cur_time}
			</Button >
			
			{has_quarts==1 &&
			      	<div 
			      	  style = {quarts_style}
			      	>
			      		<Button
			      			onClick = {this.handleClick}
			      			time_index = {x}
			      			quarts_index = {1}
			      			bsStyle = 'primary'
			      			style = {quart_style}
			      			block
			      			> {quarts[1]}
			      		</Button>
			      		<Button
			      			onClick = {this.handleClick}
			      			time_index = {x}
			      			quarts_index = {2}
			      			bsStyle = 'primary'
			      			style = {quart_style}
			      			block
			      			> {quarts[2]}
			      		</Button>
			      		<Button
			      			onClick = {this.handleClick}
			      			time_index = {x}
			      			quarts_index = {3}
			      			bsStyle = 'primary'
			      			style = {quart_style}
			      			block
			      			>{quarts[3]}
			      			</Button>		      	
			      	</div>
			      	
			}
					
					</div>
			)
		}
			
		return(<div >
			<Modal 
				style = {modal_style}
				appElement = {appElement}
				isOpen={isOpen}
				onRequestClose={this.closeModal}
				contentLabel="Edit Employee">
				<h2>Shift Time: {start_time}  
				<Button
					block
					bsStyle = "default"
					onClick = {this.handleDeleteClick}
									
					><Glyphicon glyph="trash" /> Delete
				</Button>
				
				</h2>
				<div style = {container_style}>
				{rows}
				</div>
				
				
				
			</Modal>
			
			
			</div>);
	}
}

class EditEmployee extends React.Component{
	constructor(props){
		super(props);
		
		this.closeModal = this.closeModal.bind(this);
		this.handleEmployeeChange = this.handleEmployeeChange.bind(this);
		this.handleEmployeeDelete = this.handleEmployeeDelete.bind(this);
		
	}
	
	
	
	closeModal(){
		var employees = this.props.employees;
		var employee_id = this.props.id;
		var employee, x;
		for(x=0;x<employees.length;++x){
			if(employees[x].id == employee_id){
				employee = employees[x];
			}
		}
		if(employee.name == ""){
			this.props.deleteEmployee(employee_id)	
		}
		this.props.closeModal()
	}
	handleEmployeeChange(e){
      this.props.saveEmployee(e.target.value, e.target.getAttribute("employee_id"));	
	}
	handleEmployeeDelete(e){
	 this.props.deleteEmployee(e.target.getAttribute("employee_id"));	
	}
		
	render(){
		const appElement = document.getElementById('root');
		const employees = this.props.employees;
		const employee_id = this.props.id;
		const isOpen = this.props.isOpen;
		const pos = this.props.pos;
		const width = 600;
		const height = 200;
		var modal_style={
			overlay: {
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  backgroundColor: 'rgba(255, 255, 255, 0.75)'
			},
			content: {
			  position: 'fixed',
			  top: '40px',
			  left: '40px',
			  right: '40px',
			  bottom: '40px',
			  border: '1px solid #ccc',
			  background: '#fff',
			  overflow: 'none',
			  WebkitOverflowScrolling: 'touch',
			  borderRadius: '4px',
			  outline: 'none',
			  padding: '20px',
			 
			}
		  };
		if(isOpen){ 
			console.log(pos.y + "..." +pos.x)
		if(pos.y < height){
			modal_style.content.top = pos.y +5;
			modal_style.content.bottom = window.innerHeight - pos.y - height;
			
		}else if (pos.y > window.innerHeight - height){
			modal_style.content.top = pos.y - height;
			modal_style.content.bottom =window.innerHeight - pos.y ;
		}else{
			modal_style.content.top = pos.y - height/2;
			modal_style.content.bottom =window.innerHeight -  pos.y - height/2;
		}
			
		if(pos.x > window.innerWidth - width){
			
			modal_style.content.right =window.innerWidth- pos.x +5;
			modal_style.content.left =pos.x - width;
		} else if (pos.x < width){
			modal_style.content.left = pos.x+5;
			modal_style.content.right =window.innerWidth-pos.x-width;
		}else{
			modal_style.content.right = window.innerWidth-pos.x  - width/2;
			modal_style.content.left = pos.x -width/2;
			
		}
	  }
		
		
		var x, employee;
		
		if(employee_id == -1){
		 employee = {name:"", id:-1};	
		}
		for(x=0;x<employees.length;++x){
			if(employees[x].id == employee_id){
				employee = employees[x];
			}
		}
			
		return(<div>
			<Modal 
				style = {modal_style}
				appElement = {appElement}
				isOpen={isOpen}
				onRequestClose={this.closeModal}
				contentLabel="Edit Employee">
				<h2> Edit Employee: </h2>
				<Row>
				<Col xs ={8}>
					<FormControl 
						bsSize = "lg"
						employee_id = {employee_id}
						value = {employee.name}
						onChange={this.handleEmployeeChange}
						>
					
					</FormControl>
				</Col>
				<Col xs = {4}>
					<Button 
					onClick = {this.handleEmployeeDelete}
					employee_id = {employee.id} 
					bsStyle = "default" 
					bsSize = "lg"
					block>
						<Glyphicon glyph="trash" /> Delete
					</Button>
				
				</Col>
				</Row>
				
			</Modal>
			
			
			</div>);
	}
}

class GetSales extends React.Component{
	constructor(props){
		super(props);
		
		
		this.closeModal = this.closeModal.bind(this);
		this.handleSalesChange = this.handleSalesChange.bind(this);
		
	}
	
		
	closeModal(){
		this.props.closeModal()
	}
	handleSalesChange(e){
	 this.props.saveSales(e.target.value, this.props.day);	
	}
		
	render(){
		const appElement = document.getElementById('root');
		const isOpen = this.props.isOpen
		const day = this.props.day
		const week = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] 
		
		const pos = this.props.pos;
		const width = 600;
		const height = 200;
		var modal_style={
			overlay: {
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  backgroundColor: 'rgba(255, 255, 255, 0.75)'
			},
			content: {
			  position: 'fixed',
			  top: '40px',
			  left: '40px',
			  right: '40px',
			  bottom: '40px',
			  border: '1px solid #ccc',
			  background: '#fff',
			  overflow: 'none',
			  WebkitOverflowScrolling: 'touch',
			  borderRadius: '4px',
			  outline: 'none',
			  padding: '20px',
			 
			}
		  };
		if(isOpen){ 
			console.log(pos.y + "..." +pos.x)
		if(pos.y < height){
			modal_style.content.top = pos.y +5;
			modal_style.content.bottom = window.innerHeight - pos.y - height;
			
		}else if (pos.y > window.innerHeight - height){
			modal_style.content.top = pos.y - height;
			modal_style.content.bottom =window.innerHeight - pos.y ;
		}else{
			modal_style.content.top = pos.y - height/2;
			modal_style.content.bottom =window.innerHeight -  pos.y - height/2;
		}
			
		if(pos.x > window.innerWidth - width){
			
			modal_style.content.right =window.innerWidth- pos.x +5;
			modal_style.content.left =pos.x - width;
		} else if (pos.x < width){
			modal_style.content.left = pos.x+5;
			modal_style.content.right =window.innerWidth-pos.x-width;
		}else{
			modal_style.content.right = window.innerWidth-pos.x  - width/2;
			modal_style.content.left = pos.x -width/2;
			
		}
	  }
		
		
		
		return(<div>
			<Modal 
				style={modal_style}
				appElement = {appElement}
				isOpen={isOpen}
				onRequestClose={this.closeModal}
				contentLabel="Set Sales">
				<h2> Set Total Sales for {week[day]} </h2>
				
				<FormControl 
					bsSize = "lg"
					value = {this.props.sales[this.props.day]}
					onChange={this.handleSalesChange}
					>
					
					</FormControl>
				
			</Modal>
			
			
			</div>);
	}
}

class GetTips extends React.Component{
	
	constructor(props){
		super(props);
		
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleTipsChange = this.handleTipsChange.bind(this);
		
	}
	
	openModal(){
		this.props.setTips();
	}
	
	closeModal(){
		this.props.closeModal()
	}
	handleTipsChange(e){
	 this.props.saveTips(e.target.value, this.props.day);	
	}
		
	render(){
		const appElement = document.getElementById('root');
		const tips = this.props.tips
		const isOpen = this.props.isOpen
		const day = this.props.day
		const week = ['Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] 
		
		const pos = this.props.pos;
		const width = 600;
		const height = 200;
		var modal_style={
			overlay: {
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  right: 0,
			  bottom: 0,
			  backgroundColor: 'rgba(255, 255, 255, 0.75)'
			},
			content: {
			  position: 'fixed',
			  top: '40px',
			  left: '40px',
			  right: '40px',
			  bottom: '40px',
			  border: '1px solid #ccc',
			  background: '#fff',
			  overflow: 'none',
			  WebkitOverflowScrolling: 'touch',
			  borderRadius: '4px',
			  outline: 'none',
			  padding: '20px',
			 
			}
		  };
		if(isOpen){ 
			console.log(pos.y + "..." +pos.x)
		if(pos.y < height){
			modal_style.content.top = pos.y +5;
			modal_style.content.bottom = window.innerHeight - pos.y - height;
			
		}else if (pos.y > window.innerHeight - height){
			modal_style.content.top = pos.y - height;
			modal_style.content.bottom =window.innerHeight - pos.y ;
		}else{
			modal_style.content.top = pos.y - height/2;
			modal_style.content.bottom =window.innerHeight -  pos.y - height/2;
		}
			
		if(pos.x > window.innerWidth - width){
			
			modal_style.content.right =window.innerWidth- pos.x +5;
			modal_style.content.left =pos.x - width;
		} else if (pos.x < width){
			modal_style.content.left = pos.x+5;
			modal_style.content.right =window.innerWidth-pos.x-width;
		}else{
			modal_style.content.right = window.innerWidth-pos.x  - width/2;
			modal_style.content.left = pos.x -width/2;
			
		}
	  }
		
		
		
		return(<div>
			<Modal 
				style = {modal_style}
				appElement = {appElement}
				isOpen={isOpen}
				onRequestClose={this.closeModal}
				contentLabel="Set Tips">
				<h2> Set Total Tips for {week[day]} </h2>
				
				<FormControl 
					bsSize = "lg"
					value = {this.props.tips[this.props.day]}
					onChange={this.handleTipsChange}
					>
					
					</FormControl>
				
			</Modal>
			
			
			</div>);
	}
}


class PrevSchedule  extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e){
	 this.props.handleClick(e);	
	}
	
	
	render(){
		var  style = {display:"inline-block", width:"50%",  padding:"0", margin:"0"}
		return(
		<div
			style = {style}
		>
			<Button	
			block
			bsSize = "lg"
			bsStyle="primary" 
			onClick= {this.handleClick}
			>
				<Glyphicon glyph = "arrow-left" />
			</Button>
		</div>);
	}
	
}


class NextSchedule  extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e){
	 this.props.handleClick(e);	
	}
	
	
	render(){
		var  style = {display:"inline-block", width:"50%",  padding:"0", margin:"0"}
		return(
		 <div style = {style}>
			<Button	
			block
			bsSize = "lg"
			bsStyle="primary" 
			onClick= {this.handleClick}
			>
			<Glyphicon glyph = "arrow-right" />
			</Button>
		</div>
		);
	}
	
}

class PrintSchedule extends React.Component{
	render(){
		var schedule_id = this.props.schedule_id;
		var link = "./print.html#" + schedule_id;
		return(<a href = {link} target = "_blank">
			<Button	
			bsSize = "lg"
			bsStyle="primary" 
			block
			
			>
				<Glyphicon glyph = "print" /> Schedule
			</Button>
			</a>
		);
			
	}
}
class NewSchedule  extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e){
	 this.props.handleClick(e);	
	}
	
	
	render(){
		return(
		
			<Button	
			bsSize = "lg"
			bsStyle="primary" 
			block
			onClick= {this.handleClick}
			>
				New Schedule
			</Button>
	);
	}
	
}

class NewEmployee extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(e){
	 this.props.handleClick(e);	
	}
	
	
	render(){
		return(
			
				
			<Button	
			block
			style = {{background:"lightgrey", color:"#222", height:"45px", fontSize:"18px"}}
			bsSize = "lg"
			onClick= {this.handleClick}
			>
			<Row>
			<Col xs ={2}> 
			 <Glyphicon glyph = "plus" /> Employee 
			</Col>
			<Col xs = {8}>
				 <Glyphicon glyph = "plus" />
				 <Glyphicon glyph = "plus" />
			</Col>
			<Col xs = {2}>
			</Col>
			</Row>
			</Button>
		
		);
	}
	
}

class TitleRow extends React.Component{
	
	
	render(){
		const week = this.props.week;
		const start_date = this.props.start_date;
		const end_date = this.props.end_date;
		const days = [];
		
	var headline = new Date(start_date).toLocaleDateString("en", { month: 'long', day: 'numeric'});
	headline = headline + " to " + new Date(end_date).toLocaleDateString("en", { month: 'long', day: 'numeric'});
		
		week.forEach((text)=> {
		days.push(
			<div style = {{display:"inline-block", width:100/7 +"%"}}
				key = {text}>
				{text}
			</div>)
		});
		
		return(
		<div>
		  <h2 style ={{fontFamily:"courier"}}>  {headline} </h2>
		<Row>
		<Col xs = {2}>
		</Col>
		<Col xs = {8}>
			{days}
		
		</Col>
		<Col xs = {2}>
			Totals:
		</Col>
		</Row>
	 	</div>
	 	)
	}	
}

class EmployeeRow extends React.Component{
	constructor(props){
		super(props);
		this.handleNameClick = this.handleNameClick.bind(this);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.handleNewShiftClick = this.handleNewShiftClick.bind(this); 
		
		
		
	}

	handleNameClick(e){
		var pos = {}
		pos.x = e.pageX
		pos.y = e.pageY
		
		if (pos.x === undefined) {
			pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }	
		
        
		this.props.handleNameClick(e.target.getAttribute("employee_id"), pos);
	}
	
	handleShiftClick(id, pos){
		this.props.handleShiftClick(id, pos);
	}
	
	handleNewShiftClick(day, id, pos){
		this.props.handleNewShiftClick(day, id, pos);
	}
	
	render(){
		const employee = this.props.employee;
		const shifts = this.props.shifts;
		var x, y;
		var days = [];
		var row_style = {border:"solid", borderWidth:"1px", padding:"15px", borderColor:"darkgrey", height:"100px"}
		var cell_style = {height:"70px", border:"none", padding: "0", position:"relative"}
		var large_cell = {fontSize:"20px"}
		
		for(x=0;x<7;++x){
			days.push(
				<div style = {{position:"absolute", top:"0", left:parseFloat(100/7 * x) + "%", display:"inline-block", height:"70px", width:100/7 +"%"}}
					key = {x}>
					<EmployeeDay
						shifts = {this.props.shifts[x]}
						handleNewShiftClick = {this.handleNewShiftClick}
						handleShiftClick ={this.handleShiftClick}
						employee = {employee}
						day = {x}
						key = {x}
					/>
				</div>);
				
		}

		var total_hours = 0;
		for(x=0;x<7;++x){
		  for(y=0;y<shifts[x].length;++y){
		  	total_hours = total_hours + shifts[x][y].hours;  
		  }
		}
		

		return(
		<div>
		<Row style={row_style}>
		<Col xs = {2}>
		<Button 
			style = {cell_style, large_cell}
			bsStyle="default"
			block
			onClick = {this.handleNameClick}
			employee_id = {employee.id}
		> {employee.name}
		</Button>
		</Col>
		<Col xs = {8}
			style={cell_style}>
			{days}
		</Col>
		<Col xs = {2}
			style={cell_style, large_cell}>
			{total_hours}
		</Col>
		</Row>
	 	</div>
	 	)
	}
}

class EmployeeDay extends React.Component{
	constructor(props){
		super(props);
		this.handleShiftClick = this.handleShiftClick.bind(this);
		this.handleNewShiftClick = this.handleNewShiftClick.bind(this);
		
	}
	
	
	handleShiftClick(e){
		var pos = {}
		pos.x = e.pageX
		pos.y = e.pageY
		
		if (pos.x === undefined) {
			pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }	
		
		
		var shift_id = e.target.getAttribute("shift")
		var shifts = this.props.shifts;
		var shift = 0;
		var x;
		for(x=0;x<shifts.length;++x){
		 if(shifts[x].id == shift_id){
		   shift = shifts[x];	 
		 }
		}
		if (shift === 0){
			console.log("error finding shift");	
		}
		
		this.props.handleShiftClick(shift, pos);
	}
	
	handleNewShiftClick(e){
		var pos = {};
		pos.x = e.pageX
		pos.y = e.pageY
		
		if (pos.x  === undefined) {
			pos.x  = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }	
        
		this.props.handleNewShiftClick(e.target.getAttribute("day"), e.target.getAttribute("employee_id"), pos);
	}
		
	
	render(){
		const shifts = this.props.shifts
		const employee = this.props.employee
		const key = this.props.employee.id + "_" + this.props.day
		const day = this.props.day
		var x;
		var btns = [];
		var new_shift_style = {background:"white", color:"darkgrey", height:70-shifts.length*35, padding:"0", margin:0, border:"none", borderRadius:"0"}
		var shift_style =  {height:35, top:"0", padding:"0",  margin:0, border:"none", borderRadius:"0"}
		for(x=0;x<shifts.length;++x){
			btns.push(
				
						
				<Button
					block
					style = {shift_style}
					bsStyle="primary"
					onClick = {this.handleShiftClick}
					shift = {shifts[x].id}
					key = {shifts[x].id}
					
				> {shifts[x].start_time} - {shifts[x].end_time}
				
				</Button>
				
				
				);
		}
		if(shifts.length < 2){
			btns.push(
				<Button
					style = {new_shift_style}
					bsStyle="primary"
					onClick = {this.handleNewShiftClick}
					day = {day}
					employee_id = {employee.id}
					key = {"new_shift"}
					block
					> ++
				</Button>
				);
		}
			
		return(<div>
			{btns}
			</div>);
	}
}


class SalesTotal extends React.Component{
	constructor(props){
		super(props);
		this.handleSalesClick = this.handleSalesClick.bind(this);
	}
	
	handleSalesClick(e){
		var pos = {}
		pos.x = e.pageX
		pos.y = e.pageY
		
		if (pos.x === undefined) {
			pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }	
		
		this.props.onClickHandler(e.target.getAttribute("day"), pos);
	}
	
	render(){
		var x;
		var days = [];
		var total_sales = 0;
		var formated_sales;
		const sales = this.props.sales
		for(x=0;x<7;++x){
			total_sales = total_sales + parseFloat(sales[x]);
			formated_sales = validatePrice(sales[x]);
			days.push(
				<div onClick = {this.handleSalesClick} key = {x} day = {x} style = {{display:"inline-block", width:100/7 +"%"}}>
					{formated_sales}
					
					
				</div>
				
				)
			
			
		}
		total_sales = validatePrice(total_sales);
		
		
		return(<div >
		<Row>
		<Col xs = {2}>
		Sales:
		</Col>
		<Col xs = {8}>
			{days}
		
		</Col>
		<Col xs = {2}>
			{total_sales}
		</Col>
		</Row>
	 	</div>);
	}
}


class HoursTotal extends React.Component{
	
	render(){
		var x, y, z;
		var days = [];
		var day_hours = Array(7).fill(0);
		var total_hours = 0;
		const shifts = this.props.shifts;
		for(x=0;x<shifts.length;++x){
			for(y=0;y<shifts[x].length;++y){
			  for(z=0;z<shifts[x][y].length;++z){
			  	 total_hours=total_hours+shifts[x][y][z].hours;
			  	 day_hours[y] = day_hours[y] + shifts[x][y][z].hours;
			
				
		}}}
		
		for (x=0;x<7;++x){
			days.push(
				<div key = {x} style = {{display:"inline-block", width:100/7 +"%"}}>
					{day_hours[x]} Hrs
														
				</div>
				
			);
		}
			
		
		return(<div>
		<Row>
		<Col xs = {2}>
		Hours:
		</Col>
		<Col xs = {8}>
			{days}
		
		</Col>
		<Col xs = {2}>
			{total_hours}
		</Col>
		</Row>
	 	</div>);
	}
	
}


class TipsTotal extends React.Component{
	constructor(props){
		super(props);
		this.handleTipsClick = this.handleTipsClick.bind(this);
	}
	
	handleTipsClick(e){
		var pos = {}
		pos.x = e.pageX
		pos.y = e.pageY
		
		if (pos.x === undefined) {
			pos.x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			pos.y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }	
		
		this.props.onClickHandler(e.target.getAttribute("day"), pos);
	}
	
	render(){
		var x;
		var days = [];
		var total_tips = 0;
		var formated_tips;
		const tips = this.props.tips;
		for(x=0;x<7;++x){
			total_tips = total_tips +parseFloat(tips[x]) ;
			formated_tips = validatePrice(tips[x]);
			days.push(
				<div key ={x} onClick={this.handleTipsClick} day={x} style = {{display:"inline-block", width:100/7 +"%"}}>
				{formated_tips}
				</div>
				
				)
			
			
		}
		total_tips = validatePrice(total_tips);
		return(<div>
		<Row>
		<Col xs = {2}>
		Tips:
		</Col>
		<Col xs = {8}>
			{days}
		
		</Col>
		<Col xs = {2}>
			{total_tips}
		</Col>
		</Row>
	 	</div>);
	}
}


class Schedule extends React.Component{
		
	constructor(props){
		super(props);
		this.state = {
			schedule:{
				start_date:0,
				end_date:0,
				schedule_id:0,
				schedule_list:[],
				week:["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
				
			},
			
			employees:[
			{name:"First Employee", id:0},
			{name:"Second Employee", id:1}
			],
			totals: {
				sales:Array(7).fill(0),
				tips:Array(7).fill(0)
			},
			
			shifts:[],
						
			shift_helper: {
				last_entered:-1,
				start_time:0,
				end_time:0
			},
						
			modals: {
				setShift:false,
				setShift_shift:{},
				pos:{x:0, y:0},
				setSales:false,
				setSales_day:0,
				setTips:false,
				setTips_day:0,
				editEmployee:false,
				editEmployee_id:0
			},
			
			App:{
				AppElement: document.getElementById('root')
			}
		};
		
		this.openShift = this.openShift.bind(this);
		this.newShiftClick = this.newShiftClick.bind(this);
		this.mouseOverTime = this.mouseOverTime.bind(this);
		this.clickTime = this.clickTime.bind(this);
		this.saveShift = this.saveShift.bind(this);
		this.closeShift = this.closeShift.bind(this);
		this.deleteShift = this.deleteShift.bind(this);
		
		
		this.openEdit = this.openEdit.bind(this);
		this.closeEdit = this.closeEdit.bind(this);
		this.saveEmployee = this.saveEmployee.bind(this);
		this.deleteEmployee = this.deleteEmployee.bind(this);	
		
		this.addEmployee = this.addEmployee.bind(this);
		this.setSales = this.setSales.bind(this);  
		this.saveSales = this.saveSales.bind(this);
		this.closeSales = this.closeSales.bind(this);
		this.setTips = this.setTips.bind(this);  
		this.saveTips = this.saveTips.bind(this);
		this.closeTips = this.closeTips.bind(this);
		
		this.loadSchedule = this.loadSchedule.bind(this);
		this.saveSchedule = this.saveSchedule.bind(this);
		this.newSchedule = this.newSchedule.bind(this);
		this.prevSchedule = this.prevSchedule.bind(this);
		this.nextSchedule = this.nextSchedule.bind(this);
				
    }
    
    componentDidMount(){
    
		if(!this.loadSchedule()){
			this.newSchedule();
		}
    	
    }
    
    prevSchedule(){
    	var schedule = this.state.schedule;
    	var list = JSON.parse(window.localStorage.getItem("schedule_list"))
    	var x
    	var found = 0;
    	for (x=0;x<list.length;++x){
    		if(list[x] == schedule.schedule_id){
    			found = 1;
    			if(x>0){
    				this.loadSchedule(list[x-1]);
    			}else{
    				alert ("No Next Schedule")
    			}
    				
    			
    			
    		}
    		
    	}
    }
    
    nextSchedule(){
    	var schedule = this.state.schedule;
    	var list = JSON.parse(window.localStorage.getItem("schedule_list"))
    	var x
    	var found = 0;
    	for (x=0;x<list.length;++x){
    		if(list[x] == schedule.schedule_id){
    			found = 1;
    			if(x<list.length-1){
    				this.loadSchedule(list[x+1]);
    			}else{
    				alert ("No Previous Schedule")
    			}
    				
    			
    			
    		}
    		
    	}
    	
    }
    
    newSchedule(){
    	var state = this.state;
    	var list =  JSON.parse(window.localStorage.getItem("schedule_list"))
    	if(list.length > 0){
    		state.schedule.schedule_id = list[list.length - 1] + 1;
    	} else{
    		state.schedule.schedule_id = 0
    	}
    	var date = new Date();
    	state.schedule.start_date = date.setDate(date.getDate()+8-date.getDay())
 		
 		state.schedule.week = Array(7);
 		var x, day;
 		for (x=0;x<7;++x){
 			
 			state.schedule.week[x] = date.toLocaleDateString("en",  { weekday: 'short', month: 'short', day: 'numeric' })
 			 date.setDate(date.getDate()+1);
 		}
 		
 		state.schedule.end_date = date.setDate(date.getDate()-1)
 		
 		state.shifts = [];
    	
 		this.setState({state});
    	
    	console.log("new schedule created");	
    }
    
    loadSchedule(id){
    	var state = this.state;
    	var data;
    	var list;
    	var schedule_id;
    	
    	if(window.localStorage.getItem("schedule_list") && JSON.parse(window.localStorage.getItem("schedule_list")).length > 0 ){
			list =  JSON.parse(window.localStorage.getItem("schedule_list"))
    		if(list.indexOf(id) === -1){
				schedule_id = list[list.length-1];
				console.log("could not find schedule: Loading Most Recent Schedule");
			} else{
				schedule_id = id;
			}
						
			data = JSON.parse(window.localStorage.getItem(schedule_id));
			state.schedule = data.schedule;
			state.employees = data.employees;
			state.shifts = data.shifts;
			this.setState({state});
			return true;
			
		}else{
		 console.log("no_schedule");
		
		 
		 list = [];
		 window.localStorage.setItem("schedule_list", JSON.stringify(list));
		 return false;
		
		}
	
    }
    
    saveSchedule(){
    	var x;
    	var list = JSON.parse(window.localStorage.getItem("schedule_list"));
    	var state = this.state;
    	if(list.indexOf(state.schedule.schedule_id) === -1){
    		list.push(state.schedule.schedule_id);
    		state.schedule.schedule_list.push(state.schedule.schedule_id)
    		this.setState({state});
    		window.localStorage.setItem("schedule_list", JSON.stringify(list));
    	}
    	var schedule = {schedule: this.state.schedule, employees: this.state.employees, shifts: this.state.shifts};
    	
    	window.localStorage.setItem(state.schedule.schedule_id, JSON.stringify(schedule));
    }
    
    
    mouseOverTime(id){
    	var shift_helper = this.state.shift_helper;
    	shift_helper.last_entered = id
    	this.setState({shift_helper});
    }
    
    openShift(shift, pos){
    	
    	   
    	var shift_helper = this.state.shift_helper;
    	shift_helper.last_entered = -1;
    	shift_helper.start_time = 0;
    	shift_helper.end_time = 0;
    	this.setState({shift_helper});
    	    	
    	var modals = this.state.modals;
		modals.setShift=true;
		modals.setShift_shift = shift;
		modals.pos = pos;
		this.setState({modals});
	
    }
    clickTime(hour, quart){
    	var shift_helper = this.state.shift_helper;
    	if(shift_helper.start_time == 0 ){
    		shift_helper.start_time = {};
    		shift_helper.start_time.hour = hour;
    		shift_helper.start_time.quart = quart;
    		this.setState({shift_helper});
    	}else{
    		shift_helper.end_time = {};
    		shift_helper.end_time.hour = hour;
    		shift_helper.end_time.quart = quart;
    		this.setState({shift_helper});
    		this.saveShift()
    	}
    }
    newShiftClick(day, employee_id, pos){
    	var shift = {};
    	shift.start_time = 0;
    	shift.end_time = 0;
    	if(this.state.shifts.length){
			shift.id = this.state.shifts[this.state.shifts.length - 1].id +1 ;
    	}else{
			shift.id = 1;
    	}
    	shift.employee_id = employee_id;
    	shift.day = day;
    	shift.is_new = 1;
    	this.openShift(shift, pos);  
    	
    }
    
    saveShift(){
    	const times = ["9:","10:","11:","12:","1:","2:","3:","4:","5:","6:","7:","8:","9:","10:","11:"];
    	const quarts = ["00", "15","30","45"];
    	var modals= this.state.modals;
    	var shift_helper = this.state.shift_helper;
    	var shifts = this.state.shifts;
    	var x;
    	
    	modals.setShift_shift.start_time = times[shift_helper.start_time.hour] + quarts[shift_helper.start_time.quart];
    	modals.setShift_shift.end_time = times[shift_helper.end_time.hour] + quarts[shift_helper.end_time.quart];
    	modals.setShift_shift.hours = parseFloat(
    		shift_helper.end_time.hour-shift_helper.start_time.hour + 0.25*parseInt(
    			shift_helper.end_time.quart-shift_helper.start_time.quart));
    	if(modals.setShift_shift.is_new == 1){
    		modals.setShift_shift.is_new = 0
    		shifts.push(modals.setShift_shift); 
    	} else {
    		for(x = 0; x<shifts.length;++x){
    			if(shifts[x].id == modals.setShift_shift.id){
    			  shifts[x] = modals.setShift_shift	
    			}
    		}
    	}
    	
    	this.setState({shifts}) 
    	this.closeShift();
    	this.saveSchedule();
    	
    }
    deleteShift(){
    	var modals= this.state.modals;
    	var shifts = this.state.shifts;
    	var id = modals.setShift_shift.id;
    	var x;
    	
    	for(x=0;x<shifts.length;++x){
    		if(shifts[x].id == id){ 
				shifts.splice(x, 1 );
				this.setState(shifts);
				this.closeShift();
				return;
			}
    	}
    	console.log("error splicing shifts:  could not find ID")
    	this.closeShift();
    	
    }
    closeShift(){
    	
    	var modals = this.state.modals;
		modals.setShift=false;
		this.setState({modals});    	
    }
        
    addEmployee(pos){
    	var newEmployee = {}
    	var employees = this.state.employees
    	newEmployee.name=""
    	newEmployee.id = this.state.employees[this.state.employees.length-1].id+1
    	newEmployee.shifts = Array(7).fill([]);
    	employees.push(newEmployee);
    	this.setState({employees:employees})
    	this.openEdit(newEmployee.id);
    	
    	var modals = this.state.modals;
		modals.pos = pos;
		this.setState({modals});
    	
    }
    
   
    openEdit(id, pos){
    	
    	var modals = this.state.modals;
		modals.editEmployee=true;
		modals.editEmployee_id = id;
		modals.pos = pos;
		this.setState({modals});
    		
    }
			
    closeEdit(){
    	var modals = this.state.modals;
		modals.editEmployee = false;
		modals.editEmployee_id = -1;
				
		this.setState({modals});
	}
	
	saveEmployee(value, id){
		var x, employees;
		employees = this.state.employees;
		
		for (x=0;x<employees.length;++x){
			if(employees[x].id == id){
				employees[x].name = value;
			}
		}
		
		this.setState(employees:employees);
		this.saveSchedule();
		
	}
	
	deleteEmployee(id){
		var x, employees;
		this.closeEdit()
		
		employees = this.state.employees;
			
		for (x=0;x<employees.length;++x){
			if(employees[x].id == id){
				employees.splice(x, 1)
			}
		}
		
		this.setState(employees:employees);
		this.saveSchedule();
	}
	
	setSales(day, pos){
		const modals = this.state.modals;
		modals.setSales=true;
		modals.setSales_day = day;
				
		modals.pos = pos;
	
		this.setState({modals});
		
		
	}
	
	saveSales(value, day){
		var totals = this.state.totals
		totals.sales[day] = value;
			
		this.setState({totals:totals});	
		this.saveSchedule();
	}
	
	closeSales(){
		var modals = this.state.modals;
		modals.setSales = false;
		
		this.setState({modals});
	}
	
	setTips(day, pos){
		const modals = this.state.modals;
		modals.setTips=true;
		modals.setTips_day = day;
		modals.pos = pos;

		this.setState({modals});
	}
	
	saveTips(value, day){
		var totals = this.state.totals
		totals.tips[day] = value;
			
		this.setState({totals:totals});
		this.saveSchedule();
	}
	
	closeTips(){
		var modals = this.state.modals;
		modals.setTips = false;
		
		this.setState({modals});
	}
	
	
	render(){
	var employees = this.state.employees;
	
	var employee_shifts = Array(employees.length).fill(0).map(function() { 
			return new Array(7).fill(0).map(function(){return new Array();})
		}); 
	
	var x;
	this.state.shifts.forEach((shift)=>{
		for(x=0;x<this.state.employees.length;++x){
			if(shift.employee_id == employees[x].id){
				employee_shifts[x][shift.day].push(shift);
			}
		}
	})
		
	var rows = []
	for(x=0;x<employees.length;++x){
 	
	  rows.push(<EmployeeRow 
	  	  		shifts = {employee_shifts[x]}
	  	  	
	  	  		handleNameClick={this.openEdit}
	  	  		handleNewShiftClick = {this.newShiftClick}
	  	  		handleShiftClick = {this.openShift}
	  	  		employee= {employees[x]}
	  	  		key = {employees[x].id}
	  	  />)
	  
	};
	
		
	 return(
	 	 <div>
	 	 	<TitleRow 
	 	 	  start_date = {this.state.schedule.start_date}
	 	 	  end_date = {this.state.schedule.end_date}
	 	 	  week = {this.state.schedule.week}
	 	 	/>
	 	 	{rows}
	 	 	
	 		 	 	
	 	 	<NewEmployee 
	 	 		handleClick = {this.addEmployee}
	 	 		employees = {this.state.employees}
	 	 		/>
	 	 	
	 	 	<div style={{fontSize:"30px" }} >
	 	 	<HoursTotal
	 	 		shifts = {employee_shifts}
	 	 		/>
	 	 	<SalesTotal
	 	 		sales = {this.state.totals.sales}
	 	 		onClickHandler = {this.setSales} />
	 	 	<TipsTotal 
	 	 		tips = {this.state.totals.tips}
	 	 		onClickHandler = {this.setTips} />
	 	 	
	 	 		
	 	 	</div>	
	 	 	
			{/*Floating Buttons : */}
			<div  style = {{position:"fixed", minWidth:"100px",  top:3}}>
			
	 	 	<NewSchedule
	 	 		handleClick = {this.newSchedule}
	 	 		/>
	 	 	<PrintSchedule 
	 	 		schedule_id = {this.state.schedule.schedule_id}
	 	 		/>
	 	 	<PrevSchedule
	 	 		handleClick = {this.prevSchedule}
	 	 		/>
	 	 	<NextSchedule 
	 	 		handleClick = {this.nextSchedule}
	 	 		/>
	 	 	</div>	
	 	 		
	 	 	
	 	 	{/*Models : */}
	 	 	<GetShift
				handleDeleteClick = {this.deleteShift}
	 	 		handleMouseEnter={this.mouseOverTime}
	 	 		handleClick = {this.clickTime}
	 	 		saveShift = {this.saveShift}
	 	 		closeModal = {this.closeShift}
	 	 		isOpen = {this.state.modals.setShift}
	 	 		shift = {this.state.modals.setShift_shift}
	 	 		shift_helper = {this.state.shift_helper}
	 	 		pos = {this.state.modals.pos}
	 	 		appElement = "#root"
	 	 		
	 	 		
	 	 	/>
			<EditEmployee 
				saveEmployee ={this.saveEmployee}
				deleteEmployee ={this.deleteEmployee}
				closeModal = {this.closeEdit}
				pos = {this.state.modals.pos}
				
				employees = {this.state.employees}
				isOpen = {this.state.modals.editEmployee}
				id = {this.state.modals.editEmployee_id}
				/>
			<GetSales 
				pos = {this.state.modals.pos}
				saveSales = {this.saveSales}
				closeModal = {this.closeSales}
				sales = {this.state.totals.sales}
				isOpen = {this.state.modals.setSales}
				day = {this.state.modals.setSales_day}
				
				/>
			<GetTips 
				pos = {this.state.modals.pos}
				saveTips = {this.saveTips}
				closeModal = {this.closeTips}
				tips = {this.state.totals.tips}
				isOpen = {this.state.modals.setTips}
				day = {this.state.modals.setTips_day}
				/>
	 	 		
	 	 </div>
	 	 
	 	
	 	 
	  	
	 
	  );
	};
	
	
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Glyphicon glyph = "time" className="App-logo" alt="logo" style={{height:"60px", fontSize:"58px"}}/>
          <h1 className="App-title" style={{fontSize:"38px", fontFamily:"Courier", fontWeight:"bold"}}>Johnny Fresco's Scheduler</h1>
        </header>
        <div className="App-intro">
           <Schedule />
        </div>
      </div>
    );
  }
}

export default App;
