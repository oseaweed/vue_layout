import { getTemplate, getSlotContent, getStringTypeAttr } from '@/components/template'
import guid from '@/utils/guid'

var handle = function (_attr, _slots, _info) {
    //定义默认属性
    let attributes = {
        text: {
            type: 'button',
            value: ''
        }
    },
        slots = {
            default: []
        }


    //覆盖默认属性
    Object.assign(slots, _slots)
    Object.assign(attributes, _attr)

    //根据组件不同需要做的不同操作

    //获取插槽模板内容
    var subContent = getSlotContent(slots) || '&nbsp;'
    //设置当前组件的slot
    if (attributes.slot && attributes.slot !== 'default') {
        attributes.slot = {
            type: 'button',
            value: attributes.slot
        }
    } else {
        attributes.slot = {
            type: 'button',
            value: ''
        }
    }

    //根据组件不同需要做的不同操作
    let components = JSON.parse(JSON.stringify(_Vue.$store.state.components))
    let isFirstCreate = !components.find(c => c.info.id === _info.id)
    let newComponents = []
    let addComponent = function (info) {
        let component = getTemplate(info)
        //尽量每次getTemplate后都重新获取components，避免里面修改了后造成不同步会报错
        components = JSON.parse(JSON.stringify(_Vue.$store.state.components))
        component.parentId = _info.id
        newComponents.push(component)
        return component
    }
    if (isFirstCreate) {

        let child1 = {
            name: 'Child1',
            ui: 'Test',
            id: guid()
        }
        let actions1 = addComponent(child1)
        slots.default.push({ id: actions1.info.id })



        let child2 = {
            name: 'Child2',
            ui: 'Test',
            id: guid()
        }
        let actions2 = addComponent(child2)
        slots.default.push({ id: actions2.info.id })

        components.push.apply(components, newComponents)
        _Vue.$store.commit('setState', { components })
    }

    //获取插槽模板内容
    var subContent = getSlotContent(slots)

    //设置当前组件的slot
    if (attributes.slot && attributes.slot !== 'default') {
        attributes.slot = {
            type: 'text',
            value: attributes.slot
        }
    } else {
        attributes.slot = {
            type: 'text',
            value: ''
        }
    }

    //字符串模板操作
    let stringAttr = getStringTypeAttr(attributes)
    let template = `<div
                ${stringAttr}>
                ${subContent || '&nbsp;'}
            </div>`

    return { template, attributes, slots }
}
export default handle
