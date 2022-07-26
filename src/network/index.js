import Vue from "vue"

import compound from "./compound"
import admin from "./admin"
import product from "./product"
import city from "./city"
import log from "./log"

const api = {
    compound,
    admin,
    product,
    city,
    log
}

Vue.prototype.$api = api
export default api