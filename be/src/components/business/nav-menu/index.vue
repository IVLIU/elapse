<template>
  <div class="ta-navmenu">
    <ul>
      <li
        v-for="(route, i) in routeConfig" :key="i"
        :ref="'li' + (i + 1)">
        <template v-if="!route.children">
          <div>
            <router-link :to="'/' + route.path" exact>
              <span>{{ route.meta.title }}</span>
            </router-link>
            <ta-icon :name="route.icon"></ta-icon>
          </div>
        </template>

        <template v-else>
          <div @click="toggleShow(i + 1, $event.target)">
            <ta-icon
              class="ta-icon__arrow"
              name="ios-arrow-down">
            </ta-icon>
            <span>{{ route.prefix }}</span>
            <ta-icon :name="route.icon"></ta-icon>
          </div>
          <ul class="ta-navmenu__submenu">
            <li 
              v-for="(subRoute, j) in route.children" :key="j"> 
              <div>
                <router-link :to="'/' + subRoute.path">
                  <span>{{ subRoute.meta.title }}</span>
                </router-link>
              </div>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { hasClassName, toggleClassName } from '@/util/class-name'
import TaIcon from '../../common/icon'
import Bus from '../bus'
import routeConfig from '@/router/route-config.js'

export default {
  name: 'TaNavmenu',

  components: {
    TaIcon
  },

  data() {
    return {
      isShowSubmenu: [false, false],
      routeConfig,
    }
  },

  methods: {
    toggleShow(i, target) {
      let oLi = this.$refs['li' + i]
      if (!oLi) {
        return
      }
      oLi = oLi[0]
      const oUl = oLi.querySelector('ul')
      let h = oLi.offsetHeight
      if (h <= 56) {
        h += oUl.offsetHeight
      } else {
        h = 56
      }
      oLi.style.height = h + 'px'
      toggleClassName(oLi.querySelector('.ta-icon__arrow'), 'is-active')
    },

    emitShow(e) {
      const target = e.target || e.srcElement
      let node = target.parentNode.parentNode.parentNode
      if (!hasClassName(node, 'ta-navmenu')) {
        node = node.parentNode
      }
      if (hasClassName(node, 'is-collapse')) {
        this.$emit('show')
        Bus.$emit('expandMenu')
      }
    }
  }
}
</script>
