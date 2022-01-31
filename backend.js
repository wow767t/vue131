import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

const app = createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'scott',
            products: {},
            myModal: '',
            dleModal: '',
            isNew: false,
            temp: {
                data: {
                    imagesUrl:[]
                }
            },
            tempProduct: {
                imagesUrl:[]
            },
                        
        }

    },
    methods: {
        getToken() {
            const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

            axios.defaults.headers.common['Authorization'] = myCookie;
        },
        userCheck() {
            this.getToken();
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    console.log(res)

                })
                .catch(err => {
                    console.error(err);
                })
        },
        
        getProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products/all`)
                .then(res => {
                    console.log(res)
                    this.products = res.data.products
                })
                .catch(err => {
                    console.dir(err);
                    console.log(err.data.message);

                })
        },
        openModal(str, product) {
            // let copyProduct = JSON.parse(JSON.stringify(product))
            this.temp.data = product
            // this.temp.data = copyProduct

            if (str === 'add') {
                this.isNew = true
                this.temp.data = {},
                this.myModal.show()
            }
            else if (str === 'edit') {
                let copyProduct = JSON.parse(JSON.stringify(product))
                this.temp.data = copyProduct
                this.isNew = false;
                this.myModal.show()

            }
            else {
                console.log('del', this.temp.data)
                this.isNew = false;
                this.delModal.show()
            }
        },
        confirmBtn(str) {
            const id = this.temp.data.id;
            if (str === 'add') {
                // console.log('add')
                this.addItem();
            }
            else if (str === 'edit') {
                // console.log('edit')
                this.editItem(id)
            }
            else {
                // console.log('del')

                this.delItem(id);
            }
        },
        
        delItem(id) {
            axios.delete(`${this.url}/api/${this.path}/admin/product/${id}`)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.delModal.hide();
                    this.getProducts();
                })
                .catch(err => {
                    console.dir(err);
                })
        },
        editItem(id) {
            const targetItem = this.temp

            axios.put(`${this.url}/api/${this.path}/admin/product/${id}`, targetItem)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.myModal.hide();
                    this.getProducts();
                })
                .catch(err => {
                    console.dir(err);
                })
        },
        addItem() {
            const targetItem = this.temp;

            axios.post(`${this.url}/api/${this.path}/admin/product`, targetItem)
                .then(res => {
                    console.log(res)
                    alert(res.data.message);
                    this.myModal.hide();
                    this.getProducts();
                })
                .catch(err => {
                    console.dir(err);
                })
        },
        // http://www.mandysam.com/img/random.jpg
        addImg() {
            // this.temp.data.imagesUrl.push('http://www.mandysam.com/img/random.jpg')
            console.log(this.temp.data.imagesUrl[0])
            console.log(this.tempImg)
            console.log('addimgs')
            
            
        },
        delImg() {
            // this.temp.data.imageUrl = '';
        },


    },
    mounted() {
        this.userCheck()
        this.getProducts()
        this.myModal = new bootstrap.Modal(document.querySelector('#productModal'))
        this.delModal = new bootstrap.Modal(document.querySelector('#delProductModal'))
        
        console.log('arr?',Array.isArray(this.temp.data.imagesUrl))
        console.log('arr?11',Array.isArray(this.tempProduct.imagesUrl))
        

    }
});
app.mount('#app');