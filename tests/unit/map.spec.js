// import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('didnt mess with this.', () => {
    const wrapper = mount(App)
    console.log(wrapper.vm.$el)
    // expect(wrapper.text()).to.include(msg)
  })
})
