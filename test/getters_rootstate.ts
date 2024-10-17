import Vuex, { Module as Mod } from 'vuex'
import { createApp } from 'vue'

import { Action, Module, Mutation, VuexModule } from '..'
import { expect } from 'chai'

@Module
class MyModule extends VuexModule {
  wheels = 2

  @Mutation
  incrWheels(extra: number) {
    this.wheels += extra
  }

  get axles() {
    return (this.wheels / 2) * this.context.rootState.cars
  }
}

const store = new Vuex.Store({
  state: {
    cars: 10
  },
  modules: {
    mm: MyModule
  }
})
const app = createApp({})
app.use(store)

describe('fetching rootState via getters works', () => {
  it('should increase axles * cars', function() {
    store.commit('incrWheels', 4)
    const axles = store.getters.axles
    expect(axles).to.equal(30)
  })
})
