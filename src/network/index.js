import Vue from "vue"

import compound from "./compound"
import admin from "./admin"
import product from "./product"
import city from "./city"
import log from "./log"
import team from "./team"
import oil from "./oil"

const api = {
    compound,
    admin,
    product,
    city,
    log,
    team,
    oil
}

Vue.prototype.$api = api
export default api