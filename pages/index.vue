<template>
  <div class="counter">Counter: {{ counter }}</div>
</template>

<script setup>
import { login } from '~/api/user';

const userStore = useUserStote();
const counter = useState('counter', () => Math.round(Math.random() * 1000));

onBeforeMount(async () => {
  try {
    const res = await login()
  } catch (e) {}
})
</script>
