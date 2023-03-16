class User{
    constructor(uObj, num){
        this.fname = uObj.fname;
        this.lname = uObj.lname;
        this.email = uObj.email;
        this.phone = uObj.phone;
        this.address = uObj.address;
        this.pass = uObj.pass;
        
        // unique cart id for each user
        this.cartID = (num!=null) ? "c"+num : uObj.cartID;
    }
}
export default User;