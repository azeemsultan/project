import React from 'react';
import Modal from '@material-ui/core/Modal'
import { Backdrop, Container, Divider, Grid, Paper,Typography,Fade, Button } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import img from './cred.png';
import * as paymentService from "../../Axios-Actions/paymentService";
import * as Stripecard from"./Stripecard";
class Pay extends React.Component {
       counter=0;



       constructor(){
           super();
     this.state={
        first:'',
        last:'',
        cardNum:'',
        cardExp: '',
        cvv: '',
        firstError:'',
        lastError:'',
        cardNumError:'',
        cardExpError: '',
        cvvError: '',
        click:0,
        noClick: '',
        open: false,
        close: true,
        openc: false,
        creditForm: false,
        task:[],

      }};
      componentDidMount(){

        paymentService.getAllTask()
        .then((result)=>{
            console.log(result.data);
            this.setState({task:result.data});
        })

       }
 
      validate = () =>{
        let firstError='';
        let num = this.state.first;
        
        if(num.length >12){
          firstError= "Name length too long."
          }
          
          if(num.length <3){ //nice heart there nigga
              firstError= "Name length too short."
              }
              if(num.length ===0){
                  firstError= "You must enter the name."
                  }
                  if(num.length>2 &&  num.length  <12){
                      firstError= " "
                      }

       let lastError='';
       
       if(this.state.last.length >12){
        lastError= "Name length too long."
        }
        
        if(this.state.last.length <3){ //nice heart there nigga
            lastError= "Name length too short."
            }
            if(this.state.last.length ===0){
                lastError= "You must enter the name."
                }
                if(this.state.last.length>2 &&  this.state.last.length  <12){
                    lastError= " "
                    }

            
            var cardNum = this.state.cardNum
            var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
           
            if(visaRegEx.test(cardNum)===false){
              alert('Please provide valid number')
            }
            else
            {
              alert('thank you')
            }

            if(this.state.cardExp===0)
            {
              alert('Please enter the date')
            }
         let cvvError='';
            if(this.state.cvv===0)
            {
            cvvError='Field cannot be empty'
            }
            if(this.state.cvv!==3)
            {
              cvvError='Enter valid numbers'
            }
           
  
                      if(firstError||lastError||cvvError){
                        this.setState({firstError,lastError,cvvError})
                        return false
                      }
                      return true
      }


      handleSubmit= event =>{
        event.preventDefault();
        this.validate();
          
        }
   

      handleChange = event =>{
        
        const isCheckbox= event.target.type==="checkbox";
        this.setState({
            [event.target.name]: isCheckbox?
            event.target.checked: event.target.value
        });
    }
    Cash(){
        paymentService
        .paymentbyCash()
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull emailed");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log("Server error");
        });
    }
    Card(){
        paymentService
        .paymentbyCash()
        .then((result) => {
          // localStorage.setItem("token", result.data);
        console.log("Successfull emailed");
          setTimeout(function () {
            window.location = "/";
          }, 2000);
        })
        .catch((err) => {
          console.log("Server error");
        });
    }
      render(){
    const {task}=this.state;
    return ( 


      <Grid container style={{paddingTop:'5px',paddingBottom:'40px'}}>
   
          <Grid item md={12} xs={12} style={{marginRight:'20px',marginLeft:'20px'}}>
          <Paper style={{marginTop:'50px', border:'1px solid #000'}} elevation={3}>
             <div style={{display:'inline-flex'}}>
              <Button variant="outlined" style={{width:'160px',fontSize:'15px',height:'50px',border:'1px solid white',color:'#9b34eb'}} type="button" onClick={()=>this.setState({open:!this.state.open
              })}>Cash on Spot
                <AttachMoneyIcon style={{fontSize:'25px'}}/>
              </Button>
                <Typography variant="subtitle1" style={{marginLeft:'30px'}}> Easy option for both customer and Service provider</Typography> </div>
              <Divider/>
        
            <Modal style={{justifyContent:'center',alignItems:'center',display:'flex'}}
              open={this.state.open}
              onClose={!this.state.open}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500, 
              }}
          
            >
              <Fade in={this.state.open}> 
              <Paper elevation={3} style={{textAlign:'center',}}>
              <Container maxWidth="sm">
    
              <h4 style={{backgroundColor:'burlywood',fontSize:'20px',paddingTop:'10px',paddingBottom:'10px',color:'#9b34eb'}}>
                Cash at Delivery
              </h4>
              <p>
                Are you sure?
              </p>
              <button onClick={()=>this.setState({open:!this.state.open},this.Cash())} style={{backgroundColor:'white',fontSize:'20px',marginBottom:'20px',border:'0px',color:'darkolivegreen',fontWeight:"bolder"}}>
                Submit
              </button>
              <button onClick={()=>this.setState({open:!this.state.open},this.Cash())} style={{backgroundColor:'white',fontSize:'20px',marginBottom:'20px',border:'0px',color:'darkolivegreen',fontWeight:"bolder",marginLeft:'30px'}}>
                Close
              </button>
            
            </Container>
            </Paper>

            </Fade> 
            </Modal>

          
                
            </Paper>
            <div style={{border:'1px solid #000', marginTop:'20px'}}>
                <div style={{paddingLeft:'30px',backgroundColor:'#dbdbdb'}}><h3 style={{color:'#9b34eb'}}>Delivery Address</h3></div>
           
                 <div  style={{paddingLeft:'30px',backgroundColor:'white',marginBottom:'20px'}}><br/><Divider/>
                <Typography variant="h5">Customer: {task.customeremail} </Typography><br/> <Divider/>
                <Typography variant="h6">Task Location: {task.location}</Typography> <br/> <Divider/>
                <Typography variant="h6">Task Status: {task.status}</Typography>
            
        
                </div>
            </div>
          </Grid>

          <Grid item md={2}></Grid>
          <Grid item md={8} xs={12} style={{marginRight:'20px',marginLeft:'20px'}}>
          
              <div style={{border:'1px solid #000', marginTop:'50px'}}>
              <div style={{paddingLeft:'30px',backgroundColor:'#dbdbdb'}}><h3 style={{color:'#9b34eb'}}>Cart Summary</h3></div>
              <br/>
                <Divider/>
                <div  style={{paddingLeft:'30px',backgroundColor:'white',marginBottom:'20px'}}>
            <Typography variant="h5">Service provider:{task.serviceprovideremail}</Typography>
            <br/>
                <Divider/>
            <Typography variant="h6">Total Bill:{(task.month*task.permonth)+(task.pertask)+(task.perhour*(parseInt(task.endtime)-parseInt(task.starttime))*(task.month*30))} Rs.</Typography>
            <br/>    <Divider/>
            <Typography variant="h6"> Task Duration: {task.month} Month</Typography>
           <br/> <Divider/>
            <Typography variant="h6"> Time Duration: starting from={task.starttime} and ending at={task.endtime} </Typography>
            
          
                </div>
              
              </div>

          </Grid>

 

          <Grid item md={2}></Grid>
          </Grid>

    )
 
      }
   
}
 
export default Pay;