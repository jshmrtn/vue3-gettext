<script lang="ts" setup>
import { ref } from 'vue';

const n = ref(1)
function add(x: number) {
    if (n.value == 0) { return }
    n.value += x
}
</script>
<template>
    <button @click="add(-1)">-</button>{{ n }} <button @click="add(1)">+</button>
    <ul>
        <li>{{ __('use `__` as a alias of gettext') }}</li>
        <li>
            {{ __('use `_n` as a alias of ngettext') }}<br>
            {{ _n('One apple','%{n} apples', n, { n:''+ n}) }}
        </li>
        <li :title="_x('title', 'This is my title')">
            {{ __('use `_x` as a alias of pgettext') }}<br>
            {{ __('hover here and see the title') }}
        </li>
        <li>
            {{ __('use `_xn` as a alias of npgettext') }}<br>
            {{ _xn('list-item','one message','%{n} messages', n, { n:''+ n}) }}
        </li>
    </ul>
</template>
