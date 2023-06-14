import Vuex from 'vuex'
import { createApp } from 'vue'

import { VuexModule } from '..'
import { expect } from 'chai'
import { promisify } from 'util'

const setTimeoutPromise = promisify(setTimeout)

const mm = new VuexModule({
  state: { wheels: 2 },
  mutations: {
    incrWheels(state, extra: number) {
      state.wheels += extra
    }
  },
  actions: {
    async addWheels(context) {
      await setTimeoutPromise(1000)
      context.commit('incrWheels', 10)
    }
  },
  getters: {
    axles(state) {
      return state.wheels / 2
    }
  }
})

const store = new Vuex.Store({
  modules: { mm }
})
const app = createApp({})
app.use(store)

describe('creating with new VuexModule() works', () => {
  it('should increase axles', async function() {
    store.commit('incrWheels', 4)
    expect(parseInt(store.getters.axles)).to.equal(3)
    await store.dispatch('addWheels')
    expect(parseInt(store.getters.axles)).to.equal(8)
  })
})
