<template>
  <div class="centering">
    <span class="text swing-inf">Page</span><span class="text">&nbsp;not found.</span>
  </div>
</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style lang="scss" scoped>
.text {
    position: relative;
    font-family: 'Source Code Pro', monospace;
    font-size: 90px;
}

.rectangle {
    position: absolute;
    background-color: black;
    transform: scale(0);
    width: 100px;
    height: 60px;
}

.popup {
    animation: popup;
    animation-duration: 2s;
}

@keyframes popup {
    0% { transform: scale(0)}
    90% { transform: scale(0.8)}
    93% { transform: scale(1.2)}
    98% { transform: scale(1.1)}
    100% { transform: scale(0)}
}

.centering {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.swing {
    animation-name: swing;
    animation-duration: 1s;
    animation-delay: 2s;
    animation-timing-function: ease-in-out;
    transform-origin: bottom right;
}

.swing-inf {
    animation-name: swing-inf;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    transform-origin: bottom right;
    animation-direction: alternate;
}

@keyframes swing-inf {
    0% { transform: rotate(-80deg); }
    100% { transform: rotate(-110deg); }
}

@keyframes swing {
    0% { transform: rotate(0deg); }
    20% { transform: rotate(-180deg); }
    40% { transform: rotate(-30deg); }
    60% { transform: rotate(-130deg); }
    80% { transform: rotate(-60deg); }
    100% { transform: rotate(-100deg); }
 }
</style>
