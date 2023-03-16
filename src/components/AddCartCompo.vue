<template>
    <div>
        <aside>
            <button @click="btnCtrl">-</button>
            <input type="number" v-model="qty" @change="exception">
            <button @click="btnCtrl">+</button>
        </aside>
        <button @click="addToCart"><i class="fa-solid fa-cart-shopping"></i></button>
    </div>
</template>

<script>

export default {
    name: "AddCartCompo",
    data() {
        return {
            qty: 1
        }
    },
    mounted() {
        this.qtyCtrl = 1;
    },
    props: ['pObj'],
    inject: ['doughtnutList','shoppingCart'],
    methods: {
        btnCtrl(e) {
            switch (e.target.innerText) {
                case "+":
                    if(this.qty<100) {
                        this.qty++;
                    }
                    break;
                case "-":
                    if(this.qty>1) {
                        this.qty--;
                    }
                    break;
            }
        },
        addToCart() {
            console.log(this.pObj)
            this.shoppingCart.addProduct(this.pObj, this.qty);
            this.qty = 1;
            alert ("Added to cart");
            console.log(this.shoppingCart);
            localStorage.setItem(this.shoppingCart.cartID, this.shoppingCart.saveStrData());
        },
        exception() {
            if ( (this.qty  < 1 && this.qty !='') || typeof this.qty  === 'string' || this.qty === 0) {
                this.qty = 1;
            } else if (this.qty >99) {
                this.qty = 99;
            }
        }
    },

}
</script>

<style scoped>
    div {
        display: flex;
        column-gap: 1.5vh;
    }
    i {
        color: #ffffff;
    }
    button {
        background-color: #E47738;
        width: 40px;
        height: 40px;
        border: 1.4px solid #202020;
        transition: 0.3s;
    }
    button:hover {
        background-color: #d34b16;
        cursor: pointer;
    }
    aside {
        display: flex;
    }
    input {
        width: 60px;
        text-align: center;
        border: 1.4px solid #202020;
        border-left: none;
        border-right: none;
        border-radius: 0;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

</style>