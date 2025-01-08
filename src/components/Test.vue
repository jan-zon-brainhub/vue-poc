<script lang="tsx">

export default {
  props: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
  },
  setup(props) {
    return () => (
      <div>
        <h1>
          Hello {props.firstName} {props.lastName}
        </h1>
      </div>
    )
  },
}
</script>

<template>
  <div>
    <h1>Hello {{ firstName }} {{ lastName }}</h1>
  </div>
</template>

<style scoped></style>
