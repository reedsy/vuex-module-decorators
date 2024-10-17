import Vuex from 'vuex'
import { createApp } from 'vue'
import { VuexModule } from '..'
import { expect } from 'chai'



const vehicle = new VuexModule({
  state: {
    wheels: 2
  },
  mutations: {
    incrWheels(state, extra) {
      state.wheels += extra
    }
  },
  getters: {
    axles(state, rootState) {
      return state.wheels / 2
    }
  }
})

const store = new Vuex.Store({
  modules: {
    vehicle
  }
})
const app = createApp({})
app.use(store)

describe('new VuexModule() constuctor works', () => {
  it('should increase axles', function() {
    store.commit('incrWheels', 4)
    const axles = store.getters.axles
    expect(axles).to.equal(3)
  })
})
