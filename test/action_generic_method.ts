import Vuex from 'vuex'
import { Action, Module, VuexModule } from '..'
import { expect } from 'chai'

interface Values {
  name: string
  count: number
}

@Module
class GenericModule extends VuexModule {
  @Action
  async echo<K extends keyof Values>({ value }: { key: K; value: Values[K] }): Promise<Values[K]> {
    return value
  }
}

const store = new Vuex.Store({
  modules: {
    gm: GenericModule
  }
})

describe('@Action on a generic method', () => {
  it('should dispatch it', async function() {
    expect(await store.dispatch('echo', { key: 'count', value: 3 })).to.equal(3)
  })
})
