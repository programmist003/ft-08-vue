<script setup>
import { ref, computed } from 'vue';

const user = ref({
  firstName: '',
  lastName: '',
  gender: '',
  password: '',
  confirmPassword: ''
});

const showPassword = ref(false);

const isRegisterDisabled = computed(() => {
  return user.value.password !== user.value.confirmPassword;
});

const register = () => {
  console.log(user.value);
};
</script>

<template>
  <form @submit.prevent="register">
    <div>
      <label>Имя пользователя:</label>
      <input type="text" v-model="user.firstName" />
    </div>
    <div>
      <label>Фамилия пользователя:</label>
      <input type="text" v-model="user.lastName" />
    </div>
    <div>
      <label>Пол:</label>
      <label><input type="radio" v-model="user.gender" value="Мужского" /> Мужского</label>
      <label><input type="radio" v-model="user.gender" value="Женского" /> Женского</label>
    </div>
    <div>
      <label>Пароль:</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="user.password" />
    </div>
    <div>
      <label>Подтверждение пароля:</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="user.confirmPassword" />
    </div>
    <div>
      <button type="button" @mousedown="showPassword = true" @mouseup="showPassword = false">
        Показать пароль
      </button>
    </div>
    <div>
      <button type="submit" :disabled="isRegisterDisabled">
        Зарегистрироваться
      </button>
    </div>
  </form>

  <p>
    Пользователь: {{ user.firstName }} {{ user.lastName }}.
    {{ user.gender === 'Мужского' ? 'Мужского' : 'Женского' }} пола.
  </p>
</template>

<style scoped>

</style>