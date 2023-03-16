<template>
    <div id="pCon">
        <aside>
            <div class="content">
                <h1>Doughnuts</h1>
                <section class="sort">
                    <h3>Sort</h3>
                    <select @change="filterSort" v-model="sort">
                        <option selected value="no" >no sorting</option>
                        <option value="pLow" >Price - low to high</option>
                        <option value="pHigh">Price - high to low</option>
                        <option value="nLow">Name - A to Z</option>
                        <option value="nHigh">Name - Z to A</option>
                    </select>
                </section>
                <article class="filter">
                    <h3>Filter</h3>
                    <section>
                    <aside>
                        <input type="checkbox" @change="filterSort" v-model="g_free" id="g_free"/>
                        <label>Gluten-free</label>
                    </aside>
                    <aside>
                        <input type="checkbox" @change="filterSort" v-model="vegan" id="vegan"/>
                        <label>Vegen</label>
                    </aside>
                    </section>
                </article>
                <aside class="link">
                    <figure>
                    <img src="../assets/package.jpg" alt="package">
                    <button><router-link to="/custom">Custom Doughnut</router-link></button>
                    </figure>
                </aside>
                </div>
        </aside>
        <div>
            <div id="search">
                <!-- SEARCH BAR -->
                <input type="search" v-model="searchKey" >
                <button @click="search"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <section>
                <doughnut-compo v-for="[pid, doughnut] in displayList" :key="pid" :doughnut="doughnut"/>
            </section>
        </div>
    </div>
</template>

<script>
import DoughnutCompo from '../components/DoughnutCompo.vue';

export default {
    name: "ProductListPage",
    components: {
        DoughnutCompo,
    },
    props: ['doughtnutList', 'shoppingCart'],
    data() {
        return {
            displayList: this.doughtnutList,
            searchKey: '',
            sort: "no",
            filterOpt: "",
            vegan: false,
            g_free: false
        }
    },
    methods: {

        filterSort(e) {
            this.displayList = this.doughtnutList;

            switch(this.sort) {
                case "pLow":
                    this.displayList = new Map([...this.displayList.entries()].sort((a,b) => a[1].price - b[1].price));
                    break;
                case "pHigh":
                    this.displayList = new Map([...this.displayList.entries()].sort((a,b) => b[1].price - a[1].price));
                    break;
                case "nLow":
                    this.displayList = new Map([...this.displayList.entries()].sort((a,b) => a[1].pname.localeCompare(b[1].pname)));
                    break;
                case "nHigh":
                    this.displayList = new Map([...this.displayList.entries()].sort((a,b) => b[1].pname.localeCompare(a[1].pname)));
                    break;
                default:
            }

            if (e.target == document.querySelector("#g_free") && this.g_free) {
                this.vegan = false;
                this.displayList = new Map([...this.displayList].filter(([, value]) => value.g_free));
            }
            else if (e.target == document.querySelector("#vegan") && this.vegan){
                this.g_free = false;
                this.displayList = new Map([...this.displayList].filter(([, value]) => value.vegan));
            }   

        },
        search() {
            this.displayList = new Map([...this.doughtnutList].filter(([, value]) => value.pname.toLowerCase().indexOf(this.searchKey.toLowerCase())>-1));
        }
    }
}
</script>

<style scoped>
    #pCon {
        display: flex;
        width: 100%;
    }
    #pCon > aside {
        width: 20%;
        height: 100vh;
        background-color: #E47738;
        position: fixed;
        height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 15vh;

    }
    #pCon > div {
        width: 60%;
        padding: 18vh;
        padding-left: 30%;
        padding-right: 10%;
        display: flex;
        flex-direction: column;
        row-gap: 6vh;
    }
    #pCon > div > section {
        display: flex;
        flex-wrap: wrap;
        row-gap: 4.5vh;
        column-gap: 5.5vh;
    }

    h1,h3,label{
        color:whitesmoke;
    }
    h3{
        font-size: 20px;
        margin: 0;
    }
    select{
        padding:10px;
        width: 100%;
    }
    input [type="checkbox"]{
        width: 20px;
        height: 20px;
    }
    .content figure{
        border: 1px solid green;
        width: 100%;
        height: 20vh;
        align-items: center;
    }
    .content img{
        width: 100%;
        height: 100%;
    }
    /* css */
    .background{
        background-color:#E47738;
        width: 300px;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    .content{
        width: 60%;
        display: flex;
        flex-direction: column;
        row-gap: 3vh;
    }
    .filter{
        display: flex;
        flex-direction: column;
    }
    .filter section{
        display: flex;
        flex-direction: column;
        row-gap: 5px;
    }
    .filter aside{
        display: flex;
        align-items: center;
        column-gap: 5px;
    }
    .sort{
        display: flex;
        flex-direction: column;
    }
    .sort,.filter{
        row-gap: 1vh;
    }
    .link figure{
        position: relative;
    }
    .link button{
        position: absolute;
        top:60%;
        left: 10%;
        width:80%;
        padding: 5%;
        text-decoration: none;
        border-radius: 10px;
        color:black;
        background-color: whitesmoke;
    }
    #search button {
        width: 40px;
        height: 40px;
        border: 1.4px solid #202020;
        transition: 0.3s;
    }
    #search button:hover {
        background-color: #417358;
        cursor: pointer;
        color: white;
    }
    #search input {
        width: 22%;
        height: 40px;
        border: 1.4px solid #202020;
        border-right: none;
        border-radius: 0;
        padding: 3px;
    }
</style>