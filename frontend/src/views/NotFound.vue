<template>
  <div>
    <div class="cube">
      <img
        id="front"
        src="../assets/icon.png"
        class="side"
      >
      <img
        id="bottom"
        src="../assets/icon.png"
        class="side"
      >
      <img
        id="top"
        src="../assets/icon.png"
        class="side"
      >
      <img
        id="left"
        src="../assets/icon.png"
        class="side"
      >
      <img
        id="right"
        src="../assets/icon.png"
        class="side"
      >
      <img
        id="back"
        src="../assets/icon.png"
        class="side"
      >
    </div>
    <div id="not_found">
      Page Not Found error 404
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss">
#not_found {
  font-size: 30px;
  margin-top: 70px;
  min-height: 300px;
}

:root {
  --size: 60px;
}

body {
  background: white;
}

.cube {
  margin: auto;
  width: var(--size);
  height: var(--size);
  transform-style: preserve-3d;
  transform: rotateY(30deg) rotateZ(30deg);
  animation: cube 20s infinite linear;
}

.side {
  position: absolute;
  opacity: 0.8;
  width: var(--size);
  height: var(--size);
}

#front {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: translateZ(calc(var(--size) / 2));
}

#bottom {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: rotateX(270deg) translateY(calc(var(--size) / 2));
  transform-origin: bottom center;
}

#top {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: rotateX(-270deg) translateY(calc(-1 * (var(--size) / 2)));
  transform-origin: top center;
}

#left {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: rotateY(270deg) translateX(calc(-1 * (var(--size) / 2)));
  transform-origin: top left;
}

#right {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: rotateY(-270deg) translateX(calc(var(--size) / 2));
  transform-origin: top right;
}

#back {
  background: url(../assets/icon.png) no repeat center/cover;
  transform: rotateY(-180deg) translateZ(calc(var(--size) / 2));
}

@keyframes cube {
  from {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  to {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
  }
}
</style>