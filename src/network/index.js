import Vue from "vue"

import compound from "./compound"
import admin from "./admin"
import product from "./product"

const api = {
    compound,
    admin,
    product
}

Vue.prototype.$api = api
export default api