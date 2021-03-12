<template>
  <div class="about">
    <h3>总结</h3>
    <p><code>state</code> 自带命名空间</p>
    <p><code>mutation</code> 自处理当前层级的state</p>
    <p>
      <code>getter</code> (state, getters, rootState, rootGetters)
      其中，state为当前层级，getters默认访问当前层级，也可以根据路径获取想要的getter，rootState为根state。在命名的模块中，需要rootGetters访问根getters
    </p>
    <p>
      <code>action</code>
      ({state, rootState, getters, rootGetters, commit, dispatch})
      其中，commit和dispatch默认访问当前模块，需要通过第三个参数设置{root:
      true}, 调用根mutation和根action
    </p>
    <hr />
    <p>
      <code>action</code> (state, getters, rootState)
      其中，state为当前层级，getters可以根据路径获取想要的getter，rootState为根state
    </p>
    <h3>mapState(["firstName", "lastName"])</h3>
    <p>
      <code>firstName</code> >>>
      {{ firstName }}
    </p>
    <p><code>lastName</code> >>> {{ lastName }}</p>
    <hr />
    <h3>mapState({first, last,computedFullName})</h3>
    <p><code>first: state => state.firstName</code> >>> {{ first }}</p>
    <p><code>last: "lastName"</code> >>> {{ last }}</p>
    <p>
      <code>
        computedFullName(state) { return `${state.firstName}
        ${state.lastName}`;}
      </code>
      >>> {{ computedFullName }}
    </p>
    <hr />
    <h3>mapGetters(["fullName"])</h3>
    <p>
      <code>fullName</code> >>>
      {{ fullName }}
    </p>
    <h3>mapGetters({getterFullName})</h3>
    <p>
      <code>getterFullName: 'fullName'</code> >>>
      {{ getterFullName }}
    </p>
    <hr />
    <h3>Mutation</h3>
    <p>
      age: {{ age }}

      |
    </p>
    <p>
      <code>...mapMutations(["addAge"])</code> >>>
      <button @click="addAge">age++</button>
    </p>
    <p>
      <code>this.$store.commit('addAge')</code> >>>
      <button @click="$store.commit('addAge')">age+++</button>
    </p>
    <hr />
    <h3>Action</h3>
    <p>height:{{ height }}</p>
    <p>
      <code>...mapActions(["asyncAddHeight"])</code> >>>
      <button @click="asyncAddHeight">height++</button>
    </p>
    <p>
      <code>this.$store.dispatch('asyncAddHeight')</code> >>>
      <button @click="$store.dispatch('asyncAddHeight')">height+++</button>
    </p>
    <p>
      <code
        >dispatch("asyncAddHeight").then(() => dispatch("asyncAddHeight"))</code
      >
      >>>
      <button @click="$store.dispatch('asyncAddHeightDouble')">
        doubleHeight
      </button>
    </p>
    <hr />
    <h3>Module</h3>
    <p>
      在 <code>modules</code> 中，<code>state</code> 是自动带有命名空间的，如
      <code>
        $store.state.mouduleNoNameSpace.count
      </code>
      >>>
      {{ $store.state.mouduleNoNameSpace.count }}
    </p>
    <p>
      而 <code>getters</code> | <code>mutations</code> |
      <code>actions</code> 的访问则是不带命名空间的的，如
      <code>
        $store.getters.double
      </code>
      >>> {{ $store.getters.double }}
    </p>
    <p>
      如果需要把<code>getters</code> | <code>mutations</code> |
      <code>actions</code> 挂在模块中，则需要给模块添加
      <code>namepaced: true</code>， 如
      <code>
        $store.getters["mouduleNameSpace/nDouble"]
      </code>
      >>> {{ $store.getters["mouduleNameSpace/nDouble"] }}
    </p>
    <p>
      如需批量挂载，可参考批量导入挂在模块中的getter，可以使用
      <code>
        mapGetters('mouduleNameSpace', ['nDouble', 'nTriple', 'nDoubleAge'])
      </code>
      >>> {{ nDouble }} | {{ nTriple }} | {{ nDoubleAge }}
    </p>
    <p>
      也可以借助<code>createNamespacedHelpers</code> >>> {{ nnDouble }} |
      {{ nnTriple }} | {{ nnDoubleAge }}
    </p>
    <p>
      <a href="https://vuex.vuejs.org/zh/guide/modules.html" target="_blank">
        更多细节
      </a>
    </p>
    <!-- <p>{{ $store.getters["mouduleNameSpace1/nTriple"] }}</p> -->
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapMutations,
  mapActions,
  createNamespacedHelpers
} from "vuex";

const { mapGetters: nMapGetters } = createNamespacedHelpers("mouduleNameSpace");

export default {
  name: "about",
  computed: {
    ...mapState(["firstName", "lastName", "age", "height"]),
    ...mapState({
      first: state => state.firstName,
      last: "lastName",
      computedFullName(state) {
        return `${state.firstName} ${state.lastName}`;
      }
    }),
    ...mapGetters(["fullName"]),
    ...mapGetters({
      getterFullName: "fullName"
    }),
    ...mapState({
      count: state => state.mouduleNoNameSpace.count
    }),
    ...mapGetters("mouduleNameSpace", ["nDouble", "nTriple", "nDoubleAge"]),
    ...nMapGetters({
      nnDouble: "nDouble",
      nnTriple: "nTriple",
      nnDoubleAge: "nDoubleAge"
    })
  },
  methods: {
    ...mapMutations(["addAge"]),
    ...mapActions(["asyncAddHeight"])
  }
};
</script>
