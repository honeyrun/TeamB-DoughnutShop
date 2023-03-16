<template>
<div>
  <header>
    <nav>
      <ul>
        <li v-if="!logFlag"><router-link to="/">Login </router-link></li>
        <li v-if="logFlag"><router-link to="/productlist">Menu</router-link></li>
        <li v-if="logFlag"><router-link to="/user"><i class="fa-solid fa-user"></i>User</router-link></li>
        <li id="cart" v-if="logFlag"><i class="fa-solid fa-cart-shopping"></i><router-link to="/shoppingcart"> Cart ({{shoppingCart.calTotalAmount()}})</router-link></li>
        <li v-if="logFlag" @click="logout">Logout</li>
      </ul>
    </nav>
    <img src="./assets/logo_donuts.png" alt="package">
  </header>

  <main>
    <router-view
        :doughtnutList="doughtnutList"
        :shoppingCart="shoppingCart"
        :user="loggedUser"
        @register="userRegister"
        @login="userLogin"
    />
  </main>
</div>
</template>

<script>
import dData from './assets/data/doughnutData.json'
import ShoppingCart from './classes/ShoppingCart';
import User from "./classes/User";
import CryptoJS from 'crypto-js';

export default {
  name: 'App',
  components: {
  },
  data(){
    let doughtnutData = dData;
    let dMap = new Map();
    for(let item of doughtnutData) {
      dMap.set(item.pid, item)
    }
    console.log(dMap);
    return{
      doughtnutList: dMap,
      shoppingCart: new ShoppingCart(),
      userList: [],
      loggedUser: null,
      logFlag: false,
      key:"D0nut"
    }
  },
  provide() {
    return {
      doughtnutList: this.doughtnutList,
      shoppingCart: this.shoppingCart,
    }
  },
 methods: {
    userRegister(userListData) {
      // register cart ID for each user
      let userObj = new User(userListData, this.userList.length);
      this.userList.push(userObj);
      localStorage.setItem("userList", this.encrypt(JSON.stringify(this.userList)));
    },
    userLogin(loginData) {
      this.userList.forEach((user) => {
        if (user.email == loginData.email && user.pass == loginData.pass) {
          this.logFlag = true;
          this.loggedUser = new User(user);

          // re-assign cart ID to the current shopping cart data
          this.shoppingCart.assignUser(this.loggedUser.cartID);

          sessionStorage.setItem('loggedUser', this.encrypt(JSON.stringify(this.loggedUser)));
          this.$router.push({ name: "product-list"});
          console.log("login success")

          // if the user has cart data, restore data
          let prevCartData = JSON.parse(localStorage.getItem(this.loggedUser.cartID));
          if(prevCartData != null) {
            this.shoppingCart.restoreData(prevCartData);
            console.log("restore cart data",this.shoppingCart)
          }
          return false;
        }
      });
      if(this.loggedUser == null) {
        alert ("Wrong information");
      }
    },
    encrypt(data){
      return CryptoJS.AES.encrypt(data,this.key).toString();
    },
    decrypt(encData){
      let decData = CryptoJS.AES.decrypt(encData,this.key);
      return decData.toString(CryptoJS.enc.Utf8);
    },
    logout(){
      sessionStorage.removeItem("loggedUser");
      this.$router.push({name: "login"});
      this.loggedUser = null;
      this.logFlag = false;
      window.location.reload();
    }
  },
  mounted() {
    try {
       // if user session data is existing, get the data from shpooping cart
        let userListData = localStorage.getItem("userList");
        if (userListData != null) {
          this.userList = JSON.parse(this.decrypt(userListData));

          let userData = sessionStorage.getItem("loggedUser");
          if (userData != null) {
            this.loggedUser = new User(JSON.parse(this.decrypt(userData)));
            this.shoppingCart.assignUser(this.loggedUser.cartID);
            this.logFlag = true;

            console.log(this.loggedUser);

            // if the user has cart data, restore data
            let prevCartData = JSON.parse(localStorage.getItem(this.loggedUser.cartID));
            if(prevCartData != null) {
              this.shoppingCart.restoreData(prevCartData);
              console.log("restore cart data",this.shoppingCart)
            }
          } else {
            this.$router.push({name: "login"});
          }
        }
      }
      catch(e) {
        // wrong access
        sessionStorage.clear();
        this.$router.push({name:'login'});
        console.log(e);
      }
    }

}
</script>

<style>

  header{
    width: 100%;
    display: flex;
    position: fixed;
    z-index: 3;
    background-color: #417358;
    color: #FAF6F0;
    justify-content: center;
    column-gap: 12vh;
  }
  
  nav {
    padding: 2%;
    justify-content: center;
    width: 70%;
  }
  nav > ul {
    display: flex;
    column-gap: 4vh;
    color: white;
    align-items: center;
  }
  nav li {
    list-style: none;
    border-radius: 10px;
    padding: 0.5%;
  }
  nav a {
    text-decoration: none;
    color: white;
  }
  nav li:hover {
    cursor: pointer;
    background-color: #E47738;

  }
  header img {
    width: 10%;
  }
</style>
